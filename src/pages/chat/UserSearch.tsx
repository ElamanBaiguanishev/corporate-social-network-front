import { useState } from 'react';
import { Box, TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { UserService } from '../../api/user.service';
import { IUser } from '../../types/user/user';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/user/userSlice';

interface UserSearchProps {
    onUserSelect: (user: IUser) => void;
}

export const UserSearch = ({ onUserSelect }: UserSearchProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<IUser[]>([]);
    const currentUser = useAppSelector(selectUser);

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        if (query.trim()) {
            try {
                const results = await UserService.searchUsers(query);
                // Filter out current user from search results
                setUsers(results.filter(user => user.id !== currentUser?.id));
            } catch (error) {
                console.error('Error searching users:', error);
            }
        } else {
            setUsers([]);
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <TextField
                fullWidth
                size="small"
                placeholder="Поиск пользователей..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                sx={{ mb: 2 }}
            />
            <List>
                {users.map((user) => (
                    <ListItem
                        key={user.id}
                        onClick={() => onUserSelect(user)}
                        sx={{ cursor: 'pointer' }}
                    >
                        <ListItemAvatar>
                            <Avatar>{user.username[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.username} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}; 