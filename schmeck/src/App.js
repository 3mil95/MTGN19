import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Home from './Home/Home';
import Profiles from './Profiles/Profiles';
import Schedule from './Schedule/Schedule';
import News from './News/News';
import Admin from './Admin/Admin';
import Media from './Media/Media';
import Navigation from './Navigation/Navigation';
import Blandaren from './Blandaren/Blandaren'
import ProtectedRoute from './ProtectedRoute';
import Login from './Login/Login';
import Footer from './Footer/Footer';
import Profile from './Profile/Profile'
import Frack from './Frack';
import Anvandare from './Admin/hantera_anvandare'
import Anvandartyper from './Admin/hantera_anvandartyper'
import HanteraBlandaren from './Admin/hantera_blandaren'
import HanteraMedia from './Admin/hantera_media'
import Inlagg from './Admin/inlagg'
import HanteraNollegrupp from './Admin/hantera_nollegrupper'
import HanteraInlagg from './Admin/hantera_inlagg';

class App extends Component {
  state = {
    currentUser: null
  }

  componentDidMount() {
    //console.log("Mount App") 
    this.UpdateCurrentUser()
  }

  UpdateCurrentUser = () => {
    //console.log("UpdateCurrentUser...")
    Frack.UpdateCurrentUser().then(() => {
      this.setState({
        currentUser: Frack.CurrentUser
      })
    })
  }

  login = () => {
    //console.log("login...")
    this.UpdateCurrentUser()
  } 

  render() {
  //console.log(this.state.currentUser)
  Frack.UpdateCurrentUser().catch((res) =>  {Frack.Logout();})
  return (
    <div className="App">
      <Router>     
        <Route path="/" render={(props) => <Navigation {...props} currentUser={this.state.currentUser}/>}/>  
        <Switch>
          <ProtectedRoute path="/" exact component={Home} currentUser={this.state.currentUser}/>
          <ProtectedRoute path="/profiler/:user" exact component={Profile} currentUser={this.state.currentUser}/>
          <ProtectedRoute path="/profiler" exact component={Profiles} currentUser={this.state.currentUser}/>
          <ProtectedRoute path="/schema" exact component={Schedule} currentUser={this.state.currentUser}/>
          <ProtectedRoute path="/nyheter" exact component={News} currentUser={this.state.currentUser}/>
          <ProtectedRoute path="/media" exact component={Media} currentUser={this.state.currentUser}/>
          <ProtectedRoute path="/blandaren" exact component={Blandaren} currentUser={this.state.currentUser}/>

          <ProtectedRoute path="/admin" exact adminOnly={true} component={Admin} currentUser={this.state.currentUser}/>
          <ProtectedRoute path="/admin/anvandare" exact adminOnly={true} component={Anvandare} currentUser={this.state.currentUser}/>
          <ProtectedRoute path="/admin/anvandartyper" exact adminOnly={true} component={Anvandartyper} currentUser={this.state.currentUser}/>
          <ProtectedRoute path="/admin/blandaren" exact adminOnly={true} component={HanteraBlandaren} currentUser={this.state.currentUser}/>
          <ProtectedRoute path="/admin/media" exact adminOnly={true} component={HanteraMedia} currentUser={this.state.currentUser}/>
          <ProtectedRoute path="/admin/inlagg" exact adminOnly={true} component={Inlagg} currentUser={this.state.currentUser}/>
          <ProtectedRoute path="/admin/inlagg/update/:id" exact adminOnly={true} component={Inlagg} currentUser={this.state.currentUser}/>
          <ProtectedRoute path="/admin/inlagg/hantera" exact adminOnly={true} component={HanteraInlagg} currentUser={this.state.currentUser}/>
          <ProtectedRoute path="/admin/n0llegrupper" exact adminOnly={true} component={HanteraNollegrupp} currentUser={this.state.currentUser}/>

          <Route path="/login" render={(props) => <Login {...props} login={this.login}/>}/>
          <Route path="*" render={() => (<div className="page"><img width='60%' src='https://http.cat/404'/></div>)
            }/>
        </Switch>
        <Route path="/" component={Footer} />
      </Router>
    </div>
  );
  }
}

export default App;
