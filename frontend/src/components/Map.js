import React, { useEffect } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import HeatmapLayer from "react-leaflet-heatmap-layer";

const maxBounds = L.latLngBounds(
    L.latLng(6.0, 69.0),
    L.latLng(35, 98)
);

export default function Map() {
    let [location, setLocation] = React.useState([]);
    useEffect(()=>{
        fetch("http://localhost:4000/api/getlocation", {
        // Create fetch request to register user
        method: "POST", // Set request method to POST to register user
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data)=> data.json()).then((res)=>{
          setLocation(res.data);
      })
    },[])
    return (
        <div className="map">
            <LeafletMap
                center={[28.61, 77.23]}
                zoom={4.9}
                zoomControl={true}
                trackResize={true}
                maxBounds={maxBounds}
                maxZoom={15}
                minZoom={4.9}
            >
                <HeatmapLayer
                    points={location}
                    longitudeExtractor={(m) => m.location[1]}
                    latitudeExtractor={(m) => m.location[0]}
                    intensityExtractor={(m) => m["issue"]}
                    // minOpacity={0}
                    maxZoom={15}
                    minZoom={4.9}
                    radius={30}
                    blur={10}
                    max={5}
                    min={0}
                />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
                    minZoom={1}
                    maxZoom={15}
                />
            </LeafletMap>
        </div>
    );
}
