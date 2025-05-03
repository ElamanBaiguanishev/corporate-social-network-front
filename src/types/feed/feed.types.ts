import { IUser } from "../user/user";
import { IRole } from "../role/role";

export interface IFeed {
    id: number;
    content: string;
    title?: string;
    author: IUser;
    taggedUsers: IUser[];
    taggedRoles: IRole[];
    createdAt: string;
    updatedAt: string;
}

export interface ICreateFeedPayload {
    content: string;
    title?: string;
    taggedUserIds?: number[];
    taggedRoleIds?: number[];
} 