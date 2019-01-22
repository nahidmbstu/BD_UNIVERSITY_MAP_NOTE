import React, { Component, Suspense } from "react";
import _ from "loadsh";
import Fuse from "fuse.js";
import "./App.css";
import Universities from "./public_university.json";
import CardContainer from "./CardContainer";
import MyProvider from "./AppContext";
import MyMap from "./Map";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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
    uni_notes: [],
    result: []
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
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState.Selectedlist);

    localStorage.setItem("uni", JSON.stringify(nextState.Selectedlist));
    localStorage.setItem("note", JSON.stringify(nextState.uni_notes));
  }

  handleClick = props => {
    let { Selectedlist } = this.state;

    if (Selectedlist.indexOf(props) === -1) {
      Selectedlist.push(props);
      this.setState({ Selectedlist });
    } else {
      alert("Item is already on the list");
    }
  };

  ReceiveNewList = arr => {
    this.setState({ Selectedlist: arr });
  };

  takeNotes = note => {
    let { uni_notes } = this.state;
    uni_notes.push(note);
    this.setState({ uni_notes });
  };

  handleSearchChange = e => {
    e.preventDefault();

    let { data } = this.state;
    let searchText = e.target.value;
    console.log(searchText);

    var options = {
      keys: ["name", "shortName"],
      minMatchCharLength: 3,
      id: "name"
    };

    var fuse = new Fuse(data, options);
    let result = fuse.search(searchText);
    console.log(result);

    this.setState({ result });
  };

  render() {
    const position = [this.state.lat, this.state.lng];

    const currentPostion = [
      this.state.currentPostion.lat,
      this.state.currentPostion.lng
    ];

    let {
      locationEnable,
      zoom,
      Selectedlist,
      uni_notes,
      data,
      result
    } = this.state;

    return (
      <MyProvider>
        <Suspense fallback={<div>loading ......</div>}>
          <div className="inputContainer">
            <input
              type="search"
              placeholder="Search University "
              className="searchBox"
              autoFocus
              autoComplete={false}
              onChange={this.handleSearchChange}
            />

            <div className="result-list">
              {result.map(item => (
                <div
                  className="list-item"
                  onClick={() => this.handleClick(item)}
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <MyMap
            locationEnable={locationEnable}
            currentPostion={currentPostion}
            position={position}
            zoom={zoom}
            data={data}
            handleClick={this.handleClick}
          />
          <CardContainer
            Selectedlist={Selectedlist}
            notes={uni_notes}
            ReceiveNewList={this.ReceiveNewList}
            takeNotes={this.takeNotes}
          />
        </Suspense>
      </MyProvider>
    );
  }
}

export default App;
