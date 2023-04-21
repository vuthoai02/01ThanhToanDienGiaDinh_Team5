import { Box, Grid, Typography } from "@mui/material";
import React from "react";

export function cal(klW, house) {
  let sodien = klW;
  let b1, b2, b3, b4, b5, b6;
  b1 = b2 = b3 = b4 = b5 = b6 = 0;
  let i = 1;
  do {
    if (sodien > 0) {
      if (i === 1) {
        b1 = sodien > 50 * house ? 50 * house * 1678 : sodien * 1678;
        sodien = sodien > 50 * house ? sodien - 50 * house : 0;
      } else if (i === 2) {
        b2 = sodien > 50 * house ? 50 * house * 1734 : sodien * 1734;
        sodien = sodien > 50 * house ? sodien - 50 * house : 0;
      } else if (i === 3) {
        b3 = sodien > 100 * house ? 100 * house * 2014 : sodien * 2014;
        sodien = sodien > 100 * house ? sodien - 100 * house : 0;
      } else if (i === 4) {
        b4 = sodien > 100 * house ? 100 * house * 2536 : sodien * 2536;
        sodien = sodien > 100 * house ? sodien - 100 * house : 0;
      } else if (i === 5) {
        b5 = sodien > 100 * house ? 100 * house * 2834 : sodien * 2834;
        sodien = sodien > 100 * house ? sodien - 100 * house : 0;
      } else {
        b6 = sodien * 2927;
        sodien = 0;
      }
      i++;
    } else break;
  } while (i <= 6);
  const notVat = b1 + b2 + b3 + b4 + b5 + b6;
  const vat = (notVat * 10) / 100;
  const total = notVat + vat;
  return { b1, b2, b3, b4, b5, b6, notVat, vat, total };
}

export function SumPayment(props) {
  const { klW, house, isTotal } = props;
  const [values, setValues] = React.useState(null);

  const payList = [
    {
      name: "b0",
      title: "==Các bậc giá điện========",
      value: "========THÀNH TIỀN (vnd)==",
    },
    { name: "b1", title: "Bậc 1 (1678vnd):", value: values?.b1 },
    { name: "b2", title: "Bậc 2 (1734vnd):", value: values?.b2 },
    { name: "b3", title: "Bậc 3 (2014vnd):", value: values?.b3 },
    { name: "b4", title: "Bậc 4 (2536vnd):", value: values?.b4 },
    { name: "b5", title: "Bậc 5 (2834vnd):", value: values?.b5 },
    { name: "b1", title: "Bậc 6 (2972vnd):", value: values?.b6 },
    { name: "notVat", title: "Tổng tiền chưa thuế:", value: values?.notVat },
    { name: "vat", title: "Thuế VAT (10%):", value: values?.vat },
  ];

  React.useEffect(() => {
    if (isTotal) {
      const data = cal(klW, house);
      setValues(data);
    } else {
      setValues(null);
    }
  }, [isTotal]);

  return (
    <Grid>
      {payList.map((elm) => (
        <Box
          key={elm.name}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography>{elm.title}</Typography>
          <Typography fontWeight={"bold"}>{elm.value} </Typography>
        </Box>
      ))}
      <Typography
        style={{
          marginTop: "10px",
          fontWeight: "bold",
        }}
      >
        Tổng cộng tiền thanh toán: {values?.total} vnd
      </Typography>
    </Grid>
  );
}
