import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "../store/actions/data";
import { Link } from 'react-router-dom';
import './AllProperty.css';

const AllProperty = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [propertiesPerPage] = useState(6);

    useEffect(() => {
        dispatch(fetchProperties());
    }, [dispatch]);

    const properties = useSelector((state) => state.property.properties);

    // Logic phân trang
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (!properties) {
        return <div>Loading...</div>;
    }

    const Changetitle = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const formatAddress = (address) => {
        const parts = address.split(", ");
        if (parts.length >= 2) {
            return parts.slice(-2).join(", ");
        } else {
            return address;
        }
    };

    return (
        <div>
            <h3>Tất cả bất động sản</h3>
            <div className="row">
                {currentProperties.map((listing, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                            <img className="card-img-top" src={listing.image_link} alt="" />
                            <div className="card-body">
                                <Link to={`/listing/${listing.id}`} className="card-title">
                                    <h5>{Changetitle(listing.title.toLowerCase())}</h5>
                                </Link>
                                <p className="card-text">{formatAddress(listing.address)}</p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted d-block">
                                    Mức giá: {listing.price == 0 ? 'Thỏa thuận' : (listing.kind === 'Mua Bán' ? `${listing.price} tỷ` : `${listing.price} triệu/tháng`)}
                                </small>
                                <small className="text-muted d-block">Diện tích: {listing.area} m2</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Nút phân trang */}
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage - 1)}>&lt;&lt;</button>
                </li>
                {Array.from({ length: Math.ceil(properties.length / propertiesPerPage) }, (_, index) => {
                    const pageNumber = index + 1;
                    const isFirstPage = pageNumber === 1;
                    const isLastPage = pageNumber === Math.ceil(properties.length / propertiesPerPage);
                    const isCurrentPage = currentPage === pageNumber;
                    const isNearCurrentPage = Math.abs(pageNumber - currentPage) <= 1;

                    if (isFirstPage || isLastPage || isCurrentPage || isNearCurrentPage) {
                        return (
                            <li key={index} className={`page-item ${isCurrentPage ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => paginate(pageNumber)}>{pageNumber}</button>
                            </li>
                        );
                    } else if (Math.abs(pageNumber - currentPage) === 3 && !isNearCurrentPage) {
                        return (
                            <li key={index} className="page-item disabled">
                                <span className="page-link">...</span>
                            </li>
                        );
                    }
                    return null;
                })}
                <li className={`page-item ${currentPage === Math.ceil(properties.length / propertiesPerPage) ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(currentPage + 1)}>&gt;&gt;</button>
                </li>
            </ul>
        </div>
    );
};

export default AllProperty;
