import React, { Component } from "react";
import Frack from './../Frack';
import './News.css';
import Loader from "../loader"
import TheNews from "./TheNews";

class News extends Component {
  //Check if the user is admin, if --> they can upload and delete
  state = { news: [], loading: true };

  componentDidMount = () => {
    window.scrollTo(0, 0)
    Frack.News.GetAll().then((res) => {
      this.setState({ news: res.data, loading: false })
    }).catch((errer) => {
      Frack.Logout();
      this.props.history.push('/login');
    });
  }


  createNews(n, i) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    //const timestamp = ;
    var timestamp = new Date(Date.parse(n.timestamp));
    timestamp = timestamp.toLocaleDateString('sv-SV', options);
    console.log(timestamp)

    return (
      <div key={i} className="news-contaner">
        <h2 className="news-heder typewriter_font"> {n.headline} </h2>
        <h5 className="typewriter_font">{timestamp}</h5>
        <h5 className="typewriter_font">Av: {n.author.type.name}-{n.author.name}</h5>
        <div className="news-text typewriter_font" dangerouslySetInnerHTML={{ __html: n.text }} />
      </div>
    )
  }

  render() {
    return (
      <div className="page">
        {(this.state.loading ? <Loader loading={true} /> : <div>
          <h1 className="view_header">Nyheter</h1>
          {this.state.news.map((n, i) => (
            <TheNews key={i} news={n}/>
            //this.createNews(n, i)
          ))}
        </div>)}
      </div>
    );
  }
}

export default News;