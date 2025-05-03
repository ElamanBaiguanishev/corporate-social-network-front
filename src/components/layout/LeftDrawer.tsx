import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { Chat as ChatIcon, Delete as DeleteIcon, Feed as FeedIcon, Assignment as TaskIcon } from '@mui/icons-material';

export const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        '& .MuiDrawer-paper': {
            top: 64, // Height of AppBar
            height: 'calc(100% - 64px)',
        },
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

interface DrawerComponentProps {
    open: boolean;
}

export const LeftDrawer: FC<DrawerComponentProps> = ({ open }) => {
    const menuItems = [
        {
            text: 'Лента',
            path: '/feed',
            icon: <FeedIcon />
        },
        {
            text: 'Задачи',
            path: '/tasks',
            icon: <TaskIcon />
        },
        {
            text: 'Чаты',
            path: '/chats',
            icon: <ChatIcon />
        }
    ];

    const additionalItems = [
        {
            text: 'Корзина',
            path: '/trash',
            icon: <DeleteIcon />
        }
    ];

    return (
        <Drawer variant="permanent" open={open}>
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                        justifyContent: 'initial',
                                    }
                                    : {
                                        justifyContent: 'center',
                                    },
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    },
                                    open
                                        ? {
                                            mr: 3,
                                        }
                                        : {
                                            mr: 'auto',
                                        },
                                ]}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={[
                                    open
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                        },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {additionalItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                        justifyContent: 'initial',
                                    }
                                    : {
                                        justifyContent: 'center',
                                    },
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    },
                                    open
                                        ? {
                                            mr: 3,
                                        }
                                        : {
                                            mr: 'auto',
                                        },
                                ]}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={[
                                    open
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                        },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};