import React, { Component } from "react";
import Frack from "../Frack";

class HanteraInlagg extends Component {
  state = { news: [] };

  componentDidMount() {
    window.scrollTo(0, 0)
    Frack.News.GetAll().then(res => {
      this.setState({ news: res.data });
    });
  }

  deleteHandeler = news => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      Frack.News.Delete(news.id).then(res => {
        const newsList = this.state.news;
        console.log(newsList);
        const i = newsList.indexOf(news);
        newsList.splice(i, 1);
        this.setState({ news: newsList });
      });
    }
  };

  updateHandeler = id => {
    this.props.history.push(`/admin/inlagg/update/${id}`);
  };

  createNews = news => {
    return (
      <div className="admin_block">
        <label>{news.headline}</label>
        <button className="btn" onClick={() => this.updateHandeler(news.id)}>Redigera</button>
        <button className="btn" onClick={() => this.deleteHandeler(news)}>Ta bort</button>
      </div>
    );
  };

  render() {
    return (
      <div className='page'>
        <h1 className='view_header'>HanteraInlagg</h1>
        {this.state.news.map(n => this.createNews(n))}
      </div>
    );
  }
}

export default HanteraInlagg;
