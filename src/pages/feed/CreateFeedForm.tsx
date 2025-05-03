import { FC, useState } from 'react';
import { TextField, Button, Autocomplete, Typography, Paper } from '@mui/material';
import { FeedService } from '../../api/feed.service';
import { UserService } from '../../api/user.service';
import { IUser } from '../../types/user/user';
import { IRole } from '../../types/role/role';
import { roleTypeTranslations } from '../../types/role/role-types';

interface CreateFeedFormProps {
    onPostCreated?: () => void;
}

export const CreateFeedForm: FC<CreateFeedFormProps> = ({ onPostCreated }) => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<IRole[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<IUser[]>([]);

    const handleUserSearch = async (query: string) => {
        if (query.length < 2) return;
        try {
            const results = await UserService.searchUsers(query);
            setSearchResults(results);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        try {
            await FeedService.createFeed({
                content,
                title,
                taggedUserIds: selectedUsers.map(user => user.id),
                taggedRoleIds: selectedRoles.map(role => role.id)
            });

            setContent('');
            setTitle('');
            setSelectedUsers([]);
            setSelectedRoles([]);
            setSearchResults([]);
            onPostCreated?.();
        } catch (error) {
            console.error('Error creating feed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Создать публикацию
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Содержание"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                />
                <Autocomplete
                    multiple
                    options={searchResults}
                    getOptionLabel={(option) => option.username}
                    value={selectedUsers}
                    onChange={(_, newValue) => setSelectedUsers(newValue)}
                    onInputChange={(_, newInputValue) => handleUserSearch(newInputValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Отметить пользователей"
                            placeholder="Начните вводить имя..."
                        />
                    )}
                    sx={{ mb: 2 }}
                />
                <Autocomplete
                    multiple
                    options={Object.values(roleTypeTranslations).map((name, index) => ({
                        id: index + 1,
                        name,
                        type: Object.keys(roleTypeTranslations)[index]
                    }))}
                    getOptionLabel={(option) => option.name}
                    value={selectedRoles}
                    onChange={(_, newValue) => setSelectedRoles(newValue as IRole[])}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Отметить роли"
                            placeholder="Выберите роли..."
                        />
                    )}
                    sx={{ mb: 2 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading || !content.trim()}
                    fullWidth
                >
                    {loading ? 'Публикация...' : 'Опубликовать'}
                </Button>
            </form>
        </Paper>
    );
}; 