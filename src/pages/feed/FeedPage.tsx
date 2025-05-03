import { FC, useState } from 'react';
import { Box, Button, Collapse } from '@mui/material';
import { FeedList } from './FeedList';
import { CreateFeedForm } from './CreateFeedForm';

export const FeedPage: FC = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handlePostCreated = () => {
        setIsFormOpen(false);
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setIsFormOpen(!isFormOpen)}
                sx={{ mb: 2 }}
            >
                {isFormOpen ? 'Отмена' : 'Создать публикацию'}
            </Button>
            <Collapse in={isFormOpen}>
                <Box sx={{ mb: 3 }}>
                    <CreateFeedForm onPostCreated={handlePostCreated} />
                </Box>
            </Collapse>
            <FeedList refreshTrigger={refreshTrigger} />
        </Box>
    );
}; 