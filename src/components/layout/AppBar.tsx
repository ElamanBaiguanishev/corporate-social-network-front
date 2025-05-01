import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
}));

interface AppBarComponentProps {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const AppBarComponent: FC<AppBarComponentProps> = ({ open, onOpen, onClose }) => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="toggle drawer"
                    onClick={open ? onClose : onOpen}
                    edge="start"
                    sx={{ marginRight: 2 }}
                >
                    {open ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    ВКР
                </Typography>
            </Toolbar>
        </AppBar>
    );
}; 