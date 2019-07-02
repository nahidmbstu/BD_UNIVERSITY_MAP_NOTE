import React, { Component, Suspense } from "react";
import Fuse from "fuse.js";
import _ from "loadsh";

import "./App.css";
import Universities from "./public_university.json";
import CardContainer from "./CardContainer";
import MyProvider from "./AppContext";
import MyMap from "./Map";
import NoteAdd from "@material-ui/icons/NoteAdd";
import All from "./all_data.json";
import axios from "axios";
import { opencagedata_forward_geocoding } from "./Utills";

class App extends Component {
  state = {
    lat: 23.8103,
    lng: 90.4125,
    zoom: 7,
    data: Universities,
    searchData: All,
    Selectedlist: [],
    locationEnable: false,
    currentPostion: {
      lat: 0,
      lng: 0
    },
    uni_notes: [],
    result: [],
    all_data: All,
    foundLocations: []
  };

  componentWillMount() {
    let _names = JSON.parse(JSON.stringify(this.state.all_data));

    let all = [];
    _names.map(i => {
      all.push(i.name);
    });
    console.log(all);
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

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState.Selectedlist);

    localStorage.setItem("uni", JSON.stringify(nextState.Selectedlist));
    localStorage.setItem("note", JSON.stringify(nextState.uni_notes));
  }

  handleClick = async props => {
    let { Selectedlist } = this.state;

    if (Selectedlist.indexOf(props) === -1) {
      Selectedlist.push(props);
      this.setState({ Selectedlist, result: [] });

      let url = opencagedata_forward_geocoding + props;
      console.log(url);
      let res = await axios.get(url);
      console.log(res.data);

      let { results } = res.data;

      this.setState({ foundLocations: results });
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

    let { searchData } = this.state;
    let searchText = e.target.value;
    console.log(searchText);

    var options = {
      keys: ["name", "shortName", "location"],
      minMatchCharLength: 3
      // id: "name"
    };

    var fuse = new Fuse(searchData, options);
    let result = fuse.search(searchText);
    console.log(result);

    this.setState({ result });
  };

  updateNote = note => {
    let { uni_notes } = this.state;
    console.log("app js ..........", note, uni_notes);

    let index = uni_notes.findIndex(
      item => item.university === note.university
    );

    uni_notes.splice(index, 1);
    uni_notes.push(note);

    this.setState({ uni_notes });
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
              placeholder="Search University ..."
              className="searchBox"
              autoFocus
              onChange={this.handleSearchChange}
              autoCorrect="false"
              required
            />

            <div className="result-list">
              {result.map(item => (
                <div
                  className="list-item"
                  onClick={() => this.handleClick(item.name)}
                >
                  <div>
                    <p style={{ fontWeight: "bold", fontSize: 18 }}>
                      {item.name}
                    </p>
                    <p>{item.location}</p>
                  </div>
                  <div>
                    <NoteAdd titleAccess={`add - ${item.name}`} />
                  </div>
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
            foundLocations={this.state.foundLocations}
          />
          <CardContainer
            Selectedlist={Selectedlist}
            notes={uni_notes}
            ReceiveNewList={this.ReceiveNewList}
            takeNotes={this.takeNotes}
            updateNote={this.updateNote}
          />
        </Suspense>
      </MyProvider>
    );
  }
}

export default App;
