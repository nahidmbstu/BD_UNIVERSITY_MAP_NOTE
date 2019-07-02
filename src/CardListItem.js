import React, { Component } from "react";
import "./App.css";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import SHOW_MODAL from "./ShowModal";

let receive_data = localStorage.getItem("University");

class MyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Selectedlist: JSON.parse(receive_data),
      open: false,
      selected: ""
    };
  }

  onOpenModal = i => {
    this.setState({ open: true, selected: i });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    console.log(JSON.parse(receive_data));
  }

  DeleteItem = item => {
    let arr = this.props.Selectedlist.filter(i => i !== item);
    console.log(arr, this.props.Selectedlist);
    this.props.ReceiveNewList(arr);
  };

  takeNotes = note => {
    this.props.takeNotes(note);
  };

  render() {
    const { open } = this.state;

    let MyModal = (
      <SHOW_MODAL
        open={open}
        onCloseModal={this.onCloseModal}
        name={this.state.selected}
        takeNotes={this.takeNotes}
        notes={this.props.notes}
        updateNote={this.props.updateNote}
      />
    );
    return (
      <div>
        {MyModal}
        {this.props.Selectedlist.map(i => (
          <ListItem className="MyItem">
            <ListItemText
              className="item_name"
              onClick={() => this.onOpenModal(i)}
            >
              {i}
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments">
                <DeleteIcon onClick={() => this.DeleteItem(i)} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </div>
    );
  }
}

MyItem.defaultProps = {
  list_items: ["one", "two", "three", "four"]
};

export default MyItem;
