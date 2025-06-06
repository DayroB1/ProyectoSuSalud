import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { database } from "../../firebase/firebaseConfig";
import { ref, push, get, update, query, orderByChild, equalTo, remove } from "firebase/database";
import { Cita, EstadoCita, Servicio } from "./citasTypes";
import logger from "../../services/logging";

interface CitasState {
  citas: Cita[];
  servicios: Servicio[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CitasState = {
  citas: [],
  servicios: [],
  status: "idle",
  error: null,
};

export const fetchCitas = createAsyncThunk("citas/fetchCitas", async () => {
  try{
  const snapshot = await get(ref(database, "citas"));
  if (snapshot.exists()) {
    logger.info("Citas obtenidas correctamente de Firebase");
    return Object.entries(snapshot.val()).map(([id, cita]) => ({
      ...(cita as Cita),
      id,
    }));
  }
  logger.info("No existen citas en Firebase");
  return [];
}
catch (error) {
    logger.error(`Error al obtener citas: ${(error as Error).message}`);
    throw error;
  }
});

export const fetchCitasByUser = createAsyncThunk(
    "citas/fetchCitasByUser",
    async (userId: string, { rejectWithValue }) => {
      try {
        logger.info("Citas obtenidas correctamente de Firebase");
        const q = query(
          ref(database, "citas"),
          orderByChild("pacienteId"),
          equalTo(userId)
        );
        const snapshot = await get(q);
        
        if (!snapshot.exists()) {
          logger.info("No existen citas para el usuario en Firebase");
          return [];
        }
  
        const citas: Cita[] = [];
        snapshot.forEach((childSnapshot) => {
          const citaData = childSnapshot.val();
          citas.push({
            id: childSnapshot.key || '',
            servicio: citaData.servicio,
            fecha: citaData.fecha,
            hora: citaData.hora,
            paciente: citaData.paciente,
            pacienteId: citaData.pacienteId,
            estado: citaData.estado,
            notas: citaData.notas || '',
            createdAt: citaData.createdAt || Date.now()
          });
        });
  
        return citas;
      } catch (error) {
        //console.error("Error fetching citas:", error);
        logger.error(`Error al obtener citas: ${(error as Error).message}`);
        return rejectWithValue((error as Error).message);
      }
    }
  );

export const addCita = createAsyncThunk(
  "citas/addCita",
  async (cita: Omit<Cita, "id" | "estado" | "createdAt">) => {
    try {
    const newCita = {
      ...cita,
      estado: EstadoCita.PENDIENTE,
      createdAt: Date.now(),
    };
    const citaRef = push(ref(database, "citas"), newCita);
    logger.info(`Cita agregada correctamente para paciente: ${cita.paciente}`);
    return { id: citaRef.key, ...newCita };
    }
    catch (error) {
      logger.error(`Error al agregar cita: ${(error as Error).message}`);
      throw error;
    }
  }
);

export const updateCitaEstado = createAsyncThunk(
  "citas/updateEstado",
  async ({ id, estado }: { id: string; estado: EstadoCita }) => {
    try {
    await update(ref(database, `citas/${id}`), { estado });
    logger.info(`Estado de cita actualizado a ${estado} para cita con id: ${id}`);
    return { id, estado };
    }
    catch (error) {
      logger.error(`Error al actualizar estado de cita: ${(error as Error).message}`);
      throw error;
    }
  }
);

export const fetchServicios = createAsyncThunk(
  "citas/fetchServicios",
  async () => {
    try {
    const snapshot = await get(ref(database, "servicios"));
    if (snapshot.exists()) {
      logger.info("Servicios obtenidos correctamente de Firebase");
      return Object.entries(snapshot.val()).map(([id, servicio]) => ({
        ...(servicio as Servicio),
        id,
      }));
    }
    logger.info("No existen servicios en Firebase");
    return [];
  } catch (error) {
      logger.error(`Error al obtener servicios: ${(error as Error).message}`);
      throw error;
    }
  }
);

export const deleteCita = createAsyncThunk(
  "citas/deleteCita",
  async (id: string, { rejectWithValue }) => {
    try {
      await remove(ref(database, `citas/${id}`));
      logger.info(`Cita eliminada correctamente con id: ${id}`);
      return id;
    } catch (error) {
      logger.error(`No se pudo eliminar la cita con id: ${id} - ${(error as Error).message}`);
      return rejectWithValue((error as Error).message);
    }
  }
);

const citasSlice = createSlice({
  name: "citas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCitas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCitas.fulfilled, (state, action: PayloadAction<Cita[]>) => {
        state.status = "succeeded";
        state.citas = action.payload;
      })
      .addCase(fetchCitas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error al obtener citas";
      })
      .addCase(fetchCitasByUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCitasByUser.fulfilled, (state, action: PayloadAction<Cita[]>) => {
        state.status = "succeeded";
        state.citas = action.payload;
      })
      .addCase(fetchServicios.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServicios.fulfilled, (state, action: PayloadAction<Servicio[]>) => {
        state.status = "succeeded";
        state.servicios = action.payload;
      })
      .addCase(addCita.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.citas.push({
            ...action.payload,
            id: action.payload.id
          });
        }
      })
      .addCase(updateCitaEstado.fulfilled, (state, action) => {
        const index = state.citas.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.citas[index].estado = action.payload.estado;
        }
      })
       .addCase(deleteCita.fulfilled, (state, action) => {
        state.citas = state.citas.filter(cita => cita.id !== action.payload);
      }); 
      
  },
});

export default citasSlice.reducer;