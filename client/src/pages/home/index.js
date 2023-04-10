import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Tab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { userState$ } from "../../redux/selector";
import { AccountCircleRounded, ArrowDropDown, Bolt } from "@mui/icons-material";

import * as userActions from "../../redux/actions/userActions";
import * as adminActions from "../../redux/actions/adminActions";
import { adminTabList, userTabList } from "./authorTab";

export default function Home() {
  //set Variables
  const user = useSelector(userState$)?.info;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [tab, setTab] = React.useState('');
  const dispatch = useDispatch();

  //Function
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(userActions.logout());
  };

  //useEffect

  const accessToken = JSON.parse(localStorage.getItem("user"))?.accessToken;
  React.useEffect(() => {
    if (accessToken) {
      dispatch(userActions.getUserById.getUserByIdRequest(accessToken));
    } else {
      window.location.href = "/login";
    }
  }, [accessToken, dispatch]);

  React.useEffect(() => {
    if (user) {
      setTab(user?.role ? "qlkh" : "hd");
    }
  }, [user]);

  React.useEffect(() => {
    if(tab === 'qlkh') dispatch(adminActions.getCustomer.getCustomerRequest());
    if(tab === 'qlu') dispatch(adminActions.getAllUsers.getAllUsersRequest());
    if(tab === 'qlhd') dispatch(adminActions.getBills.getBillsRequest());
    if(tab === 'hd' && user?.customerCode) dispatch(userActions.getBills.getBillsRequest(user?.customerCode));
    if(tab === 'info' && user?.customerCode) dispatch(userActions.fetchCustomer.fetchCustomerRequest(user?.customerCode));
  }, [tab, dispatch]);

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          padding: "5px 10px",
          backgroundColor: "green",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "white",
          }}
        >
          <Bolt fontSize="large" />
          EEnergy
        </Typography>
        <Button
          id="icon-menu"
          style={{ color: "white", fontSize: "18px", textTransform: "none" }}
          size="large"
          aria-controls={open ? "small-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          startIcon={<AccountCircleRounded />}
          endIcon={<ArrowDropDown />}
        >
          {user?.userName}
        </Button>
        <Menu
          id="small-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "icon-menu",
          }}
        >
          <MenuItem onClick={handleClose}>Thay đổi mật khẩu</MenuItem>
          <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
            Đăng xuất
          </MenuItem>
        </Menu>
      </Box>
      <Box sx={{ width: "80%", margin: "10px auto" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              variant="scrollable"
              scrollButtons="auto"
              onChange={handleChangeTab}
              aria-label="functional"
            >
              {user?.role
                ? adminTabList.map((elm, ind) => (
                    <Tab
                      key={ind}
                      label={elm.label}
                      icon={elm.icon}
                      value={elm.value}
                      iconPosition="start"
                    />
                  ))
                : userTabList.map((elm, ind) => (
                    <Tab
                      key={ind}
                      label={elm.label}
                      icon={elm.icon}
                      value={elm.value}
                      iconPosition="start"
                    />
                  ))}
            </TabList>
          </Box>
          {user?.role
            ? adminTabList.map((elm, ind) => (
                <TabPanel key={ind} value={elm.value}>
                  {elm.page}
                </TabPanel>
              ))
            : userTabList.map((elm, ind) => (
                <TabPanel key={ind} value={elm.value}>
                  {elm.page}
                </TabPanel>
              ))}
        </TabContext>
      </Box>
    </Grid>
  );
}
