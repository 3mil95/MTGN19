import React, { Component } from "react";
import Frack from "./../Frack";
import "./Profile.css";
//import TopSecret from "./TopSecret";
import ProfileImg from "./ProfileImg";
import Loader from "../loader";

class Profile extends Component {
  state = {
    profiles: [],
    index: -1,
    edit: false,
    editPassword: false,
    loading: true,
    CurrentUser: null
  };

  constructor() {
    super();
    if (!Frack.CurrentUser) {
      Frack.UpdateCurrentUser();
    }
    console.log(Frack.CurrentUser);
  }

  componentDidMount() {
    console.log("profile start");
    this.getUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.user !== this.props.match.params.user) {
      console.log("cwpr");
      const profiles = this.state.profiles;
      profiles.sort((a, b) => this.sortUsers(a, b));
      const index = profiles.findIndex(user =>
        this.findUsre(user, nextProps.match.params.user)
      );
      console.log(index);
      this.setState({
        index: index
      });
    }
  }

  comicsans = () => { };

  createComicsansPopup = () => {
    console.log("popup");
    return (
      <div id='myModal' className='modal'>
        <div className='modal-content'>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    );
  };

  handelEditButton = () => {
    this.setState({ edit: !this.state.edit });
  };

  handelEditPasswordButton = () => {
    this.setState({ editPassword: !this.state.editPassword });
  };

  getUser = () => {
    console.log("hej profil");
    if (this.props.location.state) {
      this.setState({
        profiles: this.props.location.state.profiles,
        index: this.props.location.state.index,
        loading: false
      })
    } else {
      console.log("not found")
      Frack.User.GetAll().then(res => {
        console.log(res);
        const profiles = res.data;
        profiles.sort((a, b) => this.sortUsers(a, b))
        const index = profiles.findIndex((user) => this.findUsre(user));
        console.log(index)
        this.setState({ profiles: profiles, index: index, loading: false });
      }).catch((errer) => {
        Frack.Logout();
        this.props.history.push('/login');
      });
    }

  };

  swopUesr = indexTo => {
    if (indexTo !== -1) {
      const { profiles } = this.state;
      this.setState({ index: indexTo });
      this.props.history.push({
        pathname: `/profiler/${profiles[indexTo].username}`,
        state: { profiles: profiles, index: indexTo }
      });
    }
  };

  findNext = () => {
    const { index, profiles } = this.state;
    for (let i = index + 1; i < profiles.length; i++) {
      if (!profiles[i].hidden) {
        return i;
      }
    }
    return -1;
  };

  findPrev = () => {
    const { index, profiles } = this.state;
    for (let i = index - 1; i >= 0; i--) {
      if (!profiles[i].hidden) {
        return i;
      }
    }
    return -1;
  };

  findUsre = (user, theUserSerct = this.props.match.params.user) => {
    console.log(this.props.match.params.user);
    return user.username === theUserSerct;
  };

  sortUsers = (a, b) => {
    const group = [
      "nØllan",
      "KPH",
      "INPHO",
      "ARR",
      "LEK",
      "ÖPH",
      "VRAQUE",
      "RSA"
    ];
    if (group.indexOf(a.type.name) !== group.indexOf(b.type.name)) {
      return group.indexOf(a.type.name) - group.indexOf(b.type.name);
    }
    if (a.n0llegroup && b.n0llegroup) {
      if (a.n0llegroup.name !== b.n0llegroup.name) {
        return a.n0llegroup.name - b.n0llegroup.name;
      }
    }
    return 0;
  };

  changePassword = event => {
    event.preventDefault();
    const newPassword = event.target.newPassword.value;
    if (newPassword === event.target.confermPassword.value) {
      Frack.User.Update(this.state.profiles[this.state.index].id, {
        password: newPassword
      }).then(res => {
        this.setState({ editPassword: false });
      });
    }
  };

  userUpdate = event => {
    event.preventDefault();
    const { profiles, index } = this.state;
    const profile = profiles[index];

    var data = {
      description: event.target.description.value,
      q1: event.target.q1.value,
      q2: event.target.q2.value,
      q3: event.target.q3.value
    };

    Frack.User.Update(profile.id, data).then(res => {
      console.log(res);
      Frack.User.GetByFilter("id=" + profile.id).then(res => {
        profiles[index] = res.data;
        this.setState({ edit: false, profiles: profiles });
      });
    });
  };

  foppesKnapp = () => {
    return [document.body.style.setProperty("font-family", "comicsans", "important"), document.body.style.setProperty("color", "rgb(255, 51, 136)", "important")]
  }

  render() {
    const CurrentUser = this.props.currentUser;
    if (this.state.index === -1) {
      return null;
    }
    if (!CurrentUser) {
      return null;
    }
    console.log(CurrentUser);
    let index = this.state.index;
    let profile = this.state.profiles[index];
    let next = this.findNext();
    let prev = this.findPrev();
    return (
      <div className='profile-page page typewriter_font'>
        {(this.state.loading ? <Loader loading={true} /> :
          <div>
            <div className='profile-contaner'>
              <div className='profile-box'>
                {/* top imgs */}
                <div className='profile-top-img profile-text-divider'>
                  <img
                    src='https://dvo-korfbal.nl/wp-content/uploads/2018/10/Top-secret.jpg'
                    width='100%'
                    alt=''
                  />
                  <ProfileImg
                    image={profile.profile_picture}
                    user={profile.username}
                  />
                  {/* <TopSecret />
                <img className='profile-img' src={profile.profile_picture} alt=""/>*/}
                </div>
                {/* buttons */}
                {// eslint-disable-next-line
                  (profile.username == "foppe") ? <button onClick={this.foppesKnapp} style={{ fontFamily: "comicsans", color: "rgb(255, 51, 136)" }}>Comic sans?</button> : null}
                <div className='profile-button-contaner'>
                  {prev !== -1 ? (
                    <button
                      className='profile-button profile-button-1'
                      onClick={() => this.swopUesr(prev)}>
                      {" "}
                      ◀ Förra{" "}
                    </button>
                  ) : null}
                  <div className='profile-button-2'>
                    {CurrentUser.username === profile.username ? (
                      <button
                        className='profile-button'
                        onClick={this.handelEditButton}>
                        {" "}
                        Edit profile{" "}
                      </button>
                    ) : null}
                    {CurrentUser.username === profile.username ? (
                      <button
                        className='profile-button'
                        onClick={this.handelEditPasswordButton}>
                        {" "}
                        Ändra Lösenord{" "}
                      </button>
                    ) : null}
                  </div>
                  {next !== -1 ? (
                    <button
                      className='profile-button profile-button-3'
                      onClick={() => this.swopUesr(next)}>
                      {" "}
                      Nästa ▶{" "}
                    </button>
                  ) : null}
                </div>
                {/* password form */}
                {this.state.editPassword ? (
                  <form onSubmit={this.changePassword}>
                    <label> Nytt lösenord: </label>
                    <input name='newPassword' type='password' /> <br />
                    <label>Bekräfta lösenord: </label>
                    <input name='confermPassword' type='password' /> <br />
                    <input type='submit' value='Ändra lösenord' />
                  </form>
                ) : null}
                {/* text */}
                <div className='profile-text-divider'>
                  <h4>Namn</h4>
                  <p>{profile.name}</p>
                  <h4>grupp</h4>
                  <p>
                    {profile.type.name !== "nØllan" ? (
                      <React.Fragment>{profile.type.name} </React.Fragment>
                    ) : null}
                    {profile.n0llegroup ? (
                      <React.Fragment>{profile.n0llegroup.name}</React.Fragment>
                    ) : null}
                  </p>
                </div>

                <form onSubmit={this.userUpdate}>
                  <div className='profile-text-divider'>
                    {profile.description || this.state.edit ? (
                      <React.Fragment>
                        <h4>Om</h4>
                        {!this.state.edit ? (
                          <p>{profile.description}</p>
                        ) : (
                            <input
                              placeholder='svar...'
                              defaultValue={profile.description}
                              name='description'
                              type='text'
                            />
                          )}
                      </React.Fragment>
                    ) : null}
                  </div>
                  <div className='profile-text-divider'>
                    {profile.q1 || this.state.edit ? (
                      <React.Fragment>
                        <h4>Fråga 1</h4>
                        {!this.state.edit ? (
                          <p>{profile.q1}</p>
                        ) : (
                            <input
                              placeholder='svar...'
                              type='text'
                              name='q1'
                              defaultValue={profile.q1}
                            />
                          )}
                      </React.Fragment>
                    ) : null}
                    {profile.q2 || this.state.edit ? (
                      <React.Fragment>
                        <h4>Fråga 2</h4>
                        {!this.state.edit ? (
                          <p>{profile.q2}</p>
                        ) : (
                            <input
                              placeholder='svar...'
                              type='text'
                              name='q2'
                              defaultValue={profile.q2}
                            />
                          )}
                      </React.Fragment>
                    ) : null}
                    {profile.q3 || this.state.edit ? (
                      <React.Fragment>
                        <h4>Fråga 3</h4>
                        {!this.state.edit ? (
                          <p>{profile.q3}</p>
                        ) : (
                            <input
                              placeholder='svar...'
                              type='text'
                              name='q3'
                              defaultValue={profile.q3}
                            />
                          )}
                      </React.Fragment>
                    ) : null}
                  </div>
                  {this.state.edit ? (
                    <input type='submit' value='Spara Ändringar' />
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
