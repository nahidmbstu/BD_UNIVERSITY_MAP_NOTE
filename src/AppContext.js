import React, { Component } from "react";
import { UniversityListContext } from "./Utills";

class MyProvider extends React.Component {
  render() {
    return (
      <UniversityListContext.Provider
        value={{ list: ["sdsd"], dasa: "ssssssssss" }}
      >
        {this.props.children}
      </UniversityListContext.Provider>
    );
  }
}

export default MyProvider;
