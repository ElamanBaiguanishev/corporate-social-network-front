import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField } from '@mui/material';
import { ChatService } from '../../api/chat.service';
import { IChat } from '../../types/chat/chat.types';
import { IUser } from '../../types/user/user';
import { UserSearch } from './UserSearch';
import { ChatList } from './ChatList';
import { NewChatButton } from './NewChatButton';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/user/userSlice';

export const Chats = () => {
    const navigate = useNavigate();
    const [chats, setChats] = useState<IChat[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const currentUser = useAppSelector(selectUser);

    useEffect(() => {
        if (currentUser?.id) {
            fetchChats();
        }
    }, [currentUser]);

    const fetchChats = async () => {
        try {
            if (currentUser?.id) {
                const data = await ChatService.getChatsByUserId(+currentUser.id);
                setChats(data);
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    const handleUserSelect = async (user: IUser) => {
        if (!currentUser?.id) return;

        try {
            const chat = await ChatService.createPrivateChat(user.id);
            navigate(`/chat/${chat.id}`);
        } catch (error) {
            console.error('Error creating private chat:', error);
        }
    };

    const handleChatSelect = (chat: IChat) => {
        navigate(`/chat/${chat.id}`);
    };

    const filteredChats = chats.filter(chat => {
        if (chat.isGroup) {
            return chat.name?.toLowerCase().includes(searchQuery.toLowerCase());
        }
        const otherParticipant = chat.participants.find(p => p.id !== currentUser?.id);
        return otherParticipant?.username.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5">Чаты</Typography>
                <NewChatButton onChatCreated={fetchChats} />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, minHeight: 0 }}>
                <Box sx={{ width: '30%', minHeight: 0 }}>
                    <UserSearch onUserSelect={handleUserSelect} />
                </Box>
                <Box sx={{ width: '70%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Поиск по чатам..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ flexGrow: 1, minHeight: 0, overflow: 'auto' }}>
                        <ChatList chats={filteredChats} onChatSelect={handleChatSelect} />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
