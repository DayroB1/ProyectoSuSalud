import { authService } from "./services/AuthService";
import { useEffect, useState } from "react";
import { Role } from "./services/IAuthService";
import { AuthContext, AuthProviderProps } from "./context/AuthContext";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [roles, setRoles] = useState<Role[] | null>(null);
    const [uid, setUid] = useState<string | null>(null);

useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (currentUser) => {
        setUser(currentUser);
        setUid(currentUser?.uid || null); // Importante
        if (currentUser) {
            try {
                const userRoles = await authService.getUserRoles(currentUser);
                setRoles(userRoles);
            } catch (error) {
                console.error('Error al obtener los roles:', error);
                setRoles(null);
            }
        } else {
            setRoles(null);
        }
    });
    return unsubscribe;
}, []);

    return (
        <AuthContext.Provider value={{ user, roles, uid }}>
            {children}
        </AuthContext.Provider>
    );
};