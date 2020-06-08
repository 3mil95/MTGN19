import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Admin.css"
class Admin extends Component {
  state = {};
  render() {
    console.log(this.props.currentUser)
    return (
      <div className="page">
        <h1 className="view_header">Admin</h1>
        <div className="admin_container">

          <Link className="links" to="/admin/inlagg">Skapa inlägg</Link>
          <Link className="links" to="/admin/inlagg/hantera">Hantera inlägg</Link>

          <Link className="links long_link" to="/admin/media">Hantera media</Link>

          <Link className="links long_link" to="/admin/blandaren">Ladda upp ny bländaren</Link>

          <Link className="links long_link" to="/admin/anvandare">Skapa/hantera ny användare</Link>

          <Link className="links long_link" to="/admin/n0llegrupper">Hantera n0llegrupper</Link>
          <Link className="links long_link" to="/admin/anvandartyper">Hantera användartyper</Link>
        </div>
      </div>
    );
  }
}

export default Admin;
