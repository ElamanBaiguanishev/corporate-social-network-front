import { FC } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface RightDrawerProps {
    open: boolean;
    type: string;
    onClose: () => void;
}

export const RightDrawer: FC<RightDrawerProps> = ({ open, type, onClose }) => {
    const getContent = () => {
        switch (type) {
            case 'help':
                return (
                    <Box p={3}>
                        <Typography variant="h6">Помощь</Typography>
                        <Typography>Здесь будет содержимое справки</Typography>
                    </Box>
                );
            case 'search':
                return (
                    <Box p={3}>
                        <Typography variant="h6">Поиск</Typography>
                        <Typography>Здесь будет форма поиска</Typography>
                    </Box>
                );
            case 'notifications':
                return (
                    <Box p={3}>
                        <Typography variant="h6">Уведомления</Typography>
                        <Typography>Здесь будут уведомления</Typography>
                    </Box>
                );
            case 'profile':
                return (
                    <Box p={3}>
                        <Typography variant="h6">Профиль</Typography>
                        <Typography>Здесь будет информация профиля</Typography>
                    </Box>
                );
            case 'settings':
                return (
                    <Box p={3}>
                        <Typography variant="h6">Настройки</Typography>
                        <Typography>Здесь будут настройки</Typography>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 300,
                    marginTop: '64px', // AppBar height
                    height: 'calc(100% - 64px)',
                },
            }}
        >
            {getContent()}
        </Drawer>
    );
}; 