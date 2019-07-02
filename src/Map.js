import React, { lazy } from "react";
import { Map, TileLayer } from "react-leaflet";
import {
  OPEN_STREET_URL,
  OPEN_STREET_ATTRIBUTION,
  PIN,
  myIcon,
  CurrentPosition,
  ADDRESS_ICON
} from "./Utills";
import { Marker, Popup, Tooltip } from "react-leaflet";

const MarkerComponent = lazy(() => import("./Marker"));

const MyMap = ({
  locationEnable,
  currentPostion,
  position,
  zoom,
  data,
  handleClick,
  foundLocations
}) => {
  console.log("---------------------------------", foundLocations);
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
      {locationEnable && (
        <Marker
          position={currentPostion}
          icon={ADDRESS_ICON}
          className="MyMarker"
        />
      )}

      {foundLocations.slice(0, 1).map(item => (
        <Marker position={item.geometry} icon={ADDRESS_ICON} />
      ))}
    </Map>
  );
};

export default MyMap;
