import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS (required)

const MapList = ({ geocode }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current.leafletElement;

            // Import leaflet-heat library from public folder
            const heatLayerScript = document.createElement('script');
            heatLayerScript.src = `${process.env.PUBLIC_URL}/leaflet-heat.js`;
            heatLayerScript.onload = () => {
                // Extract coordinates for the heatmap
                const heatArray = geocode.map(item => [item.lat, item.lng]);

                // Initialize heatmap overlay
                L.heatLayer(heatArray, { radius: 25, gradient: { 0.4: 'red', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red' } }).addTo(map);
            };
            document.body.appendChild(heatLayerScript);
        }
    }, [geocode]);

    return (
        <MapContainer ref={mapRef} center={[geocode[0].lat, geocode[0].lng]} zoom={13} style={{ height: '400px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geocode.map((marker, index) => (
                <Marker key={index} position={[marker.lat, marker.lng]}>
                    <Popup>
                        <div>
                            <h2>{marker.title}</h2>
                            <p>{marker.address}</p>
                            <p>Giá: {marker.price} tỷ&nbsp;&nbsp;&nbsp;&nbsp;Diện tích: {marker.area} m2</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapList;
