import React from "react";
import {
  Grid,
  TextField,
  Box,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Search, Replay } from "@mui/icons-material";
import * as adminActions from "../../../redux/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import { adminState$ } from "../../../redux/selector";
import { DesktopAccessDisabled } from "@mui/icons-material";

import TableComponent from "../../../components/Table/Table";
import { columns } from "./constant";

export default function QuanLyNguoiDung() {
  //Variable
  const dispatch = useDispatch();
  const users = useSelector(adminState$)?.users;
  const [searchValue, setSearchValue] = React.useState(null);
  const [isLoad, setLoad] = React.useState(true);
  //Functional
  const handleChangeSearch = (event) => {
    if (event.target) setSearchValue({ email: event.target.value });
  };

  const handleSearch = () => {
    if (searchValue) dispatch(adminActions.getUser.getUserRequest(searchValue));
    setSearchValue(null);
  };

  const handleChangeAuth = (row) => {
    if (row) {
      dispatch(
        adminActions.changeAuth.changeAuthRequest({
          id: row?._id,
          role: row?.role,
        })
      );
      handleReload();
    }
  };

  const handleReload = () => {
    dispatch(adminActions.getAllUsers.getAllUsersRequest());
  };

  const handleDelete = (row) => {
    console.log(row);
    dispatch(adminActions.delelteUser.delelteUserRequest(row));
  }

  //Effect
  React.useEffect(() => {
    if (users) {
      setLoad(false);
    }
  }, [users]);
  //render
  return (
    <Grid>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          id="search"
          placeholder="Nhập email người dùng"
          onChange={handleChangeSearch}
          sx={{ m: 1, width: "30ch" }}
          value={searchValue?.customerCode || null}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleSearch}>
                  <Search color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button onClick={handleReload}>
          <Replay /> Tải lại
        </Button>
      </Box>
      {isLoad ? (
        <CircularProgress sx={{ margin: "15% auto" }} />
      ) : users ? (
        <TableComponent
          columns={columns}
          rows={users}
          functional={handleChangeAuth}
          handleDelete={handleDelete}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            margin: "15% auto",
          }}
        >
          <DesktopAccessDisabled sx={{ fontSize: "100px", color: "gray" }} />
          <Typography fontWeight="bold">
            Không có khách hàng nào trong danh sách!
          </Typography>
        </Box>
      )}
    </Grid>
  );
}
