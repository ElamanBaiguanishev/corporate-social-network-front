import api from ".";
import { IRole } from "../types/role/role";
import { RoleTypes } from "../types/role/role-types";
import { IRolePayloadData } from "../types/role/role.payload";

export const RoleService = {
    async getAllRoles(): Promise<IRole[]> {
        const { data } = await api.get<IRole[]>('roles');
        return data;
    },

    async getRoleById(id: number): Promise<IRole> {
        const { data } = await api.get<IRole>(`roles/${id}`);
        return data;
    },

    async getRoleByName(name: string): Promise<IRole> {
        const { data } = await api.get<IRole>(`roles/by-name/${name}`);
        return data;
    },

    async getRoleByType(type: RoleTypes): Promise<IRole[]> {
        const { data } = await api.get<IRole[]>(`roles/by-type/${type}`);
        return data;
    },

    async createRole(roleData: IRolePayloadData): Promise<IRole> {
        const { data } = await api.post<IRole>('roles', roleData);
        return data;
    }
}; 