import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  TextField,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function CustomField(props) {
  const {
    name,
    label,
    width,
    value,
    type,
    required,
    handleChange,
    isForm,
    isEmpty,
  } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (type === "date") {
    return (
      <Grid xs={width} sx={{ margin: "10px 2px" }}>
        <TextField
          name={name}
          label={label}
          InputLabelProps={{ shrink: true, required: true }}
          type="date"
          variant="outlined"
          value={value}
          onChange={handleChange}
          fullWidth
          error={isEmpty === name ? true : false}
          helperText={isEmpty === name && "Không được để trống!"}
        />
      </Grid>
    );
  }
  if (type === "password") {
    return (
      <FormControl
        sx={{
          m: 1,
          padding: 0,
          margin: "10px 0",
        }}
        variant="outlined"
      >
        <InputLabel
          shrink
          htmlFor="password"
          required={required}
          sx={{ marginLeft: "-12px" }}
        >
          {label}
        </InputLabel>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          value={value}
          name={name}
          onChange={handleChange}
          error={isEmpty === name ? true : false}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {isEmpty === name && (
          <FormHelperText style={{ color: "red" }}>
            Khồng được để trống!
          </FormHelperText>
        )}
      </FormControl>
    );
  }
  return (
    <Grid xs={width} sx={{ margin: "10px 2px" }}>
      <TextField
        name={name}
        label={label}
        InputLabelProps={{ shrink: true, required }}
        type={type}
        variant={isForm ? "outlined" : "standard"}
        value={value}
        onChange={handleChange}
        fullWidth
        error={isEmpty === name ? true : false}
        helperText={isEmpty === name && "Không được để trống!"}
      />
    </Grid>
  );
}
