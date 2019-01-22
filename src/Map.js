import React, { lazy } from "react";
import { Map, TileLayer } from "react-leaflet";
import { OPEN_STREET_URL, OPEN_STREET_ATTRIBUTION } from "./Utills";

const MarkerComponent = lazy(() => import("./Marker"));

const MyMap = ({
  locationEnable,
  currentPostion,
  position,
  zoom,
  data,
  handleClick
}) => {
  return (
    <Map
      className="Map"
      center={locationEnable ? currentPostion : position}
      zoom={zoom}
    >
      <TileLayer attribution={OPEN_STREET_ATTRIBUTION} url={OPEN_STREET_URL} />
      {data.map(i => (
        <MarkerComponent data={i} onClick={handleClick} key={i.name} />
      ))}
    </Map>
  );
};

export default MyMap;
