import React, { Component } from "react";
import "./App.css";

import ListItem from "@material-ui/core/ListItem";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Modal from "react-responsive-modal";

let receive_data = localStorage.getItem("University");

class MODAL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      fullNote: {}
    };
  }

  componentDidMount() {
    console.log(".........", this.props.notes);
  }

  handleChange = e => {
    this.setState({
      note: e.target.value
    });
  };

  handleClick = name => {
    console.log("------------", this.state.note);
    let note = { university: name, note: this.state.note };
    this.setState({ fullNote: note }, () => {
      this.props.takeNotes(note);
    });
  };

  onCloseModal = () => {
    this.setState({ note: "" });
    this.props.onCloseModal();
  };

  render() {
    let { open, name, notes } = this.props;

    let find_note = notes.find(item => item.university === name);
    console.log("..........................-------------", find_note);

    return (
      <Modal open={open} onClose={this.onCloseModal}>
        <div>
          <h2>{name}</h2>
          <div style={{ display: "flex", margin: 20 }}>
            <Input
              placeholder="Add a Note"
              inputProps={{
                "aria-label": "Description"
              }}
              fullWidth
              value={this.state.note}
              onChange={this.handleChange}
            />
            <Fab
              color="secondary"
              aria-label="Add"
              onClick={() => this.handleClick(name)}
            >
              <AddIcon />
            </Fab>
          </div>
          <Card>
            <CardContent>
              <div>
                {find_note === undefined ? (
                  <p>No Note Found</p>
                ) : (
                  <p>{find_note.note}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Modal>
    );
  }
}

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
    console.log(
      "oooooooooooooooooooooooooooooooooooooooooo",
      JSON.parse(receive_data)
    );
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
    return (
      <div>
        <MODAL
          open={open}
          onCloseModal={this.onCloseModal}
          name={this.state.selected}
          takeNotes={this.takeNotes}
          notes={this.props.notes}
        />
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
