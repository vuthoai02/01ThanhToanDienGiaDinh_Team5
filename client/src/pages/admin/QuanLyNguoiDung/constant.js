import { IconButton, Box, Switch } from "@mui/material";
import { Delete } from "@mui/icons-material";

export const columns = [
  { id: "userName", label: "Tên người dùng", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 200 },
  {
    id: "customerCode",
    label: "Mã khách hàng",
    minWidth: 120,
  },
  {
    id: "role",
    label: "Đặc quyền",
    minWidth: 120,
    render: ({row}) => {
      return row?.role ? "Quản trị viên" : "Người dùng";
    },
  },
  {
    id: "actions",
    label: "Thao tác",
    minWidth: 100,
    align: "center",
    render: ({row, handleDelete, checked, functional}) => (
      <Box>
        <Switch
          checked={checked}
          onChange={() => functional(row)}
          inputProps={{ "aria-label": "controlled" }}
          title="Thay đổi đặc quyền"
        />
        <IconButton onClick={() => handleDelete(row)}>
          <Delete color="error" titleAccess="Xóa khách hàng" />
        </IconButton>
      </Box>
    ),
  },
];
