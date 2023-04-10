import { IconButton, Box } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";

export const columns = [
  { id: "customerName", label: "Họ và tên", minWidth: 170 },
  { id: "customerCode", label: "Mã khách hàng", minWidth: 120 },
  {
    id: "phoneNumber",
    label: "Số điện thoại",
    minWidth: 120,
  },
  {
    id: "address",
    label: "Địa chỉ",
    minWidth: 200,
  },
  {
    id: "actions",
    label: "Thao tác",
    minWidth: 100,
    align: "center",
    render: ({handleDelete, row, functional}) => {
      return (
        <Box>
          <IconButton onClick={() => functional(row)}>
            <Visibility color="primary" titleAccess="Thông tin chi tiết" />
          </IconButton>
          <IconButton onClick={() => handleDelete(row)}>
            <Delete color="error" titleAccess="Xóa khách hàng" />
          </IconButton>
        </Box>
      );
    },
  },
];

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
    name: "customerName",
    label: "Tên khách hàng",
    width: 6,
    type: "text",
    value: values?.customerName,
    required: true,
  },
  {
    name: "phoneNumber",
    label: "Số điện thoại",
    width: 5,
    type: "text",
    value: values?.phoneNumber,
    required: true,
  },
  {
    name: "address",
    label: "Địa chỉ",
    width: 11,
    type: "text",
    value: values?.address,
    required: true,
  },
  {
    name: "meterSeries",
    label: "Số công tơ",
    width: 9,
    type: "text",
    value: values?.meterSeries,
    required: true,
  },
  {
    name: "houseHold",
    label: "Số hộ",
    width: 2,
    type: "number",
    value: values?.houseHold,
    required: false,
  },
  {
    name: "paymentCode",
    label: "Mã thanh toán",
    width: 6,
    type: "text",
    value: values?.paymentCode,
    required: true,
  },
  {
    name: "businessCode",
    label: "Mã ngành nghề",
    width: 5,
    type: "text",
    value: values?.businessCode,
    required: false,
  },
  {
    name: "stationCode",
    label: "Mã trạm",
    width: 7,
    type: "text",
    value: values?.stationCode,
    required: true,
  },
  {
    name: "teamCode",
    label: "Mã tổ",
    width: 2,
    type: "number",
    value: values?.teamCode,
    required: true,
  },
  {
    name: "voltage",
    label: "Cấp điện áp",
    width: 2,
    type: "number",
    value: values?.voltage,
    required: false,
  },
  {
    name: "businessChargeCode",
    label: "Mã giá KT",
    width: 9,
    type: "text",
    value: values?.businessChargeCode,
    required: false,
  },
  {
    name: "indicatorRecordDate",
    label: "Ngày tháng ghi chỉ số",
    width: 2,
    type: "number",
    value: values?.indicatorRecordDate,
    require: false,
  },
  {
    name: "taxCode",
    label: "Mã số thuế",
    width: 11,
    type: "text",
    value: values?.taxCode,
    required: true,
  },
];
