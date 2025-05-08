import { FC, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface Props {
    children: React.ReactNode;
    requireAuth?: boolean;
}

export const AuthGuard: FC<Props> = ({ children, requireAuth = true }) => {
    const isAuth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (requireAuth && !isAuth) {
            // Redirect to auth page if trying to access protected route while not authenticated
            navigate('/auth', { state: { from: location.pathname } });
        } else if (!requireAuth && isAuth) {
            // Redirect to home page if trying to access auth page while authenticated
            navigate('/');
        }
    }, [isAuth, navigate, location, requireAuth]);

    // If the route requires auth and user is not authenticated, don't render anything
    if (requireAuth && !isAuth) {
        return null;
    }

    // If the route is public and user is authenticated, don't render anything
    if (!requireAuth && isAuth) {
        return null;
    }

    return <>{children}</>;
}; 