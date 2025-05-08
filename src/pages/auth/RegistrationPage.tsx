import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';
import { AuthService } from '../../api/auth.service';
import { IRole } from '../../types/role/role';
import { IUserRegPayloadData } from '../../types/user/user.payload';
import { RoleService } from '../../api/role.service';
import { IRolePayloadData } from '../../types/role/role.payload';
import { RoleTypes } from '../../types/role/role-types';
import { UserService } from '../../api/user.service';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IUser } from '../../types/user/user';

export const RegistrationPage = () => {
    // User registration states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [roleId, setRoleId] = useState<number>(0);
    const [roles, setRoles] = useState<IRole[]>([]);
    const [userError, setUserError] = useState('');
    const [isUserLoading, setIsUserLoading] = useState(false);

    // Role creation states
    const [roleName, setRoleName] = useState('');
    const [roleType, setRoleType] = useState<RoleTypes>(RoleTypes.MANAGER);
    const [roleError, setRoleError] = useState('');
    const [isRoleLoading, setIsRoleLoading] = useState(false);

    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await RoleService.getAllRoles();
                setRoles(rolesData);
                if (rolesData.length > 0) {
                    setRoleId(rolesData[0].id);
                }
            } catch (err) {
                setUserError('Ошибка при загрузке ролей');
            }
        };
        const fetchUsers = async () => {
            try {
                const usersData = await UserService.getAllUsers();
                setUsers(usersData);
            } catch (err) {
                // Можно добавить обработку ошибок
            }
        };
        fetchRoles();
        fetchUsers();
    }, []);

    const handleUserSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUserError('');
        setIsUserLoading(true);

        try {
            const userData: IUserRegPayloadData = {
                email,
                password,
                username,
                roleId,
            };

            await AuthService.registration(userData);
            // Clear form after successful registration
            setEmail('');
            setPassword('');
            setUsername('');
            setUserError('');
        } catch (err: any) {
            setUserError(err.response?.data?.message || 'Ошибка при регистрации пользователя');
        } finally {
            setIsUserLoading(false);
        }
    };

    const handleRoleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setRoleError('');
        setIsRoleLoading(true);

        try {
            const roleData: IRolePayloadData = {
                name: roleName,
                type: roleType,
            };

            await RoleService.createRole(roleData);
            // Refresh roles list
            const updatedRoles = await RoleService.getAllRoles();
            setRoles(updatedRoles);
            // Clear form after successful creation
            setRoleName('');
            setRoleError('');
        } catch (err: any) {
            setRoleError(err.response?.data?.message || 'Ошибка при создании роли');
        } finally {
            setIsRoleLoading(false);
        }
    };

    const handleRoleChange = (event: SelectChangeEvent<number>) => {
        setRoleId(event.target.value as number);
    };

    const handleRoleTypeChange = (event: SelectChangeEvent<RoleTypes>) => {
        setRoleType(event.target.value as RoleTypes);
    };

    return (
        <Container maxWidth={false} disableGutters sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component="h1" variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
                Управление пользователями
            </Typography>
            <Box sx={{ width: '60vw', minWidth: 700, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Первый ряд: роли */}
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, width: '100%' }}>
                    {/* Таблица ролей */}
                    <Box sx={{ flex: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>Список ролей</Typography>
                        <TableContainer sx={{ maxHeight: 180, height: 180, borderRadius: 2, boxShadow: 1, border: '1px solid #eee' }}>
                            <Table size="small" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Название</TableCell>
                                        <TableCell>Тип</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {roles.map((role) => (
                                        <TableRow key={role.id}>
                                            <TableCell>{role.id}</TableCell>
                                            <TableCell>{role.name}</TableCell>
                                            <TableCell>{role.type}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    {/* Форма создания роли */}
                    <Box sx={{ flex: 2, height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', p: 2, borderRadius: 2, boxShadow: 1, border: '1px solid #eee', background: '#fff' }}>
                        <Typography component="h2" variant="h6" gutterBottom>
                            Создание роли
                        </Typography>
                        {roleError && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {roleError}
                            </Alert>
                        )}
                        <Box component="form" onSubmit={handleRoleSubmit} sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <TextField
                                margin="dense"
                                required
                                fullWidth
                                label="Название роли"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                            />
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Тип роли</InputLabel>
                                <Select
                                    value={roleType}
                                    label="Тип роли"
                                    onChange={handleRoleTypeChange}
                                >
                                    {Object.values(RoleTypes).map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 }}
                                disabled={isRoleLoading}
                            >
                                {isRoleLoading ? 'Создание...' : 'Создать роль'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
                {/* Второй ряд: пользователи */}
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, width: '100%' }}>
                    {/* Таблица пользователей */}
                    <Box sx={{ flex: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>Список пользователей</Typography>
                        <TableContainer sx={{ maxHeight: 320, height: 320, borderRadius: 2, boxShadow: 1, border: '1px solid #eee' }}>
                            <Table size="small" stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Имя</TableCell>
                                        <TableCell>Роль</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.username}</TableCell>
                                            <TableCell>{user.role?.name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    {/* Форма регистрации пользователя */}
                    <Box sx={{ flex: 2, height: 320, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', p: 2, borderRadius: 2, boxShadow: 1, border: '1px solid #eee', background: '#fff' }}>
                        <Typography component="h2" variant="h6" gutterBottom>
                            Регистрация пользователя
                        </Typography>
                        {userError && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {userError}
                            </Alert>
                        )}
                        <Box component="form" onSubmit={handleUserSubmit} sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <TextField
                                margin="dense"
                                required
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                required
                                fullWidth
                                label="Имя пользователя"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                required
                                fullWidth
                                label="Пароль"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Роль</InputLabel>
                                <Select
                                    value={roleId}
                                    label="Роль"
                                    onChange={handleRoleChange}
                                >
                                    {roles.map((role) => (
                                        <MenuItem key={role.id} value={role.id}>
                                            {role.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 }}
                                disabled={isUserLoading}
                            >
                                {isUserLoading ? 'Регистрация...' : 'Зарегистрировать'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}; 