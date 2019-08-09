import React, { Component } from "react";
import "./Schedule.css";

class Schedule extends Component {
  //Check if the user is admin, if --> they can upload and delete, should this be here??
  state = {
    mode: "AGENDA",
  };

  modeHandler = (event) => {
    this.setState({ mode: event.target.value })
  }

  btn_class = (event) => {
    if (this.state.mode === event) {
      return "mode_btn selected_btn"
    }
    return "mode_btn"

  }

  render() {

    var calendar = "";
    if (this.state.mode === "DAY") {
      calendar = <iframe  title="DAY" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23330707&amp;ctz=Europe%2FStockholm&amp;src=aDVwYWFpNWs0MHVkY3U1ZWxxOHRqMWtzNzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%237CB342&amp;showDate=0&amp;showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=DAY" width="100%" height="600" frameBorder="0" scrolling="yes"></iframe>
    }
    if (this.state.mode === "WEEK") {
      calendar = <iframe title="WEEK" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23330707&amp;ctz=Europe%2FStockholm&amp;src=aDVwYWFpNWs0MHVkY3U1ZWxxOHRqMWtzNzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%237CB342&amp;showDate=0&amp;showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=WEEK" width="100%" height="600" frameBorder="0" scrolling="yes"></iframe>
    }
    if (this.state.mode === "AGENDA") {
      calendar = <iframe title="AGENDA"  src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23330707&amp;ctz=Europe%2FStockholm&amp;src=aDVwYWFpNWs0MHVkY3U1ZWxxOHRqMWtzNzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%237CB342&amp;showDate=0&amp;showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA" width="100%" height="600" frameBorder="0" scrolling="yes"></iframe>
    }
    return (
      <div className="page">
        <h1 className="view_header">Schema</h1>
        <button onClick={this.modeHandler} value="DAY" className={this.btn_class("DAY")} >Day</button>
        <button onClick={this.modeHandler} value="WEEK" className={this.btn_class("WEEK")}>Week</button>
        <button onClick={this.modeHandler} value="AGENDA" className={this.btn_class("AGENDA")}>Program</button>
        <div style={{zIndex:2}}>{calendar}</div>
        {//<div style={{zIndex:1, position: 'fixed', top: "0px"}}><Loader loading={true}/></div>
        }
      </div>);
  }
}

export default Schedule;
