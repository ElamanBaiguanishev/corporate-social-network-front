import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import { AppBarComponent } from './AppBar';
import { LeftDrawer } from './LeftDrawer';
import { RightNavigation } from './RightNavigation';
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
            <RightNavigation onToggleDrawer={handleRightDrawerToggle} />
            <RightDrawer
                open={rightDrawerOpen}
                type={rightDrawerType}
                onClose={handleRightDrawerClose}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8,
                    mr: 7
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};
