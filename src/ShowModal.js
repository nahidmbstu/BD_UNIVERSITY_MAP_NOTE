import React, { Component } from "react";
import "./App.css";

import Input from "@material-ui/core/Input";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import AddIcon from "@material-ui/icons/Add";
import UpdateIcon from "@material-ui/icons/Update";

import Fab from "@material-ui/core/Fab";
import Modal from "react-responsive-modal";

export default class SHOW_MODAL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      fullNote: {},
      update: false
    };
  }

  componentDidMount() {
    console.log(".........", this.props);
  }

  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  handleClick = name => {
    let note = { university: name, note: this.state.input };
    this.setState({ fullNote: note, input: "" }, () => {
      this.props.takeNotes(note);
    });
  };

  onCloseModal = () => {
    this.setState({ input: "", update: false });
    this.props.onCloseModal();
  };

  handleUpdate = name => {
    console.log("------------", this.state.input);
    let note = { university: name, note: this.state.input };
    this.setState({ fullNote: note, input: "", update: false }, () => {
      this.props.updateNote(note);
    });
  };

  render() {
    let { open, name, notes, updateNote, takeNotes } = this.props;

    let find_note = notes.find(item => item.university === name);

    console.log(
      "..........................-------------",
      this.props,
      find_note
    );

    return (
      <Modal open={open} onClose={this.onCloseModal}>
        <div>
          <h2 className="uni_name">{name}</h2>

          <Card>
            <CardContent>
              <div style={{ display: "flex", margin: 20 }}>
                <Input
                  placeholder="Add Note or Update"
                  inputProps={{
                    "aria-label": "Description"
                  }}
                  fullWidth
                  value={this.state.input}
                  onChange={this.handleChange}
                />

                {this.state.update ? (
                  <Fab
                    color="secondary"
                    aria-label="Add"
                    onClick={() => this.handleUpdate(name)}
                  >
                    <UpdateIcon />
                  </Fab>
                ) : find_note === undefined ? (
                  <Fab
                    color="secondary"
                    aria-label="Add"
                    onClick={() => this.handleClick(name)}
                  >
                    <AddIcon />
                  </Fab>
                ) : null}
              </div>
              <div>
                {find_note === undefined ? (
                  <p>No Note Found</p>
                ) : (
                  <div className="Note-container" style={{}}>
                    {this.state.update ? null : <p>{find_note.note}</p>}
                    <div className="update_fab">
                      {this.state.update ? null : (
                        <Fab
                          color="secondary"
                          aria-label="Add"
                          onClick={() => {
                            this.setState({
                              input: find_note.note,
                              update: true
                            });
                          }}
                        >
                          <UpdateIcon />
                        </Fab>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Modal>
    );
  }
}
