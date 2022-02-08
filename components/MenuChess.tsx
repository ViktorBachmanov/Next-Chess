import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useRouter } from 'next/router'

import { useUser } from '@auth0/nextjs-auth0';


export default function MenuChess() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const router = useRouter();

  const { user, error, isLoading } = useUser();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogin() {
    router.push('/api/auth/login');
  }

  return (
    <div>
      {/*<Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>*/}

      <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
        </IconButton>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem 
            onClick={handleLogin}
            disabled={user !== undefined}
        >
            Войти
        </MenuItem>
        <MenuItem 
            onClick={handleClose}
            disabled={user === undefined}
        >
            Добавить партию
        </MenuItem>
        <MenuItem 
            onClick={handleClose}
            disabled={user === undefined}
        >
            Удалить последнюю
        </MenuItem>
      </Menu>
    </div>
  );
}
