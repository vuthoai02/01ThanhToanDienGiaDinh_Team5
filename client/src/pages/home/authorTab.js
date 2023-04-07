import {Assignment, Person, RequestQuote, Email, Calculate} from '@mui/icons-material';

import QuanLyKH from "../admin/QuanLyKhachHang";
import QuanLyNguoiDung from "../admin/QuanLyNguoiDung";
import QuanLyHoaDon from '../admin/QuanLyHoaDon';


export const userTabList = [
    {label: 'Hóa đơn tiền điện', value: 'hd', page: <QuanLyKH />, icon: <RequestQuote />},
    {label: 'Tính tiền điện', value: 'cal',page: <QuanLyKH />, icon: <Calculate />},
    {label: 'Thông tin khách hàng', value: 'info',page: <QuanLyKH />, icon: <Person />}
];
export const adminTabList = [
    {label: 'Quản lý khách hàng', value: 'qlkh', page: <QuanLyKH />, icon: <Assignment />},
    {label: 'Quản lý người dùng', value: 'qlu', page: <QuanLyNguoiDung/>, icon: <Person />},
    {label: 'Quản lý hóa đơn', value: 'qlhd', page: <QuanLyHoaDon />, icon: <RequestQuote />},
    {label: 'Quản lý thông báo', value: 'qltb', page: <QuanLyKH />, icon: <Email /> }
];