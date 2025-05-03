import api from ".";
import { IUser } from "../types/user/user";

export const UserService = {
    async searchUsers(query: string): Promise<IUser[]> {
        const { data } = await api.get<IUser[]>('users/search', {
            params: { query }
        });
        return data;
    }
}; 