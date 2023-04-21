import { IconButton, Box, Typography } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import dayjs from "dayjs";
import { cal } from "../../../components/Calculator";

export const form = (values) => [
  {
    name: "customerCode",
    label: "Mã khách hàng",
    width: 11,
    type: "text",
    value: values?.customerCode,
    required: true,
  },
  {
    name: "newIndicator",
    label: "Số điện mới",
    width: 6,
    type: "number",
    value: values?.newIndicator,
    required: true,
  },
  {
    name: "oldIndicator",
    label: "Số điện cũ",
    width: 5,
    type: "number",
    value: values?.oldIndicator,
    required: true,
  },
  {
    name: "hs",
    label: "Hệ số",
    width: 6,
    type: "number",
    value: values?.hs,
    required: false,
  },
  {
    name: "dntructiep",
    label: "Điện năng trực tiếp",
    width: 5,
    type: "number",
    value: values?.dntructiep,
    required: false,
  },
  {
    name: "actualElectric",
    label: "Điện năng thực tế",
    width: 6,
    type: "number",
    value: values?.actualElectric,
    required: true,
  },
  {
    name: "signinDate",
    label: "Ngày phát hành",
    width: 5,
    type: "date",
    value: values?.signinDate,
    required: false,
  },
];

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
    id: "actualElectric",
    label: "Thành tiền",
    minWidth: 200,
    render: ({ row }) => {
      const data = cal(row?.actualElectric,1);
      return `${data.total} VND`;
    },
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
    render: ({ handleDelete, row, functional }) => {
      return (
        <Box>
          <IconButton onClick={() => functional(row)}>
            <Visibility color="primary" titleAccess="Thông tin chi tiết" />
          </IconButton>
          <IconButton onClick={() => handleDelete(row)}>
            <Delete color="error" titleAccess="Xóa hóa đơn" />
          </IconButton>
        </Box>
      );
    },
  },
];
