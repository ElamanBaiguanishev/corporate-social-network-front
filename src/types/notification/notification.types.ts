import { IRole } from "../role/role";
import { IUser } from "../user/user";

export enum NotificationType {
    NEWS = 'news',
    CHAT = 'chat'
}

export interface INotification {
    id: number;
    type: NotificationType;
    content: string;
    isRead: boolean;
    recipient?: IUser;
    role?: IRole;
    chatId?: number;
    createdAt: string;
} 