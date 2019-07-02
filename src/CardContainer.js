import React, { Component } from "react";
import "./App.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import MyItem from "./CardListItem";

import TakeNote from "./images/take_note.svg";

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    let {
      Selectedlist,
      ReceiveNewList,
      takeNotes,
      notes,
      updateNote
    } = this.props;
    return (
      <Card className="MyCard">
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            backgroundColor: "lightblue",
            width: 150,
            height: 150,
            zIndex: -1,
            borderBottomRightRadius: 150
          }}
        />
        <h1 style={{ color: "#456" }}>Bangladesh Universtiy Finder </h1>
        <img
          alt="notes"
          src={TakeNote}
          width="90%"
          style={{
            padding: 5,
            display: "block",
            margin: "0 auto",
            zIndex: 100
          }}
        />

        <h4 style={{ paddingLeft: 10 }}>Saved Notes </h4>
        <CardContent>
          <List dense={false}>
            <MyItem
              Selectedlist={Selectedlist}
              ReceiveNewList={ReceiveNewList}
              takeNotes={takeNotes}
              notes={notes}
              updateNote={updateNote}
            />
          </List>
        </CardContent>
      </Card>
    );
  }
}

export default CardContainer;
