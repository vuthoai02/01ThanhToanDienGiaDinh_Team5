import { IconButton, Box, Typography } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import dayjs from "dayjs";

export const columns = [
  { id: "_id", label: "Mã hóa đơn", minWidth: 170 },
  { id: "customerCode", label: "Mã khách hàng", minWidth: 120 },
  {
    id: "signinDate",
    label: "Ngày phát hành",
    minWidth: 120,
    render: ({ row }) => dayjs(row?.signinDate).format("DD/MM/YYYY"),
  },
  {
    id: "isPayment",
    label: "Trạng thái thanh toán",
    minWidth: 200,
    render: ({ row }) => {
      return row?.isPayment ? (
        <Typography color="green">Đã thanh toán</Typography>
      ) : (
        <Typography color="red">Chưa thanh toán</Typography>
      );
    },
  },
  {
    id: "actions",
    label: "Thao tác",
    minWidth: 100,
    align: "center",
    render: ({ functional, row }) => {
      return (
        <Box onClick={() => functional(row)}>
          <IconButton>
            <Visibility color="primary" titleAccess="Thông tin chi tiết" />
          </IconButton>
        </Box>
      );
    },
  },
];
