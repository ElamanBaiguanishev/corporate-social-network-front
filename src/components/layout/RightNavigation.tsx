import { FC } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

interface RightNavigationProps {
    onToggleDrawer: (type: string) => void;
}

export const RightNavigation: FC<RightNavigationProps> = ({ onToggleDrawer }) => {
    return (
        <Box
            sx={{
                position: 'fixed',
                right: 0,
                top: 64, // AppBar height
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                p: 1,
                zIndex: 1100,
            }}
        >
            <IconButton
                onClick={() => onToggleDrawer('help')}
                sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'action.hover' } }}
            >
                <HelpIcon />
            </IconButton>
            <IconButton
                onClick={() => onToggleDrawer('search')}
                sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'action.hover' } }}
            >
                <SearchIcon />
            </IconButton>
            <IconButton
                onClick={() => onToggleDrawer('notifications')}
                sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'action.hover' } }}
            >
                <NotificationsIcon />
            </IconButton>
            <IconButton
                onClick={() => onToggleDrawer('profile')}
                sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'action.hover' } }}
            >
                <AccountCircleIcon />
            </IconButton>
            <IconButton
                onClick={() => onToggleDrawer('settings')}
                sx={{ bgcolor: 'background.paper', '&:hover': { bgcolor: 'action.hover' } }}
            >
                <SettingsIcon />
            </IconButton>
        </Box>
    );
}; 