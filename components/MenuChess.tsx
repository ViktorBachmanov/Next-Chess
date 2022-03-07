import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useRouter } from "next/router";

//import { useUser } from "@auth0/nextjs-auth0";

import MenuDialog from "./MenuDialog";

import { setLoginStatus } from "../features/auth/authSlice";
import { Storage } from "../constants";

export default function MenuChess() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const router = useRouter();

  const dispatch = useAppDispatch();

  //const { user, error, isLoading } = useUser();

  const loginStatus = useAppSelector(
    (state: RootState) => state.auth.loginStatus
  );

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogSubmitLabel, setDialogSubmitLabel] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function openDialogLogin() {
    setDialogTitle("Аутентификация");
    setDialogSubmitLabel("Ок");
    setDialogOpen(true);
  }

  function handleLogout() {
    //router.push("/api/auth/logout");
    localStorage.removeItem(Storage.TOKEN);
    dispatch(setLoginStatus(false));
    handleClose();
  }

  function openDialogAddGame() {
    setDialogTitle("Новая партия");
    setDialogSubmitLabel("Добавить");
    setDialogOpen(true);
    handleClose();
  }

  function openDialogDeleteGame() {
    setDialogTitle("Последняя партия");
    setDialogSubmitLabel("Удалить");
    setDialogOpen(true);
    handleClose();
  }

  return (
    <div>
      {/*console.log("MenuChess return")*/}

      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
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
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={openDialogLogin} disabled={loginStatus}>
          Войти
        </MenuItem>
        <MenuItem onClick={handleLogout} disabled={!loginStatus}>
          Выйти
        </MenuItem>
        <MenuItem onClick={openDialogAddGame} disabled={!loginStatus}>
          Добавить партию
        </MenuItem>
        <MenuItem onClick={openDialogDeleteGame} disabled={!loginStatus}>
          Удалить последнюю
        </MenuItem>
      </Menu>

      <MenuDialog
        isDialogOpen={isDialogOpen}
        setDialogOpen={setDialogOpen}
        title={dialogTitle}
        submitButtonLabel={dialogSubmitLabel}
      />
    </div>
  );
}
