import React, { Component } from "react";
import Frack from "../Frack";
import './Blandaren.css';
import Loader from "../loader";

class Blandaren extends Component {
  //Check if the user is admin, if --> they can upload and delete
  state = {
    Blandaren: [],
    admin: false,
    deleteState: false,
    loading: true
  };


  componentDidMount() {
    Frack.Blandaren.GetAll().then((res) => {
      this.setState({
        Blandaren: res.data,
        admin: Frack.CurrentUser.admin,
        loading: false
      })
    })
  }

  deleteBlandaren = (id) => {

    if (window.confirm('Är du säker på att du vill ta bort denna bländaren?')) {
      Frack.Blandaren.Delete(id).then((res) => {
        alert('Filen är nu borttagen')

        Frack.Blandaren.GetAll().then((res) => {
          this.setState({
            Blandaren: res.data
          })
        })
      })
    }
  }

  deleteStatus = () => {
    if (this.state.deleteState) {
      this.setState({ deleteState: false })
    }

    else {
      this.setState({ deleteState: true })
    }



  }

  render() {
    var deletebtn = <div></div>;
    if (this.state.admin) {
      if (this.state.deleteState) {
        deletebtn = <button onClick={this.deleteStatus} className="delete_btn">View</button>
      }
      else {
        deletebtn = <button onClick={this.deleteStatus} className="delete_btn">Delete</button>
      }
    }
    return (
      <div className="page">
        {(this.state.loading ? <Loader loading={true} /> : <div>
          <h1 className="view_header">Bländaren</h1>
          {deletebtn}
          <div className="blandaren_grid">
            {this.state.Blandaren.map((file) => {
              var html = <a href={`http://localhost:5000/static/blandaren/${file.filename}`}><img src={`/static/blandaren/${file.thumbnail}`} className="image-hover" /></a>
              if (this.state.deleteState) {
                html = <button onClick={() => this.deleteBlandaren(file.id)} ><img src={`/static/blandaren/${file.thumbnail}`} className="image-hover" /></button>
              }
              return (<div key={file.id} className="document-container">
                <div className="document-blandare">
                  {/*för att funka: http://localhost:5000/static/blandaren/${file.filename}/static/blandaren/${file.filename}*/}
                  {html}
                  <div className="document-text-container" ><h2 className="title">{file.title}</h2></div>
                </div>
              </div>)
            })}
          </div>
        </div>)}
      </div>
    );
  }
}

export default Blandaren;