import React, { useEffect } from "react";
import { Paper, Box, Grid, Typography, Button } from "@mui/material";
import { SumPayment } from "../../components/Calculator";
import { useDispatch, useSelector } from "react-redux";
import { userState$ } from "../../redux/selector";
import * as userActions from "../../redux/actions/userActions";
import { Bolt, MonetizationOn, Print } from "@mui/icons-material";
import ReactToPrint from "react-to-print";
import { useNavigate } from "react-router-dom";

export default function BillDetail(props) {
  const { detail, infoCus } = useSelector(userState$);
  const dispatch = useDispatch();
  const componentRef = React.useRef();
  const navigate = useNavigate();
  const billForm = [
    { label: "Họ tên:", value: infoCus?.customerName },
    { label: "Mã khách hàng:", value: infoCus?.customerCode },
    { label: "Mã hóa đơn:", value: detail?._id },
    { label: "Số điện thoại:", value: infoCus?.phoneNumber },
    { label: "Địa chỉ:", value: infoCus?.address },
    { label: "Số công tơ:", value: infoCus?.meterSeries },
    { label: "Mã số thuế:", value: infoCus?.taxCode },
    { label: "Số hộ sử dụng điện:", value: 1 },
  ];

  const handlePayment = () => {
    dispatch(userActions.pay.payRequest(detail));
    navigate('/');
  };

  useEffect(() => {
    if (!infoCus)
      dispatch(
        userActions.fetchCustomer.fetchCustomerRequest(detail?.customerCode)
      );
  }, []);

  // console.log(detail, infoCus);
  return (
    <Grid item xs={12}>
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
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Paper
          elevation={6}
          sx={{ width: "30%", padding: "10px", marginTop: "2%" }}
        >
          <Box ref={componentRef}>
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: "22px",
                textAlign: "center",
              }}
            >
              Hóa đơn tiền điện
            </Typography>
            {billForm.map((elm, ind) => (
              <Box
                key={elm.name}
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>{elm.label}</Typography>
                <Typography fontWeight={"bold"}>{elm.value} </Typography>
              </Box>
            ))}
            {console.log(detail)}
            <SumPayment
              klW={detail?.actualElectric}
              house={infoCus?.holdHouse}
              isTotal={true}
            />
          </Box>
          <Box sx={{ marginTop: "10px" }}>
            <Button
              startIcon={<MonetizationOn />}
              variant="contained"
              sx={{ marginRight: "10px" }}
              color="success"
              onClick={handlePayment}
              disabled={detail?.isPayment}
            >
              Thanh toán
            </Button>
            <ReactToPrint
              trigger={() => (
                <Button startIcon={<Print />} variant="contained">
                  In hóa đơn
                </Button>
              )}
              content={() => componentRef.current}
            />
          </Box>
        </Paper>
        <Typography style={{ fontSize: "12px", width: "60%", marginTop: "3%" }}>
          Khu vực hỗ trợ: <br />- Miền Bắc: Hà Nội, Bắc Giang, Bắc Kạn, Cao
          Bằng, Điện Biên, Hà Giang, Hà Nam, Hà Tĩnh, Hải Dương, Hải Phòng, Hòa
          Bình, Hưng Yên, Lai Châu, Lạng Sơn, Lào Cai, Nam Định, Nghệ An, Phú
          Thọ, Quảng Ninh (Ba Chẽ, Bình Liêu, Cẩm Phả, TX Đông Triều, TP Hạ
          Long, Móng Cái, TX Quảng Yên, Tiên Yên, TP Uông Bí, Vân Đồn), Sơn La,
          Thanh Hóa, Thái Bình, Thái Nguyên, Tuyên Quang, Vĩnh Phúc, Yên Bái,
          Ninh Bình.
          <br />- Miền Trung: Bình Định, Đà Nẵng, Đắk Lắk, Đắk Nông, Gia Lai,
          Khánh Hòa, Kon Tum, Phú Yên, Quảng Bình, Quảng Nam, Quảng Ngãi, Quảng
          Trị, Thừa Thiên Huế. <br />- Miền Nam: Tp.Hồ Chí Minh, An Giang, Bà
          Rịa Vũng Tàu, Bạc Liêu, Bến Tre, Bình Dương, Bình Phước, Bình Thuận,
          Cà Mau, Cần Thơ, Đồng Nai, Đồng Tháp, Hậu Giang, Kiên Giang, Lâm Đồng,
          Long An, Ninh Thuận, Sóc Trăng, Tây Ninh, Tiền Giang, Trà Vinh, Vĩnh
          Long.
        </Typography>
      </Grid>
    </Grid>
  );
}
