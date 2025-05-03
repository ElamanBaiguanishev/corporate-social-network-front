import { FC, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import { ChatIconsList } from './ChatIconsList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUnreadCount, selectUnreadCount } from '../../store/notifications/notificationsSlice';

interface RightNavigationProps {
    onToggleDrawer: (type: string) => void;
    currentType: string;
}

const navigationItems = [
    { type: 'help', icon: <HelpIcon />, label: 'Помощь' },
    { type: 'search', icon: <SearchIcon />, label: 'Поиск' },
    { type: 'notifications', icon: <NotificationsIcon />, label: 'Уведомления' },
    { type: 'profile', icon: <AccountCircleIcon />, label: 'Профиль' },
    { type: 'settings', icon: <SettingsIcon />, label: 'Настройки' }
];

export const RightNavigation: FC<RightNavigationProps> = ({ onToggleDrawer, currentType }) => {
    const dispatch = useAppDispatch();
    const unreadCount = useAppSelector(selectUnreadCount);

    useEffect(() => {
        dispatch(fetchUnreadCount());
        // Обновляем счетчик каждые 30 секунд
        const interval = setInterval(() => {
            dispatch(fetchUnreadCount());
        }, 30000);

        return () => clearInterval(interval);
    }, [dispatch]);

    const getIcon = (item: typeof navigationItems[0]) => {
        if (item.type === 'notifications') {
            return (
                <Badge 
                    badgeContent={unreadCount} 
                    color="error"
                    sx={{
                        '& .MuiBadge-badge': {
                            right: -3,
                            top: 3,
                        }
                    }}
                >
                    {item.icon}
                </Badge>
            );
        }
        return item.icon;
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                right: 0,
                top: 0,
                width: 48,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                pt: 1,
                bgcolor: 'background.paper',
                borderLeft: 1,
                borderColor: 'divider',
                zIndex: 1300,
            }}
        >
            {navigationItems.map((item) => (
                <Tooltip key={item.type} title={item.label} placement="left">
                    <IconButton
                        size="small"
                        onClick={() => onToggleDrawer(item.type)}
                        sx={{
                            bgcolor: currentType === item.type ? 'action.selected' : 'transparent',
                            '&:hover': { bgcolor: 'action.hover' },
                        }}
                    >
                        {getIcon(item)}
                    </IconButton>
                </Tooltip>
            ))}
            {/* Список чатов пользователя */}
            <Box sx={{ flex: 1, width: '100%', mt: 2, borderTop: 1, borderColor: 'divider', overflowY: 'auto' }}>
                <ChatIconsList />
            </Box>
        </Box>
    );
}; 