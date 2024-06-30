import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const ListingForm = (props) => {
    const history = useHistory();
    const initialFormData = {
        sale_type: "Mua Bán",
        province: "Hà Nội",
        district: "Tất cả", // Thêm "Tất cả" vào district mặc định
        home_type: "Tất cả",
        price: "Tất cả",
        area: "Tất cả",
        min_area: undefined,
        max_area: undefined,
        min_price: undefined,
        max_price: undefined,
    };

    const [formData, setFormData] = useState(initialFormData);
    const { sale_type, price, province, home_type, area, district, min_area, max_area, min_price, max_price } = formData;
    const open_house = "true";

    const [loading, setLoading] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState(["Tất cả"]); // Khởi tạo với "Tất cả" đầu tiên
    const [priceOptions, setPriceOptions] = useState({
        "Mua Bán": [
            "Tất cả",
            "Nhỏ hơn 0.1 tỷ",
            "0.1 - 0.3 tỷ",
            "0.3 - 0.5 tỷ",
            "0.5 - 0.7 tỷ",
            "0.7 - 1 tỷ",
            "1 - 2 tỷ",
            "2 - 3 tỷ",
            "3 - 4 tỷ",
            "4 - 6 tỷ",
            "6 - 10 tỷ",
            "10 - 20 tỷ",
            "Trên 20 tỷ",
        ],
        "Cho Thuê": [
            "Tất cả",
            "Nhỏ hơn 1 triệu",
            "1 - 2 triệu",
            "2 - 4 triệu",
            "4 - 6 triệu",
            "6 - 10 triệu",
            "10 - 20 triệu",
            "20 - 40 triệu",
            "40 - 60 triệu",
            "60 - 100 triệu",
            "Trên 100 triệu",
        ],
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "sale_type") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
                price: priceOptions[value][0], // Chọn giá đầu tiên trong danh sách mới
            }));
        } else if (name === "area") {
            const [minArea, maxArea] = calculateMinMaxArea(value);
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
                min_area: minArea,
                max_area: maxArea,
            }));
        } else if (name === "price") {
            const [minPrice, maxPrice] = calculateMinMaxPrice(value);
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
                min_price: minPrice,
                max_price: maxPrice,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const calculateMinMaxArea = (selectedArea) => {
        switch (selectedArea) {
            case "Tất cả":
                return [undefined, undefined];
            case "Nhỏ hơn 20 m2":
                return [undefined, 20];
            case "20-30 m2":
                return [20, 30];
            case "30-50 m2":
                return [30, 50];
            case "50-70 m2":
                return [50, 70];
            case "70-100 m2":
                return [70, 100];
            case "100-150 m2":
                return [100, 150];
            case "150-200m2":
                return [150, 200];
            case "200-250m2":
                return [200, 250];
            case "250-300m2":
                return [250, 300];
            case "300-350m2":
                return [300, 350];
            case "350-400m2":
                return [350, 400];
            case "400-600m2":
                return [400, 600];
            case "600-800m2":
                return [600, 800];
            case "800-10000m2":
                return [800, 10000];
            case "Trên 1000m2":
                return [1000, undefined];
            default:
                return [undefined, undefined];                
        }
    };

    const calculateMinMaxPrice = (selectedPrice) => {
        switch (selectedPrice) {
            case "Tất cả":
                return [undefined, undefined];
            case "Nhỏ hơn 1 triệu":
                return [undefined, 1];
            case "1 - 2 triệu":
                return [1, 2];
            case "2 - 4 triệu":
                return [2, 4];
            case "4 - 6 triệu":
                return [4, 6];
            case "6 - 10 triệu":
                return [6, 10];
            case "10 - 20 triệu":
                return [10, 20];
            case "20 - 40 triệu":
                return [20, 40];
            case "40 - 60 triệu":
                return [40, 60];
            case "60 - 100 triệu":
                return [60, 100];
            case "Trên 100 triệu":
                return [100, undefined];
            case "Nhỏ hơn 0.1 tỷ":
                return [undefined, 0.1];
            case "0.1 - 0.3 tỷ":
                return [0.1, 0.3];
            case "0.3 - 0.5 tỷ":
                return [0.3, 0.5];
            case "0.5 - 0.7 tỷ":
                return [0.5, 0.7];
            case "0.7 - 1 tỷ":
                return [0.7, 1];
            case "1 - 2 tỷ":
                return [1, 2];
            case "2 - 3 tỷ":
                return [2, 3];
            case "3 - 4 tỷ":
                return [3, 4];
            case "4 - 6 tỷ":
                return [4, 6];
            case "6 - 10 tỷ":
                return [6, 10]; 
            case "10 - 20 tỷ":
                return [10, 20];          
            case "Trên 20 tỷ":
                return [20, undefined];
            default:
                return [undefined, undefined];
        }
    };

    const fetchProvinces = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/pools/provinces/`);
            setProvinces(response.data.provinces);
        } catch (error) {
            console.error("Error fetching provinces:", error);
        }
    };

    const fetchDistricts = async (selectedProvince) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/pools/address/${selectedProvince}/`);
            setDistricts(["Tất cả", ...response.data.districts]); // Thêm "Tất cả" vào đầu danh sách districts
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const urlParams = {
                district: district === "Tất cả" ? "" : district, // Nếu chọn "Tất cả", truyền rỗng
                min_price: min_price === null ? undefined : min_price,
                max_price: max_price === null ? undefined : max_price,
                province_city: province,
                kind: sale_type,
                max_area: max_area === null ? undefined : max_area,
                min_area: min_area === null ? undefined : min_area,
                type: home_type === "Tất cả" ? undefined : home_type,
            };

            const queryString = Object.keys(urlParams)
                .map((key) => (urlParams[key] !== undefined ? `${key}=${encodeURIComponent(urlParams[key])}` : ""))
                .filter((item) => item !== "")
                .join("&");

            const fullUrl = `${process.env.REACT_APP_API_URL}/pools/properties-with-conditions/?${queryString}`;

            const response = await axios.get(fullUrl);
            props.setListings(response.data);
            const a = response.data;
            console.log(a);
            history.push({ pathname: '/list-estate', state: { a } });

        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (province) {
            fetchDistricts(province);
        }
    }, [province]);

    return (
        <div className="container" style={{marginTop:70}}>
            <form className="px-1" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <div className="listingform__section">
                            <label className="listingform__label" htmlFor="sale_type">
                                Mua - Thuê
                            </label>
                            <select
                                className="form-control"
                                name="sale_type"
                                value={sale_type}
                                onChange={onChange}
                            >
                                <option>Mua Bán</option>
                                <option>Cho Thuê</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="listingform__label" htmlFor="area">
                            Diện Tích
                        </label>
                        <select
                            className="form-control"
                            name="area"
                            value={area}
                            onChange={onChange}
                        >
                            <option>Tất cả</option>
                            <option>Nhỏ hơn 20 m2</option>
                            <option>20-30 m2</option>
                            <option>30-50 m2</option>
                            <option>50-70 m2</option>
                            <option>70-100 m2</option>
                            <option>100-150 m2</option>
                            <option>150-200m2</option>
                            <option>200-250m2</option>
                            <option>250-300m2</option>
                            <option>300-350m2</option>
                            <option>350-400m2</option>
                            <option>400-600m2</option>
                            <option>600-800m2</option>
                            <option>800-10000m2</option>
                            <option>Trên 1000m2</option>
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="listingform__label" htmlFor="price">
                            Giá
                        </label>
                        <select
                            className="form-control"
                            name="price"
                            value={price}
                            onChange={onChange}
                        >
                            {priceOptions[sale_type].map((option, index) => (
                                <option key={index}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-3  text-center">
                        {loading ? (
                            <div className="form-group d-flex justify-content-center px-4 mt-4">
                                <Loader
                                    type="Oval"
                                    color="#424242"
                                    height={48}
                                    width={48}
                                />
                            </div>
                        ) : (
                            <button className="btn btn-primary py-2 px-3 " style={{marginTop:30}} type="submit">
                                Search
                            </button>
                        )}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label className="listingform__label" htmlFor="province">
                            Tỉnh/Thành
                        </label>
                        <select
                            className="form-control"
                            name="province"
                            value={province}
                            onChange={onChange}
                        >
                            {provinces.map((prov, index) => (
                                <option key={index}>{prov}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="listingform__label" htmlFor="district">
                            Quận/Huyện
                        </label>
                        <select
                            className="form-control"
                            name="district"
                            value={district}
                            onChange={onChange}
                        >
                            {districts.map((dist, index) => (
                                <option key={index}>{dist}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        <label className="listingform__label" htmlFor="home_type">
                            Loại Bất Động Sản
                        </label>
                        <select
                            className="form-control"
                            name="home_type"
                            value={home_type}
                            onChange={onChange}
                        >
                            <option>Tất cả</option>
                            <option>Căn Hộ Chung Cư</option>
                            <option>Nhà Mặt Phố</option>
                            <option>Nhà Đất Thổ Cư</option>
                            <option>Nhà Biệt Thự, Liền Kề</option>
                            <option>Nhà Trọ, Phòng Trọ</option>
                            <option>Nhà Xưởng, Mặt Bằng, Kho Bãi</option>
                            <option>Đất Trang Trại</option>
                            <option>Nhà Trong Ngõ</option>
                            <option>Đất Nông Nghiệp, Đất Vườn</option>
                            <option>Đất Nền Dự Án</option>
                            <option>Đất Dịch Vụ, Đền Bù</option>
                            <option>Văn Phòng, TTTM, Cửa Hàng,Kiot</option>
                            <option>Nhà Hàng, Khách Sạn, Resort</option>
                            <option>Condotel</option>
                            <option>ShopHouse</option>
                            <option>OfficeTel</option>
                        </select>
                    </div>
                </div>
                
            </form>
            <hr />
        </div>
    );
};

ListingForm.propTypes = {
    setListings: PropTypes.func.isRequired,
};

export default ListingForm;
