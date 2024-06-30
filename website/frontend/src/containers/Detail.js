import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../store/actions/data';
import './detail.css';
import Map from '../components/Map'; // Đường dẫn tới component Map

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, properties, error } = useSelector((state) => state.property);

    useEffect(() => {
        dispatch(fetchProperties());
    }, [dispatch]);

    const property = properties.find(p => p.id === parseInt(id));
    console.log(property)
    if (!property) {
        return <div className="container text-center mt-5"></div>;
    }

    // Mock geocode data (lat, lng, title, description)
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
    console.log(property.width)
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-lg-8">
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
                                Mức giá: {property.price === 0.00 ? 'Thỏa thuận' : (
                                    property.kind === 'Mua Bán' ? `${property.price} tỷ` : `${property.price} triệu/tháng`
                                )}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div style={{ marginTop: '1.5rem' }}></div>
                        <h2 className='text-center custom-heading'>Thông tin mô tả</h2>
                        <p>{property.description}</p>
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
                </div>
            </div>
        </div>
    );
};

export default Detail;
