import { IUser } from "../user/user";

export interface IAttachment {
    id: number;
    filename: string;
    path: string;
    mimeType: string;
    size: number;
}

export interface IMessage {
    id: number;
    content: string;
    sender: IUser;
    attachments?: IAttachment[];
    createdAt: string;
}

export interface IChat {
    id: number;
    name?: string;
    isGroup: boolean;
    participants: IUser[];
    messages: IMessage[];
    createdAt: string;
    updatedAt: string;
} 