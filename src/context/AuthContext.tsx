import { createContext, ReactNode } from 'react';
import { Role } from '../services/IAuthService';

interface AuthContextProps {
    user: any | null;
    roles: Role[] | null;
    uid: string | null;
}

export const AuthContext = createContext<AuthContextProps>({ user: null, roles: null, uid: null });

export interface AuthProviderProps {
    children: ReactNode;
}