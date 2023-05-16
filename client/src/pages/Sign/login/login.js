import React, { useEffect, useState } from "react";
import CustomField from "../../../components/Field/TextField";
import { useSelector, useDispatch } from "react-redux";
import { userState$ } from "../../../redux/selector";
import { getUser } from "../../../redux/actions/userActions.js";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Link,
  Box,
  CircularProgress,
} from "@mui/material";
import { Bolt } from "@mui/icons-material";

export default function Login() {
  const user = useSelector(userState$)?.info;
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    role: false,
  });
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState("");
  const dispatch = useDispatch();

  const formList = [
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
      const { name, value } = event.target;
      setValues({ ...values, [name]: value });
    }
  };

  const handleLogin = React.useCallback(() => {
    for (var key in values) {
      if (values[key] === "") {
        setEmpty(key);
        break;
      } else {
        setEmpty(false);
      }
    }
    if (!isEmpty) {
      setLoading(true);
      dispatch(getUser.getUserRequest(values));
      setValues({
        userName: "",
        password: "",
        role: false,
      });
    }
  }, [values, dispatch]);

  useEffect(() => {
    if (user) {
      setLoading(false);
      window.location.href = "/";
    }
  }, [user]);

  useEffect(() => {
    if (isLoading && !user) {
      setTimeout(() => {
        setLoading(false);
        setValues({
          userName: "",
          password: "",
          role: false,
        });
      }, 4000);
    }
  }, [isLoading, user]);

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
        <Bolt fontSize="large" />
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
          Đăng nhập
        </Typography>
        {formList.map((elm) => (
          <CustomField
            name={elm.name}
            label={elm.label}
            type={elm.type}
            width={elm.width}
            value={elm.value}
            required={elm.required}
            isEmpty={isEmpty}
            handleChange={handleChange}
          />
        ))}
        <Button
          onClick={handleLogin}
          disabled={isLoading}
          variant="contained"
          color="success"
          sx={{ marginTop: "10px" }}
        >
          {isLoading ? <CircularProgress color="inherit" /> : "Submit"}
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <Link underline="none" margin={"10px 0"}>
            Quên mật khẩu?
          </Link>
          <Link underline="none" margin={"10px 0"} href="/register">
            Đăng ký tài khoản
          </Link>
        </Box>
      </Paper>
    </Grid>
  );
}
