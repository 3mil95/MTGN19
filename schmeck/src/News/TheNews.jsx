import React from 'react';

const TheNews = (props) => {
    const news = props.news
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    //const timestamp = ;
    var timestamp = new Date(Date.parse(news.timestamp));
    timestamp = timestamp.toLocaleDateString('sv-SV', options);
    //console.log(timestamp)

    return (
      <div className="news-contaner">
        <h2 className="news-heder typewriter_font"> {news.headline} </h2>
        <div className="news-date">
            <h5 className="typewriter_font">{timestamp}</h5>
            <h5 className="typewriter_font">Av: {news.author.type.name}-{news.author.name}</h5>
        </div>
        <div className="news-text typewriter_font" dangerouslySetInnerHTML={{ __html: news.text }} />
      </div>
    )
}
 
export default TheNews;