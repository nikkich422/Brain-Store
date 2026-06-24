import React from 'react'
import { RiMenu2Line } from "react-icons/ri";
import { RiMenu3Fill } from "react-icons/ri";
import { FaRegBell } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import Badge, { badgeClasses } from '@mui/material/Badge';

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import toast from 'react-hot-toast';
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/slice/authSlice';

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -11px;
    right: -2px;
  }
`;

const AdminHeader = (props) => {

  const {isSidebarOpen, setIsSidebarOpen} = props;
  const [openProfile, setOpenProfile] = React.useState(false);
  const anchorRefProfile = React.useRef(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCloseProfile = (event) => {
    if (
      anchorRefProfile.current &&
      anchorRefProfile.current.contains(event.target)
    ) {
      return;
    }

    setOpenProfile(false);
  };
  const handleToggleProfile = () => {
    setOpenProfile((prevOpenProfile) => !prevOpenProfile);
  };

  function handleListKeyDownProfile(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenProfile(false);
    } else if (event.key === "Escape") {
      setOpenProfile(false);
    }
  }

  const handleLogout = async (e) => {
    handleCloseProfile(e);
    toast.promise(dispatch(logoutUser()).unwrap(), {
      loading: "Logging out...",
      success: "Logout success",
      failed: "Logout failed",
    });
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white shadow-md h-16 flex items-center px-2 py-3 justify-between z-10 transition-all delay-500">
      <div>
        <Button
          className="min-w-auto! w-auto! h-auto! rounded-full! text-black!"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <RiMenu3Fill className="text-xl cursor-pointer" />
          ) : (
            <RiMenu2Line className="text-xl cursor-pointer" />
          )}
        </Button>
      </div>
      <div className="flex gap-2 pr-4">
        <Button className="min-w-auto! w-auto! h-auto! rounded-full! text-black!">
          <FaRegBell className="text-xl cursor-pointer" />
          <CartBadge badgeContent={6} color="primary" overlap="circular" />
        </Button>
          <Button
              ref={anchorRefProfile}
              id="profile-btn"
              className="min-w-auto! w-auto! h-auto! rounded-full! text-black!"
              aria-controls={openProfile ? "composition-menu" : undefined}
              aria-expanded={openProfile ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggleProfile}
            >
              <FaRegUser className="text-xl cursor-pointer" />
            </Button>
          <Popper
                open={openProfile}
                anchorEl={anchorRefProfile.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseProfile}>
                        <MenuList
                          autoFocusItem={openProfile}
                          id="composition-menu"
                          aria-labelledby="profile-btn"
                          onKeyDown={handleListKeyDownProfile}
                        >
                          <MenuItem onClick={handleCloseProfile}>
                            <Link to="/">HomePage</Link>
                          </MenuItem>
                          <MenuItem onClick={handleCloseProfile}>
                            <Link to="/my-account">My account</Link>
                          </MenuItem>
                          <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
            </Popper>
      </div>
    </header>
  );
}

export default AdminHeader;