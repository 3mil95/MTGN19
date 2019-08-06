import React, { Component } from "react";
import "./Home.css";
import Frack from "../Frack";
import Media from "../Media/MediaImg";
import Filmproj from "../Media/Filmproj";
import Loader from "../loader"
import Lightbox from "lightbox-react";
import "lightbox-react/style.css";

class Home extends Component {
  //Check if the user is admin, if --> they can upload and delete??? should this be here?
  state = { newNews: [], newImg: [], loading: true, bubbolJump: true, filmprojektet: [], photoIndex: 0, showLightBox: false, filmIframe: [] };

  filmprojekt_namn = "Detektivnämnden";

  componentDidMount() {

    this.accessGranted()
    Frack.News.GetAll().then((res) => {
      this.setState({ newNews: res.data })
      Frack.Media.GetAll().then((res) => {
        let filmprojektet = [];
        let iframes = [];
        // eslint-disable-next-line
        res.data.map((media) => {
          // eslint-disable-next-line
          if (media.event.name == this.filmprojekt_namn) {
            filmprojektet.push(media)
            iframes.push(<iframe
              title={media.id}
              src={"https://" + media.video_link}
              position='absolute'
              width='100%'
              height='100%'
              styles={{ height: "25px" }}
            />)
          }
        })
        this.setState({ newImg: res.data, filmprojektet: filmprojektet, filmIframe: iframes, loading: false })


      });
    }).catch((errer) => {
      Frack.Logout();
      this.props.history.push('/login');
    });
  }

  getLink = () => {
    if (this.props.currentUser) {
      // eslint-disable-next-line
      if (this.props.currentUser.type.name != "nØllan") {
        return "https://docs.google.com/forms/d/e/1FAIpQLSeSi5hqEQuxtJ-3cn2sfTC0aQVcNXEMsG-NppbNswRPsMQwMQ/viewform"
      } else {
        return "https://forms.gle/oxUD276qkeENk3gr7"
      }
    }
    return null;
  }

  accessGranted = async url => {
    await new Promise(resolve => setTimeout(resolve, 10000));
    this.setState({
      bubbolJump: false
    })
  };

  mediaClick = () => {
    this.props.history.push('/media/');
  }

  openLightBox = index => {
    this.setState({ showLightBox: true, photoIndex: index });

  }

  render() {
    console.log(this.props.currentUser)

    let news = this.state.newNews[0];
    let newImg = this.state.newImg;
    let filmprojektet_thumb = this.state.filmprojektet;
    let filmprojektet = this.state.filmIframe;
    let photoIndex = this.state.photoIndex;
    if (newImg.length > 4) {
      newImg = this.state.newImg.slice(this.state.newImg.length - 4, this.state.newImg.length);
    }
    console.log(newImg)
    newImg.reverse()

    return (
      <div className="page">

        {(this.state.loading ? <Loader loading={true} /> :
          <div>
            <div className={(this.state.bubbolJump) ? "hjarta_lada big_lada" : "hjarta_lada small_lada"}>
              <a className='footer-linck' href={this.getLink()} >
                <img className={(this.state.bubbolJump) ? "bubbel bubbel-jump" : "bubbel"} src="https://cdn4.iconfinder.com/data/icons/iconsimple-communication/512/talk_bubble_heart-512.png" alt="Hjartat_lada" />
                <p style={{ color: "white", textAlign: "center" }} >Vad har du<br />på hjärtat?</p></a>
            </div>



            <div>

              {/*Senaste nyheten som lagts upp*/}
              {(this.state.newNews.length !== 0) ?
                <div >
                  <h3 className="subtitle">Senaste nyheten</h3>
                  <div className="news-contaner">
                    <h2 className="news-heder"> {news.headline} </h2>
                    <div className="news-text" dangerouslySetInnerHTML={{ __html: news.text }} />
                  </div></div> : null}
              {(this.state.newImg.length !== 0) ?
                <h3 className="subtitle">Senaste bilderna</h3> : null}
              <div className='media-grid'>
                {newImg.map((media, i) => {
                  return (<Media key={i} media={media} index={i} onClickHandeler={this.mediaClick}></Media>)
                })}
              </div>
            </div>
            {(this.state.filmprojektet.length !== 0) ? <h3 className="subtitle">{this.filmprojekt_namn}</h3> : null}

            <div className='media-grid'>


              {filmprojektet_thumb.map((media, i) => {
                return (<Filmproj key={i} media={media} index={i} onClickHandeler={() => this.openLightBox(i)}></Filmproj>)
              })}
            </div>

            {(this.state.showLightBox) ? <Lightbox
              mainSrc={filmprojektet[photoIndex]}
              nextSrc={filmprojektet[(photoIndex + 1) % filmprojektet.length]}
              prevSrc={
                filmprojektet[
                (photoIndex + filmprojektet.length - 1) % filmprojektet.length
                ]
              }
              onCloseRequest={() => this.setState({ showLightBox: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex:
                    (photoIndex + filmprojektet.length - 1) % filmprojektet.length
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % filmprojektet.length
                })
              }
            /> : null}



          </div>)}
      </div>
    );
  }
}

export default Home;