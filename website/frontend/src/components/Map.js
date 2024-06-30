import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';

// Custom icon
const customIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    iconSize: [40, 40], // Increased size of the icon
    iconAnchor: [20, 40], // Adjusted anchor point of the icon
    popupAnchor: [0, -40] // Adjusted anchor point of the popup relative to the icon
});
  

const Map = ({ geocode }) => {
    // Default position (if no geocode data)
    const defaultCenter = { lat: 51.505, lng: -0.09 };

    return (
        <MapContainer center={geocode.length > 0 ? [geocode[0].lat, geocode[0].lng] : defaultCenter} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geocode.map((marker, index) => (
                <Marker 
                    key={index} 
                    position={[marker.lat, marker.lng]} 
                    icon={customIcon} // Use custom icon here
                >
                    <Popup>
                        <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '300px' }}>
                            <div style={{ flex: 1 }}>
                                <img src={marker.image_link} alt={marker.title} style={{ maxWidth: '100%', maxHeight: '150px' }} /><br />
                            </div>
                            <div style={{ flex: 2, paddingLeft: '10px' }}>
                                <strong>{marker.title}</strong><br />
                                {marker.address}<br />
                                Mức giá: {marker.price == 0 ? 'Thỏa thuận' : (
                                    marker.kind === 'Mua Bán' ? `${marker.price} tỷ` : `${marker.price} triệu/tháng`
                                )}<br />
                                Diện tích: {marker.area} m2
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
