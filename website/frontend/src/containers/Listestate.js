import React from 'react';
import { useLocation } from 'react-router-dom';
import MapList from '../components/MapList';
import './listestate.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Listestate = () => {
    const location = useLocation();
    const { a } = location.state;

    if (!a || a.length === 0) {
        return <div className="container"><h1>Không có bất động sản nào được tìm thấy</h1></div>;
    }

    const geocode = a.map(item => ({
        lat: parseFloat(item.geocode.split(',')[0].slice(1)),
        lng: parseFloat(item.geocode.split(',')[1].slice(0, -1)),
        title: item.title,
        address: item.address,
        price: item.price,
        area: item.area,
        id: item.id,
        image_link: item.image_link,
        kind: item.kind,
        width: item.width,
    }));

    console.log(geocode);

    return (
        <div className="container">
            <Helmet>
                <title>List estate</title>
            </Helmet>
            <div className='List-card'>
                {a.map((listing, index) => (
                    <div key={index} className="card mb-4">
                        <img className="card-img-top" src={listing.image_link} alt="" />
                        <div className="card-body">
                            <Link to={`/listing/${listing.id}`}>
                                {listing.title}
                            </Link>
                            <p className="card-text">{listing.address}</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted d-block" style={{ marginBottom: '5px' }}>
                                Mức giá: {listing.price == 0 ? 'Thỏa thuận' : (listing.kind === 'Mua Bán' ? `${listing.price} tỷ` : `${listing.price} triệu/tháng`)}
                            </small>
                            <small className="text-muted d-block">Diện tích: {listing.area} m2</small>
                        </div>
                    </div>
                ))}
            </div>
            <div className='map'>
                <MapList geocode={geocode} />
            </div>
        </div>
    );
};

export default Listestate;
