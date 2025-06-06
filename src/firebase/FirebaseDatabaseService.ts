import { getDatabase, ref, set, get } from 'firebase/database';
import { app } from './firebaseConfig';
import { Role } from '../services/IAuthService';
import { IUserDatabaseService } from '../services/IUserDatabaseService';

export class FirebaseDatabaseService implements IUserDatabaseService {
    async getUserRoles(uid: string): Promise<Role[]> {
        const db = getDatabase(app);
        const rolesRef = ref(db, `users/${uid}/roles`);
        const snapshot = await get(rolesRef);
        if (snapshot.exists()) {
            const rolesData = snapshot.val();
            const roles: Role[] = [];
            if (rolesData.admin === true) {
                roles.push(Role.ADMIN);
            }
            if (roles.length === 0) {
                roles.push(Role.USER);
            }
            return roles;
        }
        return [Role.USER];
    }

    async setUserRoles(uid: string, roles: { email: string; roles: { admin: boolean } }) {
        const db = getDatabase(app);
        const userRef = ref(db, `users/${uid}`);
        await set(userRef, roles);
    }
    
}