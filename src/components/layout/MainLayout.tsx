import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import { AppBarComponent } from './AppBar';
import { LeftDrawer } from './LeftDrawer';
import { RightDrawer } from './RightDrawer';

export const MainLayout: FC = () => {
    const [leftDrawerOpen, setLeftDrawerOpen] = useState(true);
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
    const [rightDrawerType, setRightDrawerType] = useState('');

    const handleLeftDrawerOpen = () => {
        setLeftDrawerOpen(true);
    };

    const handleLeftDrawerClose = () => {
        setLeftDrawerOpen(false);
    };

    const handleRightDrawerToggle = (type: string) => {
        if (rightDrawerOpen && rightDrawerType === type) {
            setRightDrawerOpen(false);
            setRightDrawerType('');
        } else {
            setRightDrawerOpen(true);
            setRightDrawerType(type);
        }
    };

    const handleRightDrawerClose = () => {
        setRightDrawerOpen(false);
        setRightDrawerType('');
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarComponent
                open={leftDrawerOpen}
                onOpen={handleLeftDrawerOpen}
                onClose={handleLeftDrawerClose}
            />
            <LeftDrawer open={leftDrawerOpen} />
            <RightDrawer
                open={rightDrawerOpen}
                type={rightDrawerType}
                onClose={handleRightDrawerClose}
                onToggleDrawer={handleRightDrawerToggle}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    pt: 10,
                    mr: 6,
                    height: '100vh',
                    overflow: 'auto',
                    transition: 'margin 0.3s ease-in-out',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};
