import React from "react";
import { Grid, Paper, Typography, TextField, Button, Box } from "@mui/material";
import { userState$ } from "../../../redux/selector";
import { useDispatch, useSelector } from "react-redux";
import * as userActions from "../../../redux/actions/userActions";

export default function Detail() {
  //Variable
  const dispatch = useDispatch();
  const user = useSelector(userState$)?.info;
  const customer = useSelector(userState$)?.infoCus;
  const [values, setValues] = React.useState(null);

  const customerList = [
    { label: "Họ tên", value: customer?.customerName },
    { label: "Mã khách hàng", value: customer?.customerCode },
    { label: "Số điện thoại", value: customer?.phoneNumber },
    { label: "Địa chỉ", value: customer?.address },
    { label: "Số công tơ", value: customer?.meterSeries },
    { label: "Mã số thuế", value: customer?.taxCode },
  ];

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
  console.log(customer)
  return (
    <Grid item>
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
        <Paper elevation={6} sx={{padding: '10px'}}>
          {customerList.map((elm, ind) => (
            <Box key={ind} sx={{display: 'flex'}}>
              <Typography style={{width: '15%', fontWeight: 'bold', fontSize: '18px'}}>{elm.label + ':'}</Typography>
              <Typography style={{color: 'blue', fontWeight: 'bold'}}>{elm.value}</Typography>
            </Box>
          ))}
        </Paper>
      )}
    </Grid>
  );
}
