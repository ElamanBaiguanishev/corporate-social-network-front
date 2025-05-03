import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { INotification } from '../../types/notification/notification.types';
import { NotificationService } from '../../api/notification.service';

interface NotificationsState {
    notifications: INotification[];
    unreadCount: number;
    loading: boolean;
    error: string | null;
}

const initialState: NotificationsState = {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null
};

// Async thunks
export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async () => {
        const response = await NotificationService.getNotifications();
        return response;
    }
);

export const fetchUnreadCount = createAsyncThunk(
    'notifications/fetchUnreadCount',
    async () => {
        const response = await NotificationService.getUnreadCount();
        return response;
    }
);

export const markAsRead = createAsyncThunk(
    'notifications/markAsRead',
    async (notificationId: number) => {
        await NotificationService.markAsRead(notificationId);
        return notificationId;
    }
);

export const markAllAsRead = createAsyncThunk(
    'notifications/markAllAsRead',
    async () => {
        await NotificationService.markAllAsRead();
    }
);

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch notifications
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<INotification[]>) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch notifications';
            })
            // Fetch unread count
            .addCase(fetchUnreadCount.fulfilled, (state, action: PayloadAction<number>) => {
                state.unreadCount = action.payload;
            })
            // Mark as read
            .addCase(markAsRead.fulfilled, (state, action: PayloadAction<number>) => {
                const notification = state.notifications.find(n => n.id === action.payload);
                if (notification) {
                    notification.isRead = true;
                }
                state.unreadCount = Math.max(0, state.unreadCount - 1);
            })
            // Mark all as read
            .addCase(markAllAsRead.fulfilled, (state) => {
                state.notifications = state.notifications.map(notification => ({
                    ...notification,
                    isRead: true
                }));
                state.unreadCount = 0;
            });
    }
});

// Selectors
export const selectNotifications = (state: RootState) => state.notifications.notifications;
export const selectUnreadCount = (state: RootState) => state.notifications.unreadCount;
export const selectNotificationsLoading = (state: RootState) => state.notifications.loading;
export const selectNotificationsError = (state: RootState) => state.notifications.error;

export default notificationsSlice.reducer; 