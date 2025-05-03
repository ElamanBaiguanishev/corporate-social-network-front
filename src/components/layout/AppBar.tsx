import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { Box, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../../helpers/localstorage.helper';

const AppBar = styled(MuiAppBar)(({  }) => ({
    zIndex: 1100,
    width: 'calc(100% - 48px)',
    right: 48,
}));

interface AppBarComponentProps {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const AppBarComponent: FC<AppBarComponentProps> = ({ open, onOpen, onClose }) => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        removeTokenFromLocalStorage('token');
        navigate('/auth');
    };

    return (
        <AppBar position="fixed" sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, maxWidth: 600, mx: 4 }}>
                    <TextField
                        size="small"
                        placeholder="Поиск по проекту..."
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {user ? (
                        <>
                            <Typography variant="body1">
                                {user.username}
                            </Typography>
                            <Button 
                                color="inherit" 
                                onClick={handleLogout}
                            >
                                Выход
                            </Button>
                        </>
                    ) : (
                        <Button 
                            color="inherit" 
                            onClick={() => navigate('/auth')}
                        >
                            Вход
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}; 