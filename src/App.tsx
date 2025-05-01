import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { Box, CircularProgress, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { themeChoice } from './newtheme';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getTokenFromLocalStorage } from './helpers/localstorage.helper';
import { useEffect, useState } from 'react';
import { AuthService } from './api/auth.service';
import { login, logout } from './store/user/userSlice';

function App() {
  const mode = useAppSelector((state) => state.theme.mode)
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    const token = getTokenFromLocalStorage();
    try {
      if (token) {
        const data = await AuthService.getProfile();
        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
    } catch (err: any) {
      const error = err.response?.data.message;
      console.log(error)
      // toast.error(error.toString())
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);


  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={createTheme(themeChoice(mode))}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
