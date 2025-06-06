export enum EstadoCita {
    PENDIENTE = "PENDIENTE",
    APROBADA = "APROBADA",
    RECHAZADA = "RECHAZADA"
  }
  
  export interface Cita {
    id: string|undefined;
    servicio: string;
    fecha: string;
    hora: string;
    paciente: string;
    pacienteId: string;
    estado: EstadoCita;
    notas?: string;
    createdAt: number;
  }
  
  export interface Servicio {
    id: string;
    nombre: string;
    descripcion: string;
    imagen: string;
  }