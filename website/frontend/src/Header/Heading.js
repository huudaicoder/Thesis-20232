import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./heading.css";

const Heading = () => {
    const [showMuaBanOptions, setShowMuaBanOptions] = useState(false);
    const [showChoThueOptions, setShowChoThueOptions] = useState(false);
    const history = useHistory();

    const handleMouseEnterMuaBan = () => {
        setShowMuaBanOptions(true);
        setShowChoThueOptions(false);
    };

    const handleMouseEnterChoThue = () => {
        setShowMuaBanOptions(false);
        setShowChoThueOptions(true);
    };

    const handleMouseLeave = () => {
        setShowMuaBanOptions(false);
        setShowChoThueOptions(false);
    };

    const fetchProperties = async (kind, type_estate) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/pools/properties-with-conditions/`, {
                params: {
                    kind,
                    type: type_estate
                }
            });
            const data = response.data;
            history.push({
                pathname: '/list-estate',
                state: { a: data }
            });
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    const handleOptionClick = (kind, type_estate) => {
        fetchProperties(kind, type_estate);
    };

    return (
        <>
            <div className='heading'>
                <h1 className='text-center font-weight-bolder brand-heading'>
                    <Link exact to='/'>
                        Welcome To Real Home
                    </Link>
                </h1>
                <div className="header-categories">
                    <div className="header-category">
                        <Link to="/">Trang Chủ</Link>
                    </div>
                    <div className="header-category" onMouseEnter={handleMouseEnterMuaBan} onMouseLeave={handleMouseLeave}>
                        <span>Mua Bán Nhà Đất</span>
                        {showMuaBanOptions && (
                            <ul className="custom-scroll-list">
                                <li onClick={() => handleOptionClick('Mua Bán', 'Căn Hộ Chung Cư')}>
                                    Căn Hộ Chung Cư
                                </li>
                                <li onClick={() => handleOptionClick('Mua Bán', 'Nhà Mặt Phố')}>
                                    Nhà Mặt Phố
                                </li>
                                <li onClick={() => handleOptionClick('Mua Bán', 'Nhà Đất Thổ Cư')}>
                                    Nhà Đất Thổ Cư
                                </li>
                                <li onClick={() => handleOptionClick('Mua Bán', 'Nhà Biệt Thự, Liền Kề')}>
                                    Nhà Biệt Thự, Liền Kề
                                </li>
                                <li onClick={() => handleOptionClick('Mua Bán', 'Nhà Trọ, Phòng Trọ')}>
                                    Nhà Trọ, Phòng Trọ
                                </li>
                                <li onClick={() => handleOptionClick('Mua Bán', 'Nhà Xưởng, Mặt Bằng, Kho Bãi')}>
                                    Nhà Xưởng, Mặt Bằng, Kho Bãi
                                </li>
                                <li onClick={() => handleOptionClick('Mua Bán', 'Nhà Trong Ngõ')}>
                                    Nhà Trong Ngõ
                                </li>
                                <li onClick={() => handleOptionClick('Mua Bán', 'Đất Nông Nghiệp, Đất Vườn')}>
                                    Đất Nông Nghiệp, Đất Vườn
                                </li>
                                <li onClick={() => handleOptionClick('Mua Bán', 'Đất Nền Dự Án')}>
                                    Đất Nền Dự Án
                                </li>
                                <li onClick={() => handleOptionClick('Mua Bán', 'Đất Dịch Vụ, Đền Bù')}>
                                    Đất Dịch Vụ, Đền Bù
                                </li>
                                <li onClick={() => handleOptionClick('Mua Bán', 'Văn Phòng, TTTM, Cửa Hàng,Kiot')}>
                                    Văn Phòng, TTTM, Cửa Hàng,Kiot
                                </li>
                                <li onClick={() => handleOptionClick('Mua Bán', 'Nhà Hàng, Khách Sạn, Resort')}>
                                    Nhà Hàng, Khách Sạn, Resort
                                </li>
                                <li onClick={() => handleOptionClick('Mua Bán', 'Condotel')}>
                                    Condotel
                                </li>
                                <li onClick={() => handleOptionClick('Mua Bán', 'ShopHouse')}>
                                    ShopHouse
                                </li>
                                <li onClick={() => handleOptionClick('Mua Bán', 'OfficeTel')}>
                                    OfficeTel
                                </li>
                                
                            </ul>
                        )}
                    </div>
                    <div className="header-category" onMouseEnter={handleMouseEnterChoThue} onMouseLeave={handleMouseLeave}>
                        <span>Cho Thuê Nhà Đất</span>
                        {showChoThueOptions && (
                            <ul className="custom-scroll-list">
                                <li onClick={() => handleOptionClick('Cho Thuê', 'Căn Hộ Chung Cư')}>
                                    Căn Hộ Chung Cư
                                </li>
                                <li onClick={() => handleOptionClick('Cho Thuê', 'Nhà Mặt Phố')}>
                                    Nhà Mặt Phố
                                </li>
                                <li onClick={() => handleOptionClick('Cho Thuê', 'Nhà Đất Thổ Cư')}>
                                    Nhà Đất Thổ Cư
                                </li>
                                <li onClick={() => handleOptionClick('Cho Thuê', 'Nhà Biệt Thự, Liền Kề')}>
                                    Nhà Biệt Thự, Liền Kề
                                </li>
                                <li onClick={() => handleOptionClick('Cho Thuê', 'Nhà Trọ, Phòng Trọ')}>
                                    Nhà Trọ, Phòng Trọ
                                </li>
                                <li onClick={() => handleOptionClick('Cho Thuê', 'Nhà Xưởng, Mặt Bằng, Kho Bãi')}>
                                    Nhà Xưởng, Mặt Bằng, Kho Bãi
                                </li>
                                <li onClick={() => handleOptionClick('Cho Thuê', 'Nhà Trong Ngõ')}>
                                    Nhà Trong Ngõ
                                </li>
                                <li onClick={() => handleOptionClick('Cho Thuê', 'Đất Nông Nghiệp, Đất Vườn')}>
                                    Đất Nông Nghiệp, Đất Vườn
                                </li>
                                <li onClick={() => handleOptionClick('Cho Thuê', 'Đất Nền Dự Án')}>
                                    Đất Nền Dự Án
                                </li>
                                <li onClick={() => handleOptionClick('Cho Thuê', 'Đất Dịch Vụ, Đền Bù')}>
                                    Đất Dịch Vụ, Đền Bù
                                </li>
                                <li onClick={() => handleOptionClick('Cho Thuê', 'Văn Phòng, TTTM, Cửa Hàng,Kiot')}>
                                    Văn Phòng, TTTM, Cửa Hàng,Kiot
                                </li>
                                <li onClick={() => handleOptionClick('Cho Thuê', 'Nhà Hàng, Khách Sạn, Resort')}>
                                    Nhà Hàng, Khách Sạn, Resort
                                </li>
                                <li onClick={() => handleOptionClick('Cho Thuê', 'Condotel')}>
                                    Condotel
                                </li>
                                <li onClick={() => handleOptionClick('Cho Thuê', 'ShopHouse')}>
                                    ShopHouse
                                </li>
                                <li onClick={() => handleOptionClick('Cho Thuê', 'OfficeTel')}>
                                    OfficeTel
                                </li>
                                
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Heading;
