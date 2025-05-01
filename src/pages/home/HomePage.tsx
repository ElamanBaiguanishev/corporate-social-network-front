import { FC } from 'react';
import { Typography, Paper, Box } from '@mui/material';

export const HomePage: FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать в административную панель
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          Здесь вы можете управлять пользователями и настройками системы.
        </Typography>
      </Paper>
    </Box>
  );
};

export default HomePage;