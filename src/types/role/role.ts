import { IUser } from "../user/user";

export interface IRole {
    id: number;

    type: string;

    name: string;

    users: IUser[];

    createdAt: Date;
    
    updatedAt: Date;
}