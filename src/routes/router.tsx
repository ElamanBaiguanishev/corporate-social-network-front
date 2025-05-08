import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegistrationPage } from "../pages/auth/RegistrationPage";
import { AuthGuard } from "../components/common/AuthGuard";
import { RoleGuard } from "../components/common/RoleGuard";
import HomePage from "../pages/home/HomePage";
import { MainLayout } from "../components/layout/MainLayout";
import { Chats } from "../pages/chat/Chats";
import { Chat } from "../pages/chat/Chat";
import { KanbanBoard } from "../pages/tasks/KanbanBoard";
import { FeedPage } from "../pages/feed/FeedPage";
import { RoleTypes } from "../types/role/role-types";

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthGuard>
                <MainLayout />
            </AuthGuard>
        ),
        children: [
            {
                path: 'feed',
                element: <FeedPage />
            },
            {
                path: 'chats',
                element: <Chats />
            },
            {
                path: 'chat/:id',
                element: <Chat />
            },
            {
                path: 'inbox',
                element: <HomePage />
            },
            {
                path: 'starred',
                element: <HomePage />
            },
            {
                path: 'send',
                element: <HomePage />
            },
            {
                path: 'drafts',
                element: <HomePage />
            },
            {
                path: 'all-mail',
                element: <HomePage />
            },
            {
                path: 'trash',
                element: <HomePage />
            },
            {
                path: 'spam',
                element: <HomePage />
            },
            {
                path: 'tasks',
                element: <KanbanBoard />
            },
            {
                path: 'registration',
                element: (
                    <RoleGuard allowedRoles={[RoleTypes.ADMIN]}>
                        <RegistrationPage />
                    </RoleGuard>
                )
            }
        ]
    },
    {
        path: '/auth',
        element: (
            <AuthGuard requireAuth={false}>
                <LoginPage />
            </AuthGuard>
        )
    }
]);