import React, { Component } from "react";
import "./App.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import LIST_ITEM from "./CardListItem";

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    let { Selectedlist, ReceiveNewList, takeNotes, notes } = this.props;
    return (
      <Card
        className="MyCard"
        style={{
          backgroundColor: " #dfe3e6",
          width: "20vw",
          height: "90vh",
          overflowY: "scroll"
        }}
      >
        <CardContent>
          <h3>
            {" "}
            Click the Marker-Popup to add notes. Select Note to See Details{" "}
          </h3>
          <List dense={false}>
            <LIST_ITEM
              Selectedlist={Selectedlist}
              ReceiveNewList={ReceiveNewList}
              takeNotes={takeNotes}
              notes={notes}
            />
          </List>
        </CardContent>
      </Card>
    );
  }
}

export default CardContainer;
