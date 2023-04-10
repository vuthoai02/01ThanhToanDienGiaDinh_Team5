import React from "react";
import {
  Grid,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  Search,
  Add,
  DesktopAccessDisabled,
  Replay,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { adminState$ } from "../../../redux/selector";
import {
  createCustomer,
  searchCustomer,
  getCustomer,
  deleteCustomer,
} from "../../../redux/actions/adminActions";

import TableComponent from "../../../components/Table/Table";
import DialogField from "../../../components/DialogField/DialogField";
import { form, columns } from "./constant";

export default function QuanLyKH() {
  //set Variables
  const [values, setValues] = React.useState({
    customerCode: "",
    customerName: "",
    phoneNumber: "",
    address: "",
    meterSeries: "",
    houseHold: 1,
    paymentCode: "",
    businessCode: "",
    teamCode: 1,
    stationCode: "",
    voltage: 1,
    indicatorRecordDate: 28,
    businessChargeCode: "",
    taxCode: "",
  });
  const customers = useSelector(adminState$)?.customers;
  const [searchValue, setSearchValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [isLoad, setLoad] = React.useState(true);
  const dispatch = useDispatch();
  const [detail,setDetail] = React.useState(null);
  const formList = form(detail? detail:values);

  //Function
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleShow = (row) => {
    setDetail(row);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
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

  const handleChangeSearch = (event) => {
    if (event.target) setSearchValue({ customerCode: event.target.value });
  };

  const handleSearch = () => {
    dispatch(searchCustomer.searchCustomerRequest(searchValue));
    setSearchValue(null);
  };

  const handleSubmit = () => {
    dispatch(createCustomer.createCustomerRequest(values));
    setValues({
      customerCode: "",
      customerName: "",
      phoneNumber: "",
      address: "",
      meterSeries: "",
      houseHold: 1,
      paymentCode: "",
      businessCode: "",
      teamCode: 1,
      stationCode: "",
      voltage: 1,
      indicatorRecordDate: 28,
      businessChargeCode: "",
      taxCode: "",
    });
    handleClose();
  };

  const handleDelete = (row) => {
    if (row) dispatch(deleteCustomer.deleteCustomerRequest(row));
  };

  //Effect

  React.useEffect(() => {
    if (customers) {
      setLoad(false);
    }
  }, [customers]);

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
          <Button onClick={() => dispatch(getCustomer.getCustomerRequest())}>
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
        </Box>
      </Box>
      {isLoad ? (
        <CircularProgress sx={{ margin: "15% auto" }} />
      ) : customers?.length !== 0 ? (
        <TableComponent
          columns={columns}
          rows={customers}
          handleDelete={handleDelete}
          functional={handleShow}
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
        open={open}
        formList={formList}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        title="Thêm thông tin khách hàng"
      />
    </Grid>
  );
}
