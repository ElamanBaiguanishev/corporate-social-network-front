import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import HomePage from "../pages/home/HomePage";
import { MainLayout } from "../components/layout/MainLayout";
import { Chats } from "../pages/chat/Chats";
import { Chat } from "../pages/chat/Chat";
import { KanbanBoard } from "../pages/tasks/KanbanBoard";
import { FeedPage } from "../pages/feed/FeedPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        // errorElement: <MiniApp404 />,
        children: [
            {
                path: 'feed',
                element: <ProtectedRoute><FeedPage /></ProtectedRoute>
            },
            {
                path: 'chats',
                element: <ProtectedRoute><Chats /></ProtectedRoute>
            },
            {
                path: 'chat/:id',
                element: <ProtectedRoute><Chat /></ProtectedRoute>
            },
            {
                path: 'inbox',
                element: <ProtectedRoute><HomePage /></ProtectedRoute>
            },
            {
                path: 'starred',
                element: <ProtectedRoute><HomePage /></ProtectedRoute>
            },
            {
                path: 'send',
                element: <ProtectedRoute><HomePage /></ProtectedRoute>
            },
            {
                path: 'drafts',
                element: <ProtectedRoute><HomePage /></ProtectedRoute>
            },
            {
                path: 'all-mail',
                element: <ProtectedRoute><HomePage /></ProtectedRoute>
            },
            {
                path: 'trash',
                element: <ProtectedRoute><HomePage /></ProtectedRoute>
            },
            {
                path: 'spam',
                element: <ProtectedRoute><HomePage /></ProtectedRoute>
            },
            {
                path: 'tasks',
                element: <ProtectedRoute><KanbanBoard /></ProtectedRoute>
            },
            {
                path: 'auth',
                element: <LoginPage />
            }
        ]
    }
])