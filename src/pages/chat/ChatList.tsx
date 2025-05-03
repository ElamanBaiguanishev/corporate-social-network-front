import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { IChat } from '../../types/chat/chat.types';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/user/userSlice';

interface ChatListProps {
    chats: IChat[];
    onChatSelect: (chat: IChat) => void;
}

export const ChatList = ({ chats, onChatSelect }: ChatListProps) => {
    const currentUser = useAppSelector(selectUser);

    const getChatName = (chat: IChat) => {
        if (chat.isGroup) {
            return chat.name;
        }
        const otherParticipant = chat.participants.find(p => p.id !== currentUser?.id);
        return otherParticipant?.username || 'Unknown User';
    };

    const getChatAvatar = (chat: IChat) => {
        if (chat.isGroup) {
            return chat.name?.[0] || 'G';
        }
        const otherParticipant = chat.participants.find(p => p.id !== currentUser?.id);
        return otherParticipant?.username[0] || 'U';
    };

    return (
        <List>
            {chats.map((chat) => (
                <ListItem
                    key={chat.id}
                    onClick={() => onChatSelect(chat)}
                    sx={{ cursor: 'pointer' }}
                >
                    <ListItemAvatar>
                        <Avatar>{getChatAvatar(chat)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={getChatName(chat)}
                        secondary={chat.messages?.[0]?.content}
                    />
                </ListItem>
            ))}
        </List>
    );
}; 