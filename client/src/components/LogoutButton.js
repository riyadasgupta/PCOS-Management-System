import React from "react";
import { useAuth } from "./AuthContext";
import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <Tooltip title="Logout">
      <IconButton 
        onClick={logout} 
        color="inherit"
        size="large"
        sx={{ ml: 2 }}
      >
        <LogoutIcon />
      </IconButton>
    </Tooltip>
  );
};

export default LogoutButton;
