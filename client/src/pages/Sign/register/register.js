import React from "react";
import TextField from "../../../components/Field/TextField";
import { useDispatch } from "react-redux";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Link,
  CircularProgress,
} from "@mui/material";
import {Bolt} from '@mui/icons-material'

import { createUser } from "../../../redux/actions/userActions.js";

export default function Login() {
  const [values, setValues] = React.useState({
    userName: "",
    customerCode: "",
    email: "",
    password: "",
    role: false,
  });
  const dispatch = useDispatch();
  const [isLoading, setLoading] = React.useState(false);

  const formList = [
    {
      name: "userName",
      label: "Tên người dùng",
      type: "text",
      width: 12,
      value: values.userName,
      required: true,
    },
    {
      name: "customerCode",
      label: "Mã khách hàng (nếu có)",
      type: "text",
      width: 12,
      value: values.customerCode,
      required: false,
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      width: 12,
      value: values.email,
      required: true,
    },
    {
      name: "password",
      label: "Mật khẩu",
      type: "password",
      width: 12,
      value: values.password,
      required: true,
    },
  ];

  const handleChange = (event) => {
    if (event.target) {
      const { name, value, type } = event.target;
      setValues({ ...values, [name]: value });
    }
  };

  const handleRegister = React.useCallback(() => {
    setLoading(true);
    dispatch(createUser.createUserRequest(values));
    setValues({
      userName: "",
      password: "",
      role: false,
      customerCode: "",
      email: "",
    });
  }, [values, dispatch]);


  return (
    <Grid item xs={12} className="container" sx={{ height: "98vh" }}>
      <Typography
        style={{
          fontSize: 28,
          fontWeight: "bold",
          backgroundColor: "green",
          color: "white",
          padding: "5px 10px",
        }}
      >
        <Bolt fontSize="large"/>
        EEnergy
      </Typography>
      <Paper
        elevation={6}
        sx={{
          padding: "15px",
          width: "20%",
          display: "flex",
          flexDirection: "column",
          margin: "10% auto 20px auto",
        }}
      >
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: 24,
            fontFamily: "sans-serif",
            color: "green",
          }}
        >
          Đăng ký
        </Typography>
        {formList.map((elm) => (
          <TextField
            name={elm.name}
            label={elm.label}
            type={elm.type}
            width={elm.width}
            value={elm.value}
            required={elm.required}
            handleChange={handleChange}
          />
        ))}
        <Button
        onClick={handleRegister}
          disabled={isLoading}
          variant="contained"
          color="success"
          sx={{ marginTop: "10px" }}
        >
          {isLoading ? <CircularProgress color="inherit" /> : "Submit"}
        </Button>
        <Link underline="none" margin={"10px 0"} href='/login'>
          Đăng nhập
        </Link>
      </Paper>
    </Grid>
  );
}
