import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
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
  const [tab, setTab] = React.useState("");
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [newPassword, setPassword] = React.useState({
    password: "",
    repeatPassword: "",
  });
  const [isError, setError] = React.useState(true);

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

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleChange = (event) => {
    if (event.target)
      setPassword({ ...newPassword, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    for (var key in newPassword) {
      if (newPassword[key] === "") {
        setError({ key, text: "Không được để trống!" });
        break;
      } else {
        setError(false);
      }
    }
    if (!isError) {
      if (newPassword.password !== newPassword.repeatPassword) {
        setError({
          key: "repeatPassword",
          text: "Mật khẩu nhập lại không trùng khớp",
        });
      } else {
        dispatch(
          userActions.changePassword.changePasswordRequest({
            userId: user?._id,
            password: newPassword.password,
          })
        );
        setPassword({
          password: "",
          repeatPassword: "",
        });
        handleOpenDialog();
      }
    }
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
    if (tab === "qlkh") dispatch(adminActions.getCustomer.getCustomerRequest());
    if (tab === "qlu") dispatch(adminActions.getAllUsers.getAllUsersRequest());
    if (tab === "qlhd") dispatch(adminActions.getBills.getBillsRequest());
    if (tab === "hd" && user?.customerCode){
      console.log('CALL')
      dispatch(userActions.getBills.getBillsURequest(user?.customerCode));
    }
    if (tab === "info" && user?.customerCode)
      dispatch(
        userActions.fetchCustomer.fetchCustomerRequest(user?.customerCode)
      );
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
          <MenuItem onClick={handleOpenDialog}>Thay đổi mật khẩu</MenuItem>
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
      <Dialog open={openDialog} onClose={handleOpenDialog}>
        <DialogTitle>Thay đổi mật khẩu</DialogTitle>
        <DialogContent>
          <TextField
            type="password"
            name="password"
            label="Mật khẩu mới"
            variant="outlined"
            value={newPassword?.password}
            onChange={handleChange}
            fullWidth
            sx={{ margin: "10px 0" }}
            error={isError?.key === "password" ? true : false}
            helperText={isError?.key === "password" && isError?.text}
          />
          <TextField
            type="password"
            name="repeatPassword"
            label="Nhập lại mật khẩu"
            variant="outlined"
            value={newPassword?.repeatPassword}
            onChange={handleChange}
            fullWidth
            error={isError?.key === "repeatPassword" ? true : false}
            helperText={isError?.key === "repeatPassword" && isError?.text}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenDialog} color="error">
            Hủy
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
