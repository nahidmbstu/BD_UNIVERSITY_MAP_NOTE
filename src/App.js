import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import "./App.css";
import Universities from "./public_university.json";
import { OPEN_STREET_URL, OPEN_STREET_ATTRIBUTION } from "./Utills";
import CardContainer from "./CardContainer";
import MarkerComponent from "./Marker";
import MyProvider from "./AppContext";

class App extends Component {
  state = {
    lat: 23.8103,
    lng: 90.4125,
    zoom: 7,
    data: Universities,
    Selectedlist: [],
    locationEnable: false,
    currentPostion: {
      lat: 0,
      lng: 0
    },
    uni_notes: []
  };

  componentWillMount() {
    if (localStorage.getItem("uni")) {
      this.setState({
        Selectedlist: JSON.parse(localStorage.getItem("uni"))
      });
    }
    if (localStorage.getItem("note")) {
      this.setState({
        uni_notes: JSON.parse(localStorage.getItem("note"))
      });
    }
  }
  success = pos => {
    if (pos) {
      let crd = pos.coords;

      let location = {
        lat: crd.latitude,
        lng: crd.longitude
      };

      this.setState({
        currentPostion: location,
        locationEnable: true,
        zoom: 12
      });
    }
  };

  error = err => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.success, this.error);

    console.log("oooooooooooooooooooooooooooooooooooooooooo", this.props);
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState.Selectedlist);

    localStorage.setItem("uni", JSON.stringify(nextState.Selectedlist));
    localStorage.setItem("note", JSON.stringify(nextState.uni_notes));
  }

  handleClick = props => {
    console.log(props);
    let { Selectedlist } = this.state;
    console.log(Selectedlist);

    if (Selectedlist.indexOf(props) == -1) {
      Selectedlist.push(props);

      this.setState({ Selectedlist });
    }
  };

  ReceiveNewList = arr => {
    this.setState({ Selectedlist: arr });
  };

  takeNotes = note => {
    console.log("some note .................................", note);
    let { uni_notes } = this.state;
    uni_notes.push(note);
    this.setState({ uni_notes });
  };

  render() {
    const position = [this.state.lat, this.state.lng];

    const currentPostion = [
      this.state.currentPostion.lat,
      this.state.currentPostion.lng
    ];

    return (
      <MyProvider>
        <Map
          className="Map"
          center={this.state.locationEnable ? currentPostion : position}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution={OPEN_STREET_ATTRIBUTION}
            url={OPEN_STREET_URL}
          />
          {this.state.data.map(i => (
            <MarkerComponent data={i} onClick={this.handleClick} key={i.name} />
          ))}
          <CardContainer
            Selectedlist={this.state.Selectedlist}
            notes={this.state.uni_notes}
            ReceiveNewList={this.ReceiveNewList}
            takeNotes={this.takeNotes}
          />
        </Map>
      </MyProvider>
    );
  }
}

export default App;
