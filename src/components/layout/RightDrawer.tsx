import { FC } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { RightNavigation } from './RightNavigation';
import { NotificationsList } from '../notifications/NotificationsList';

interface RightDrawerProps {
    open: boolean;
    type: string;
    onClose: () => void;
    onToggleDrawer: (type: string) => void;
}

export const RightDrawer: FC<RightDrawerProps> = ({ open, type, onClose, onToggleDrawer }) => {

    const getContent = () => {
        switch (type) {
            case 'help':
                return (
                    <Box p={2}>
                        <Typography variant="h6">Помощь</Typography>
                        <Typography>Здесь будет содержимое справки</Typography>
                    </Box>
                );
            case 'search':
                return (
                    <Box p={2}>
                        <Typography variant="h6">Поиск</Typography>
                        <Typography>Здесь будет форма поиска</Typography>
                    </Box>
                );
            case 'notifications':
                return <NotificationsList />;
            case 'profile':
                return (
                    <Box p={2}>
                        <Typography variant="h6">Профиль</Typography>
                        <Typography>Здесь будет информация профиля</Typography>
                    </Box>
                );
            case 'settings':
                return (
                    <Box p={2}>
                        <Typography variant="h6">Настройки</Typography>
                        <Typography>Здесь будут настройки</Typography>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <RightNavigation 
                onToggleDrawer={onToggleDrawer} 
                currentType={type} 
            />
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                variant="temporary"
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 300,
                        marginTop: 0,
                        height: '100%',
                        zIndex: 1250,
                        right: 48,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 0,
                    },
                    '& .MuiBackdrop-root': {
                        right: 48,
                        zIndex: 1200
                    }
                }}
            >
                {/* Контент выбранной вкладки */}
                <Box sx={{ flex: 1, overflowY: 'auto' }}>{getContent()}</Box>
            </Drawer>
        </>
    );
}; 