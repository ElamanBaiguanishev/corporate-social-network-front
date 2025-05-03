import api from ".";
import { INotification } from "../types/notification/notification.types";

export const NotificationService = {
    async getNotifications(): Promise<INotification[]> {
        const { data } = await api.get<INotification[]>('notifications');
        return data;
    },

    async getUnreadCount(): Promise<number> {
        const { data } = await api.get<number>('notifications/unread-count');
        return data;
    },

    async markAsRead(notificationId: number): Promise<void> {
        await api.post(`notifications/${notificationId}/read`);
    },

    async markAllAsRead(): Promise<void> {
        await api.post('notifications/read-all');
    }
}; 