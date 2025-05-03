import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Avatar } from '@mui/material';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/user/userSlice';
import { IMessage } from '../../types/chat/chat.types';
import { ChatService } from '../../api/chat.service';
import { getTokenFromLocalStorage } from '../../helpers/localstorage.helper';

export const Chat = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const user = useAppSelector(selectUser);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.id) {
            console.log('No user found, skipping WebSocket connection');
            return;
        }

        const token = getTokenFromLocalStorage();
        if (!token) {
            console.log('No token found, skipping WebSocket connection');
            return;
        }

        const socketUrl = 'http://localhost:3000';
        console.log('Attempting to connect to WebSocket:', socketUrl);
        
        const newSocket = io(socketUrl, {
            path: '/socket.io',
            query: {
                token
            },
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            timeout: 10000
        });

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket with ID:', newSocket.id);
            setIsConnected(true);
            newSocket.emit('joinChat', Number(id));
        });

        newSocket.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error.message);
            setIsConnected(false);
        });

        newSocket.on('disconnect', (reason) => {
            console.log('Disconnected from WebSocket. Reason:', reason);
            setIsConnected(false);
        });

        newSocket.on('newMessage', (message: IMessage) => {
            console.log('New message received:', message);
            setMessages(prev => [...prev, message]);
        });

        newSocket.on('error', (error) => {
            console.error('WebSocket error:', error);
            if (error?.message === 'Access denied: not a participant of this chat') {
                alert('У вас нет доступа к этому чату!');
                navigate('/chats');
            }
        });

        setSocket(newSocket);

        return () => {
            console.log('Cleaning up WebSocket connection');
            if (newSocket.connected) {
                newSocket.disconnect();
            }
        };
    }, [user, id]);

    useEffect(() => {
        if (id) {
            console.log('Fetching messages for chat:', id);
            fetchMessages();
        }
    }, [id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchMessages = async () => {
        try {
            const data = await ChatService.getChatMessages(Number(id));
            console.log('Fetched messages:', data);
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !socket || !isConnected) {
            console.log('Cannot send message:', { 
                hasMessage: !!newMessage.trim(), 
                hasSocket: !!socket, 
                isConnected,
                socketId: socket?.id
            });
            return;
        }

        try {
            console.log('Sending message:', { chatId: Number(id), content: newMessage });
            socket.emit('sendMessage', {
                chatId: Number(id),
                content: newMessage
            });
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <Box sx={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
                <Typography variant="h6">
                    Chat {id} - {isConnected ? 'Connected' : 'Disconnected'}
                </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, minHeight: 0, overflow: 'auto', p: 2 }}>
                {messages.map((message) => (
                    <Box
                        key={message.id}
                        sx={{
                            display: 'flex',
                            justifyContent: message.sender.id === user?.id ? 'flex-end' : 'flex-start',
                            mb: 2
                        }}
                    >
                        <Paper
                            sx={{
                                p: 2,
                                maxWidth: '70%',
                                backgroundColor: message.sender.id === user?.id ? '#e3f2fd' : '#f5f5f5'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Avatar>{message.sender.username[0]}</Avatar>
                                <Typography sx={{ ml: 1 }}>{message.sender.username}</Typography>
                            </Box>
                            <Typography>{message.content}</Typography>
                        </Paper>
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </Box>

            <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Введите сообщение..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        disabled={!isConnected}
                    />
                    <Button
                        variant="contained"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() || !isConnected}
                    >
                        Отправить
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}; 