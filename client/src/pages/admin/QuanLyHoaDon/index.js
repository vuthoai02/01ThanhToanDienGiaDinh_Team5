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
  Menu,
  MenuItem,
} from "@mui/material";
import { Search, Replay, Add, DragIndicator, DesktopAccessDisabled } from "@mui/icons-material";
import * as adminActions from "../../../redux/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import DialogField from "../../../components/DialogField/DialogField";
import TableComponent from "../../../components/Table/Table";

import { adminState$ } from '../../../redux/selector';
import { form, columns } from "./constant";

export default function QuanLyHoaDon() {
  //Variable
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [values, setValues] = React.useState({
    customerCode: "",
    newIndicator: 0,
    oldIndicator: 0,
    hs: 1,
    dntructiep: 0,
    actualElectric: 0,
    unitPrice: 0,
    VATRate: 10,
    signinDate: "",
    isPayment: false,
  });
  const formList = form(values);
  const bills = useSelector(adminState$).bills;
  const [isLoad,setLoad] = React.useState(false);
  //Functional
  const handleChangeSearch = (event) => {
    if (event.target) setSearchValue({ email: event.target.value });
  };

  const handleSearch = () => {
    if (searchValue) dispatch(adminActions.getUser.getUserRequest(searchValue));
    setSearchValue(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (event) => {
    if (event.target) {
      const { name, value, type } = event.target;
      if (type === "number") {
        setValues({ ...values, [name]: Number.parseInt(value) });
      } else {
        setValues({ ...values, [name]: value });
      }
    }
  };

  const handleSubmit = () => {
    dispatch(adminActions.createBill.createBillRequest(values));
    setValues({
      customerCode: "",
      newIndicator: 0,
      oldIndicator: 0,
      hs: 1,
      dntructiep: 0,
      actualElectric: 0,
      unitPrice: 0,
      VATRate: 10,
      signinDate: "",
      isPayment: false,
    });
    handleCloseDialog();
  };

  const handleReload = () => dispatch(adminActions.getBills.getBillsRequest());

  const handleDelete = (row) => dispatch(adminActions.deleteBill.deleteBillRequest(row));

  React.useEffect(() => {
    if (bills) {
      setLoad(false);
    }
  }, [bills]);
  //render
  return (
    <Grid item container>
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
          placeholder="Nhập mã khách hàng"
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
        <Box>
          <Button title="Lọc" id="filter-menu" onClick={handleClick}>
            <DragIndicator />
          </Button>
          <Button onClick={handleReload}>
            <Replay /> Tải lại
          </Button>
          <Button
            sx={{ marginLeft: "20px" }}
            variant="contained"
            color="success"
            onClick={handleClickOpen}
          >
            <Add /> Thêm
          </Button>
          <Menu
            id="small-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "filter-menu",
            }}
          >
            <MenuItem>Hóa đơn chưa thanh toán</MenuItem>
            <MenuItem>Hóa đơn đã thanh toán</MenuItem>
          </Menu>
        </Box>
      </Box>
      {isLoad ? (
        <CircularProgress sx={{ margin: "15% auto" }} />
      ) : bills?.length !== 0 ? (
        <TableComponent
          columns={columns}
          rows={bills}
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
      <DialogField
        open={openDialog}
        formList={formList}
        handleClose={handleCloseDialog}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        title="Thêm thông tin hóa đơn"
      />
    </Grid>
  );
}
