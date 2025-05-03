import api from ".";
import { IChat, IMessage } from "../types/chat/chat.types";

export const ChatService = {
    async getChats(): Promise<IChat[]> {
        const { data } = await api.get<IChat[]>('chat');
        return data;
    },

    async getChatsByUserId(userId: number): Promise<IChat[]> {
        const { data } = await api.get<IChat[]>(`chat/by-user/${userId}`);
        return data;
    },

    async getChat(chatId: number): Promise<IChat> {
        const { data } = await api.get<IChat>(`chat/${chatId}`);
        return data;
    },

    async createPrivateChat(userId: number): Promise<IChat> {
        const { data } = await api.post<IChat>('chat/private', { userId1: userId });
        return data;
    },

    async createGroupChat(name: string, participantIds: number[]): Promise<IChat> {
        const { data } = await api.post<IChat>('chat/group', { 
            name, 
            creatorId: 1, // This should be the current user's ID
            participantIds 
        });
        return data;
    },

    async getChatMessages(chatId: number, page: number = 1, limit: number = 50): Promise<IMessage[]> {
        const { data } = await api.get<IMessage[]>(`chat/${chatId}/messages`, {
            params: { page, limit }
        });
        return data;
    },

    async uploadFile(file: File): Promise<{ path: string }> {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await api.post<{ path: string }>('upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    }
}; 