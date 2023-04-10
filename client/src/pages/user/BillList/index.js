import React from "react";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { userState$ } from "../../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../redux/actions/userActions";
import TableComponent from "../../../components/Table/Table";
import { columns } from "./constant";
import { DragIndicator, Replay } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function BillList() {
  //Variabel
  const dispatch = useDispatch();
  const user = useSelector(userState$)?.info;
  const bills = useSelector(userState$)?.bills;
  const [values, setValues] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  //Functional

  const handleChange = (event) => {
    if (event.target) setValues({ customerCode: event.target.value });
  };

  const handleAddCusCode = () => {
    const payload = {
      ...values,
      id: user?._id,
    };
    dispatch(userActions.updateCusCode.updateCusCodeRequest(payload));
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleShow = (row) => {
    dispatch(userActions.showBill.showBillRequest(row));
    navigate('/user/bill');
  }
  const handleReload = () => dispatch(userActions.getBills.getBillsRequest(user?.customerCode));
  //render
  return (
    <Grid item xs={12}>
      {!user?.customerCode ? (
        <Paper
          elevation={6}
          sx={{ width: "50%", padding: "10px", margin: "10% auto" }}
        >
          <Typography>
            Vui lòng điền thông tin mã khách hàng của bạn để có thể xem thông
            tin chi tiết về khách hàng!
          </Typography>
          <TextField
            id="search"
            placeholder="Nhập mã khách hàng"
            onChange={handleChange}
            sx={{ m: 1, width: "96%" }}
            value={values?.customerCode || null}
          />
          <Button
            onClick={handleAddCusCode}
            variant="contained"
            sx={{ marginLeft: "83%" }}
          >
            + Thêm
          </Button>
        </Paper>
      ) : (
        <Grid item>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button title="Lọc" id="filter-menu" onClick={handleClick}>
              <DragIndicator />
            </Button>
            <Button onClick={handleReload}>
              <Replay /> Tải lại
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
          <TableComponent columns={columns} rows={bills} functional={handleShow} />
        </Grid>
      )}
    </Grid>
  );
}
