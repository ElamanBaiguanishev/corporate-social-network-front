import { FC, useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Avatar, Chip, Stack, CircularProgress } from '@mui/material';
import { FeedService } from '../../api/feed.service';
import { IFeed } from '../../types/feed/feed.types';
import { formatDate } from '../../helpers/date.helper';
import { roleTypeTranslations } from '../../types/role/role-types';

interface FeedListProps {
    refreshTrigger?: number;
}

export const FeedList: FC<FeedListProps> = ({ refreshTrigger = 0 }) => {
    const [feeds, setFeeds] = useState<IFeed[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFeeds = async () => {
        try {
            const data = await FeedService.getFeed();
            setFeeds(data);
        } catch (error) {
            console.error('Error fetching feeds:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeeds();
    }, [refreshTrigger]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {feeds.map((feed) => (
                <Card key={feed.id} sx={{ mb: 3, boxShadow: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar sx={{ width: 48, height: 48, mr: 2 }}>
                                {feed.author.username[0]}
                            </Avatar>
                            <Box>
                                <Typography variant="h6">
                                    {feed.author.username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {formatDate(feed.createdAt)}
                                </Typography>
                            </Box>
                        </Box>

                        {feed.title && (
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                {feed.title}
                            </Typography>
                        )}

                        <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', lineHeight: 1.6 }}>
                            {feed.content}
                        </Typography>

                        {(feed.taggedUsers.length > 0 || feed.taggedRoles.length > 0) && (
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                {feed.taggedUsers.map((user) => (
                                    <Chip
                                        key={user.id}
                                        label={user.username}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    />
                                ))}
                                {feed.taggedRoles.map((role) => (
                                    <Chip
                                        key={role.id}
                                        label={roleTypeTranslations[role.type as keyof typeof roleTypeTranslations]}
                                        size="small"
                                        color="secondary"
                                        variant="outlined"
                                    />
                                ))}
                            </Stack>
                        )}
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}; 