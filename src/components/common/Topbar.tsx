import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from 'react-redux';
import { useAppSelector } from "../../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { removeTokenFromLocalStorage } from "../../helpers/localstorage.helper";
import { logout } from "../../store/user/userSlice";
import { FC } from "react";

const Topbar: FC = () => {
  const dispatch = useDispatch();
  const isAuth = useAuth();
  const navigate = useNavigate();
  const userName = useAppSelector((state) => state.user.user!);

  const logoutHandler = () => {
    dispatch(logout());
    removeTokenFromLocalStorage('token');
    navigate('/auth');
  };

  return (
    <AppBar position="static" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6">
          Соц. Сеть
        </Typography>

        {isAuth ? (
          <div className="header-links" style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </Link>
            <Link to={`/profile/${userName.id}`} className="header-username" style={{ textDecoration: 'none', color: 'inherit' }}>
              <IconButton>
                <AccountCircleIcon />
                <Typography sx={{ ml: 1 }}>{userName.username}</Typography>
              </IconButton>
            </Link>
            <Button onClick={logoutHandler} startIcon={<ExitToAppIcon />} color="inherit">
              Выход
            </Button>
          </div>
        ) : (
          <Link to="/auth" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button startIcon={<ExitToAppIcon />} color="inherit">
              Войти
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
