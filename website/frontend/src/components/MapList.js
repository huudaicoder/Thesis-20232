import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat.js';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const MapList = ({ geocode }) => {
    const mapRef = useRef(null);
    const [heatmapEnabled, setHeatmapEnabled] = useState(false);
    const [markers, setMarkers] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const heatData = geocode.map(item => [item.lat, item.lng, 0.5]);
        const initialCoordinates = heatData.length > 0 ? heatData[0].slice(0, 2) : [10.7769, 106.7009];
        const map = L.map(mapRef.current).setView(initialCoordinates, 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const customIcon = L.icon({
            iconUrl: markerIcon,
            iconRetinaUrl: markerIcon2x,
            iconSize: [30, 20],
            iconAnchor: [10, 20],
            popupAnchor: [0, -20]
        });

        const markersOnMap = geocode.map(item => {
            const coordinates = [item.lat, item.lng];
            
            const popupContent = `
                <div style="display: flex; flex-direction: row;">
                    <div style="flex: 1;">
                        <img src="${item.image_link}" alt="${item.title}" style="max-width: 100%; max-height: 150px;">
                    </div>
                    <div style="flex: 2; padding-left: 10px;">
                        <b><a href="#" class="popup-link" data-id="${item.id}" style="color: inherit; text-decoration: none;">${item.title}</a></b><br>
                        ${item.address}<br>
                        Giá: ${item.price == 0.00 ? 'Thỏa Thuận' : `${item.price} ${item.kind === 'Cho Thuê' ? 'triệu/tháng' : 'tỷ'}`}<br>
                        Diện tích: ${item.area} m2
                    </div>
                </div>
            `;
            const marker = L.marker(coordinates, { icon: customIcon }).bindPopup(popupContent);
            return marker.addTo(map);
        });

        setMarkers(markersOnMap);

        const heatmapLayer = L.heatLayer(heatData, {
            radius: 20,
            blur: 15,
            maxZoom: 10,
            max: 1.5,
            gradient: {
                0.0: 'green',
                0.5: 'yellow',
                1.0: 'red'
            }
        });

        if (heatmapEnabled) {
            markersOnMap.forEach(marker => marker.remove()); // Remove all markers when enabling heatmap
            heatmapLayer.addTo(map);
        } else {
            markersOnMap.forEach(marker => marker.addTo(map)); // Add markers back when disabling heatmap
            map.removeLayer(heatmapLayer); // Remove heatmap layer if heatmap is disabled
        }

        const handlePopupClick = (e) => {
            if (e.target.classList.contains('popup-link')) {
                e.preventDefault();
                const id = e.target.getAttribute('data-id');
                history.push(`/listing/${id}`);
            }
        };

        map.on('popupopen', (e) => {
            const popup = e.popup._contentNode;
            popup.addEventListener('click', handlePopupClick);
        });

        return () => {
            map.off('popupopen');
            map.remove();
        };
    }, [geocode, heatmapEnabled, history]);

    const toggleHeatmap = () => {
        setHeatmapEnabled(!heatmapEnabled);
    };

    return (
        <div style={{ position: 'relative' }}>
            <div ref={mapRef} style={{ height: '400px' }} />
            <div style={{ position: 'absolute', top: '80px', left: '7px', zIndex: '1000'}}>
                <DropdownButton id="dropdown-basic-button" title={heatmapEnabled ? 'Heatmap' : 'Map'} variant="primary">
                    <Dropdown.Item onClick={toggleHeatmap}>
                        {heatmapEnabled ? 'Switch to Map' : 'Switch to Heatmap'}
                    </Dropdown.Item>
                </DropdownButton>
            </div>
        </div>
    );
};

export default MapList;
