import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { RoleTypes } from '../../types/role/role-types';

interface Props {
    children: React.ReactNode;
    allowedRoles: RoleTypes[];
}

export const RoleGuard: FC<Props> = ({ children, allowedRoles }) => {
    const user = useAppSelector((state) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !allowedRoles.includes(user.role.type as RoleTypes)) {
            navigate('/');
        }
    }, [user, allowedRoles, navigate]);

    if (!user || !allowedRoles.includes(user.role.type as RoleTypes)) {
        return null;
    }

    return <>{children}</>;
}; 