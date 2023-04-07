import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from '@mui/icons-material';

export default function CustomField(props) {
  const { name, label, width, value, type, required, handleChange,isForm } = props;
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
        <InputLabel shrink htmlFor="password" required={required} sx={{marginLeft: '-12px'}}>{label}</InputLabel>
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          value={value}
          name={name}
          onChange={handleChange}
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
        variant={isForm?"outlined":"standard"}
        value={value}
        onChange={handleChange}
        fullWidth
      />
    </Grid>
  );
}

