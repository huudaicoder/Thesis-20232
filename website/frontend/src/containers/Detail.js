import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import './detail.css';
import Map from '../components/Map';
import CountBarChart from '../components/CountBarChart';
import AvgBarChart from '../components/AvgBarChart';

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [property, setProperty] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/pools/property/${id}/`);
                setProperty(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) {
        return <div className="container text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="container text-center mt-5">Error: {error}</div>;
    }

    if (!property) {
        return <div className="container text-center mt-5">Property not found</div>;
    }

    const geocode = [{
        lat: parseFloat(property.geocode.split(',')[0].slice(1)),
        lng: parseFloat(property.geocode.split(',')[1].slice(0, -1)),
        title: property.title,
        address: property.address,
        area: property.area,
        price: property.price,
        kind: property.kind,
        image_link: property.image_link
    }];

    const replaceNewLinesWithBr = (text) => {
        return text.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>");
    };

    return (
        <div className="container-fluid">
            <Helmet>
                <title>{property.title}</title>
            </Helmet>
            <div className="row justify-content-center detail_contain">
                <div className="col-lg-7"  >
                    {/* Các phần tử khác của trang chi tiết */}
                    <div className="detail-image text-center mt-4">
                        <img className="card-img-top" src={property.image_link} alt={property.title} />
                    </div>
                    <div className="detail-property text-center mt-4">
                        <h1>{property.title}</h1>
                    </div>
                    <div className="detail-overall mt-4">
                        <div style={{ flex: '3', textAlign: 'left', paddingLeft: '0px' }}>
                            <span className="text-muted">Địa chỉ: {property.address}</span>
                            <span className="text-muted">Loại bất động sản: {property.type}</span>
                        </div>
                        <div style={{ flex: '1.2', textAlign: 'left' }}>
                            <span className="text-muted">Diện tích: {property.area} m2</span>
                            <span className="text-muted">
                                Mức giá: {property.price == 0.00 ? 'Thỏa thuận' : (
                                    property.kind === 'Mua Bán' ? `${property.price} tỷ` : `${property.price} triệu/tháng`
                                )}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div style={{ marginTop: '1.5rem' }}></div>
                        <h2 className='text-center custom-heading'>Thông tin mô tả</h2>
                        <p dangerouslySetInnerHTML={{ __html: replaceNewLinesWithBr(property.description) }} />
                    </div>
                    <div className="detail-char mt-4">
                        <h2 className='text-center custom-heading'>Đặc điểm bất động sản</h2>
                        <div className="detail-full-des">
                            <div className="detail-field">
                                <span className="label">Số tầng:</span>
                                {property.floor !== 0 && property.floor != null && (
                                    <span className="value">{property.floor} tầng</span>
                                )}
                            </div>
                            <div className="detail-field">
                                <span className="label">Hướng:</span>
                                {property.direction != 'null' && (
                                    <span className="value">{property.direction}</span>
                                )}
                            </div>
                            <div className="detail-field">
                                <span className="label">Mặt tiền:</span>
                                {property.width != 0.00 && (
                                    <span className="value">{property.width} m</span>
                                )}
                            </div>
                            <div className="detail-field">
                                <span className="label">Pháp lý:</span>
                                {property.law != 'null' && (
                                    <span className="value">{property.law}</span>
                                )}
                            </div>
                            <div className="detail-field">
                                <span className="label">Phòng ngủ:</span>
                                {property.bedroom !== 0 && (
                                    <span className="value">{property.bedroom} phòng</span>
                                )}
                            </div>
                            <div className="detail-field">
                                <span className="label">Phòng tắm:</span>
                                {property.toilet !== 0 && (
                                    <span className="value">{property.toilet} phòng</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div style={{ marginTop: '1.5rem' }}></div>
                    <Map geocode={geocode} />
                    <div style={{ marginTop: '2rem' }}></div>
                    {/* Truyền các tham số từ chi tiết bất động sản vào BarChart */}
                    <CountBarChart
                        provinceCity={property.province_city}
                        kind={property.kind}
                        type={property.type}
                    />  
                    <div style={{ marginTop: '2rem' }}></div>                  
                    <AvgBarChart
                        provinceCity={property.province_city}
                        kind={property.kind}
                        type={property.type}
                    />
                </div>
            </div>
        </div>
    );
};

export default Detail;
