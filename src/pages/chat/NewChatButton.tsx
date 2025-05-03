import { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ChatService } from '../../api/chat.service';
import { IUser } from '../../types/user/user';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/user/userSlice';
import { UserService } from '../../api/user.service';

interface NewChatButtonProps {
    onChatCreated: () => void;
}

export const NewChatButton = ({ onChatCreated }: NewChatButtonProps) => {
    const [open, setOpen] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<IUser[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(false);
    const currentUser = useAppSelector(selectUser);

    // Поиск пользователей с debounce
    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        if (query.trim().length < 2) {
            setSearchResults([]);
            return;
        }
        setLoading(true);
        try {
            const results = await UserService.searchUsers(query);
            // Исключаем себя и уже выбранных
            setSearchResults(results.filter(user => user.id !== currentUser?.id && !selectedUsers.some(u => u.id === user.id)));
        } catch (error) {
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };

    // Добавление/удаление пользователя из выбранных
    const handleToggleUser = (user: IUser) => {
        if (selectedUsers.some(u => u.id === user.id)) {
            setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const handleCreateGroup = async () => {
        if (!currentUser?.id || !groupName || selectedUsers.length < 2) return;
        try {
            await ChatService.createGroupChat(
                groupName,
                selectedUsers.map(user => user.id)
            );
            setOpen(false);
            setGroupName('');
            setSelectedUsers([]);
            setSearchQuery('');
            setSearchResults([]);
            onChatCreated();
        } catch (error) {
            console.error('Error creating group chat:', error);
        }
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpen(true)}
            >
                Новая группа
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Создать групповой чат</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Название группы"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        sx={{ mt: 2, mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Поиск пользователей"
                        value={searchQuery}
                        onChange={e => handleSearch(e.target.value)}
                        sx={{ mb: 2 }}
                        disabled={loading}
                    />
                    <List dense>
                        {searchResults.map(user => (
                            <ListItem key={user.id} onClick={() => handleToggleUser(user)} sx={{ cursor: 'pointer' }}>
                                <Checkbox
                                    checked={selectedUsers.some(u => u.id === user.id)}
                                    tabIndex={-1}
                                    disableRipple
                                />
                                <ListItemAvatar>
                                    <Avatar>{user.username[0]}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={user.username} secondary={user.email} />
                            </ListItem>
                        ))}
                    </List>
                    {selectedUsers.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2">Выбраны:</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                {selectedUsers.map(user => (
                                    <Box key={user.id} sx={{ display: 'flex', alignItems: 'center', bgcolor: '#e3f2fd', borderRadius: 2, px: 1, py: 0.5 }}>
                                        <Avatar sx={{ width: 24, height: 24, mr: 1 }}>{user.username[0]}</Avatar>
                                        <Typography variant="body2">{user.username}</Typography>
                                        <Button size="small" onClick={() => handleToggleUser(user)} sx={{ minWidth: 0, ml: 1 }}>&times;</Button>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Отмена</Button>
                    <Button
                        onClick={handleCreateGroup}
                        disabled={!groupName || selectedUsers.length < 2}
                        variant="contained"
                    >
                        Создать
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}; 