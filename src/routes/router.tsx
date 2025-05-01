import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import HomePage from "../pages/home/HomePage";
import { MainLayout } from "../components/layout/MainLayout";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        // errorElement: <MiniApp404 />,
        children: [
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
                path: 'auth',
                element: <LoginPage />
            }
        ]
    }
])