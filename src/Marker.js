import React from "react";
import MyProvider from "./AppContext";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { myIcon, UniversityListContext } from "./Utills";

class MarkerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { name, location, shortName, Place } = this.props.data;
    return (
      <Marker position={location} icon={myIcon} className="MyMarker">
        <Popup>
          <div className="MyPopup" onClick={() => this.props.onClick(name)}>
            <p>{name}</p>
          </div>
        </Popup>
        <Tooltip className="tooltip">{name + shortName + Place}</Tooltip>
      </Marker>
    );
  }
}

export default MarkerComponent;
