import React, { Component } from "react";
import CheckBox from "./CheckBox";
import Frack from "./../Frack";
import "./Media.css";
import MediaImg from "./MediaImg";
import axios from "axios";
import Loader from "../loader"
import Lightbox from "lightbox-react";
import "lightbox-react/style.css";

class Media extends Component {
  //Check if the user is admin, if --> they can upload and delete
  state = {
    check: [
      [
        { text: 33, check: true },
        { text: 34, check: true },
        { text: 35, check: true },
        { text: 36, check: true }
      ],
      [],
      [
        { text: "Bild", engText: "image", check: true },
        { text: "Video", engText: "video", check: true }
      ]
    ],
    photoIndex: 0,
    isOpenLite: false,
    isOpen: false,
    medias: [],
    isDeleting: false,
    deleteImage: [],
    deleteVideo: [],
    loading: true
  };

  images = [];

  checkboxHandler = (index, type) => {
    let check = this.state.check;
    check[type][index].check = !check[type][index].check;
    this.setState({ check: check });
  };

  componentDidMount() {
    Frack.Event.GetAll()
      .then(res => {
        //console.log(res);
        let check = this.state.check;
        let events = [];
        for (let i = 0; i < res.data.length; i++) {
          events.push({ text: res.data[i].name, check: true });
        }
        check[1] = events;
        this.setState({ check: check });
      })
      .catch(errer => {
        Frack.Logout();
        this.props.history.push("/login");
      });
    Frack.Media.GetAll().then(res => {
      //console.log(res);
      this.setState({ medias: res.data, admin: Frack.CurrentUser.admin, loading: false });
    });
  }

  deleteHandeler = () => {
    const { medias, deleteImage, deleteVideo } = this.state;

    if (this.state.isDeleting && deleteImage.length + deleteVideo.length > 0) {
      if (window.confirm(`DELETE:\nvideos: ${deleteVideo.length}\nimages: ${deleteImage.length}`)) {
        axios({
          method: "delete",
          url: "/api/media/",
          auth: {
            username: sessionStorage.authToken,
            password: ""
          },
          data: {
            images: this.state.deleteImage,
            videos: this.state.deleteVideo
          }
        }).then(() => {
          for (let index = medias.length - 1; index >= 0; index--) {
            //medias.forEach((media, index) => {
            let media = medias[index];
            let i;
            if (media.type === "image") {
              i = deleteImage.indexOf(media.id);
            } else {
              i = deleteVideo.indexOf(media.id);
            }
            console.log(i);
            if (i !== -1) {
              medias.splice(index, 1);
            }
          }
          this.setState({
            medias: medias,
            deleteVideo: [],
            deleteImage: []
          });
        });
      }
    }
    this.setState({ isDeleting: !this.state.isDeleting });
  };

  checkboxShow = (index, box) => {
    if (index === 0 || index === 1) {
      var found = this.state.medias.find(media => {
        if (index === 0) {
          return media.week === box.text;
        } else if (index === 1) {
          return media.event.name === box.text;
        }
        return false;
      });
      if (!found) {
        return false;
      }
    }
    return true;
  };

  createCheckType = (index, type) => {
    return (
      <React.Fragment>
        <h4 className='type-checkbox-text'>{type}</h4>
        <div className='type-checkbox-contaner'>
          {this.state.check[index].map((box, i) => {
            if (!this.checkboxShow(index, box)) {
              return null;
            }
            return (
              <CheckBox
                key={i}
                type={index}
                index={i}
                text={box.text}
                check={box.check}
                clickHandeler={this.checkboxHandler}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  };

  showImg = img => {
    for (let i = 0; i < this.state.check.length; i++) {
      let show = false;
      for (let j = 0; j < this.state.check[i].length; j++) {
        if (i === 0) {
          if (
            this.state.check[i][j].check &&
            this.state.check[i][j].text === img.week
          ) {
            show = true;
          }
        } else if (i === 1) {
          if (
            this.state.check[i][j].check &&
            this.state.check[i][j].text === img.event.name
          ) {
            show = true;
          }
        } else if (i === 2) {
          if (
            this.state.check[i][j].check &&
            this.state.check[i][j].engText === img.type
          ) {
            show = true;
          }
        }
      }
      if (show === false) {
        return show;
      }
    }
    return true;
  };

  filterButtonHandeler = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  openLightBox = index => {
    if (!this.state.isDeleting) {
      this.setState({ isOpenLite: true, photoIndex: index });
      return;
    }
    let deleteList;
    if (this.state.medias[index].type === "image") {
      deleteList = this.state.deleteImage;
    } else {
      deleteList = this.state.deleteVideo;
    }
    const i = deleteList.indexOf(this.state.medias[index].id);
    console.log(i);
    if (i !== -1) {
      deleteList.splice(i, 1);
    } else {
      deleteList.push(this.state.medias[index].id);
    }
    if (this.state.medias[index].type === "image") {
      this.setState({ deleteImage: deleteList });
    } else {
      this.setState({ deleteVideo: deleteList });
    }
  };

  createImages = media => {
    if (media.type === "video") {
      this.images.push(
        <iframe
          title={media.id}
          src={"https://" + media.video_link}
          position='absolute'
          width='100%'
          height='100%'
          styles={{ height: "25px" }}
        >&lt;br /&gt;</iframe>
      );
    } else {
      this.images.push("/" + media.filename);
    }
  };

  sortMedia = (a, b) => {
    console.log(a, b);
    console.log(a.week);
    if (a.week !== b.week) {
      console.log("week");
      return a.week - b.week;
    }
    if (a.event.datetime !== b.event.datetime) {
      console.log("datetime");
      return Date.parse(a.event.datetime) - Date.parse(b.event.datetime);
    }
    if (a.event.name !== b.event.name) {
      console.log("name");
      return a.event.name - b.event.name;
    }
    return 0;
  };

  createImageTag = (i, media) => {
    console.log(media.type);
    const { deleteImage, deleteVideo } = this.state;
    let deleteClass = "";
    if (this.state.isDeleting) {
      let i;
      if (media.type === "image") {
        i = deleteImage.find(id => {
          return id === media.id;
        });
      } else {
        i = deleteVideo.find(id => {
          return id === media.id;
        });
      }
      console.log(i);
      if (i) {
        deleteClass = "delete-media";
      }
    }
    return (
      <MediaImg
        key={media.id}
        deleteClass={deleteClass}
        index={i}
        media={media}
        onClickHandeler={this.openLightBox}
      />
    );
  };

  render() {
    this.images = [];
    const { photoIndex, isOpenLite, medias } = this.state;
    medias.sort((a, b) => {
      return this.sortMedia(a, b);
    });

    return (
      <div className='page'>
        {(this.state.loading ? <Loader loading={true} /> : <div>
          {/*checkbox*/}
          <div className='checkbox-contaner'>
            <h1 className='view_header'>Media</h1>
            <div
              className={
                !this.state.isOpen
                  ? "checkbox-type-contaner"
                  : "checkbox-type-contaner checkbox-type-contaner-open"
              }>
              {this.state.isOpen ? (
                <React.Fragment>
                  {this.createCheckType(0, "Vecka:")}
                  {this.createCheckType(1, "Event:")}
                  {this.createCheckType(2, "Mediatyp:")}
                </React.Fragment>
              ) : null}
            </div>
            <div className='media-button-contaner'>
              <button
                className='media-button'
                onClick={this.filterButtonHandeler}>
                {!this.state.isOpen ? <h2>▼ Filter</h2> : <h2>▲ Filter</h2>}
              </button>
              {this.props.currentUser ? (this.props.currentUser.admin ? (
                <button onClick={this.deleteHandeler}>
                  {this.state.isDeleting ? (
                    <h2>{`filer valda (${this.state.deleteImage.length +
                      this.state.deleteVideo.length})`}</h2>
                  ) : (
                      <h2>Delete</h2>
                    )}
                </button>
              ) : null) : null}
            </div>
          </div>
          {/*media*/}
          <div className='media-grid'>
            {medias.map((media, i) => {
              if (this.showImg(media)) {
                this.createImages(media);
                if (i === 0) {
                  return (
                    <React.Fragment key={i}>
                      <h2 className='media-divider'>{`v.${media.week}`}</h2>
                      {this.createImageTag(i, media)}
                    </React.Fragment>
                  );
                }
                if (medias[i - 1].week !== media.week) {
                  return (
                    <React.Fragment key={i}>
                      <h2 className='media-divider'>{`v.${media.week}`}</h2>
                      {this.createImageTag(i, media)}
                    </React.Fragment>
                  );
                }
                return this.createImageTag(i, media);
              }
              return null;
            })}
          </div>
          {/*Lightbox*/}
          <div>
            {isOpenLite && (
              <Lightbox
                mainSrc={this.images[photoIndex]}
                nextSrc={this.images[(photoIndex + 1) % this.images.length]}
                prevSrc={
                  this.images[
                  (photoIndex + this.images.length - 1) % this.images.length
                  ]
                }
                onCloseRequest={() => this.setState({ isOpenLite: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex:
                      (photoIndex + this.images.length - 1) % this.images.length
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % this.images.length
                  })
                }
              />
            )}
          </div>
        </div>)}

      </div>
    );
  }
}

export default Media;
