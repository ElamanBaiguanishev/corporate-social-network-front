import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Avatar, Tooltip, Typography, CircularProgress } from '@mui/material';
import { ChatService } from '../../api/chat.service';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/user/userSlice';
import { IChat } from '../../types/chat/chat.types';

export const ChatIconsList = () => {
    const [chats, setChats] = useState<IChat[]>([]);
    const [loading, setLoading] = useState(false);
    const currentUser = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChats = async () => {
            if (!currentUser?.id) return;
            setLoading(true);
            try {
                const data = await ChatService.getChatsByUserId(currentUser.id);
                setChats(data);
            } catch (e) {
                setChats([]);
            } finally {
                setLoading(false);
            }
        };
        fetchChats();
    }, [currentUser]);

    const getChatName = (chat: IChat) => {
        if (chat.isGroup) return chat.name || 'Группа';
        const other = chat.participants.find(p => p.id !== currentUser?.id);
        return other?.username || 'Приватный чат';
    };

    const getChatAvatar = (chat: IChat) => {
        if (chat.isGroup) return chat.name?.[0] || 'G';
        const other = chat.participants.find(p => p.id !== currentUser?.id);
        return other?.username[0] || 'U';
    };

    return (
        <Box sx={{ maxHeight: 300, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                    <CircularProgress size={24} />
                </Box>
            ) : (
                chats.map(chat => (
                    <Tooltip key={chat.id} title={getChatName(chat)} placement="left">
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', p: 0.5, borderRadius: 2, '&:hover': { bgcolor: 'action.hover' } }}
                            onClick={() => navigate(`/chat/${chat.id}`)}
                        >
                            <Avatar>{getChatAvatar(chat)}</Avatar>
                            <Typography variant="body2" noWrap>{getChatName(chat)}</Typography>
                        </Box>
                    </Tooltip>
                ))
            )}
        </Box>
    );
}; 