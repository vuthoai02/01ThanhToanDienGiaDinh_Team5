import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import CustomField from "../Field/TextField";

export default function DialogField(props) {
  const { open, handleClose, formList, handleChange, handleSubmit, title } = props;
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexWrap: "wrap" }}>
        {formList.map((elm) => (
          <CustomField
            key={elm.name}
            name={elm.name}
            label={elm.label}
            type={elm.type}
            width={elm.width}
            value={elm.value}
            required={elm.required}
            isForm={true}
            handleChange={handleChange}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>Hủy</Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}
