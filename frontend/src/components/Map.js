import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import { geojson } from "./atd";

const maxBounds = L.latLngBounds(
    L.latLng(6.0, 69.0),
    L.latLng(35, 98)
);

export default function Map() {
    return (
        <div className="map">
            <LeafletMap
                center={[28.61, 77.23]}
                zoom={4.9}
                zoomControl={true}
                trackResize={true}
                maxBounds={maxBounds}
                maxZoom={12}
                minZoom={4.9}
            >
                <HeatmapLayer
                    points={geojson.features}
                    longitudeExtractor={(m) => m[0]}
                    latitudeExtractor={(m) => m[1]}
                    intensityExtractor={(m) => parseFloat(m[2])}
                    minOpacity={0.2}
                    maxZoom={12}
                    minZoom={4.9}
                    radius={15}
                    blur={10}
                    max={4}
                />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                    minZoom={1}
                    maxZoom={12}
                />
            </LeafletMap>
        </div>
    );
}
