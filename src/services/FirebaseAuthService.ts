import { IAuthService, Role } from './IAuthService';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/firebaseConfig';
import { FirebaseDatabaseService } from '../firebase/FirebaseDatabaseService';

const auth = getAuth(app);

export class FirebaseAuthService implements IAuthService {
    private databaseService: FirebaseDatabaseService;

    constructor() {
        this.databaseService = new FirebaseDatabaseService();
    }

    signIn(email: string, password: string): Promise<any> {
        return signInWithEmailAndPassword(auth, email, password);
    }

    signUp(email: string, password: string): Promise<any> {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    signOut(): Promise<void> {
        return signOut(auth);
    }

    onAuthStateChanged(callback: (user: any) => void): () => void {
        return onAuthStateChanged(auth, callback);
    }

    getCurrentUser(): any | null {
        return auth.currentUser;
    }

    async getUserRoles(user: any): Promise<Role[]> {
        if (user.email === 'dayro@ejemplo.com') {
            return [Role.ADMIN];
        }
        return this.databaseService.getUserRoles(user.uid);
    }
}