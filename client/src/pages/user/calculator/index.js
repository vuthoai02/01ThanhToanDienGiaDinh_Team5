import React from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { SumPayment } from "../../../components/Calculator";

export default function Caculator() {
  const [values, setValues] = React.useState({
    indicator: 0,
    holdHouse: 1,
  });
  const [total, setTotal] = React.useState(false);
  const formList = [
    {
      name: "holdHouse",
      label: "Số hộ sử dụng",
      value: values?.holdHouse,
      type: "number",
    },
    {
      name: "indicator",
      label: "Tổng số điện dùng",
      value: values?.indicator,
      type: "number",
    },
  ];

  const handleCal = () => setTotal(!total);

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
  return (
    <Grid item>
      <Paper elevation={6} sx={{ padding: "10px" }}>
        <Typography
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "green",
            marginBottom: "10px",
          }}
        >
          Nhập thông số (trong vòng 1 tháng)
        </Typography>
        <Box>
          {formList.map((elm, ind) => (
            <TextField
              key={ind}
              name={elm.name}
              label={elm.label}
              InputLabelProps={{ shrink: true, required: true }}
              type={elm.type}
              variant="outlined"
              value={elm.value}
              onChange={handleChange}
              sx={{ marginTop: "10px", width: "22%", marginLeft: "10px" }}
            />
          ))}
          <Button sx={{margin:'20px 10px'}} variant="contained" disabled={total} onClick={handleCal}>Thực hiện</Button>
          <Button sx={{margin:'20px 10px'}} variant="contained" disabled={!total} onClick={handleCal}>Phép tính mới</Button>
        </Box>
        {total && <SumPayment klW={values?.indicator} house={values?.holdHouse} isTotal={total}/>}
      </Paper>
    </Grid>
  );
}
