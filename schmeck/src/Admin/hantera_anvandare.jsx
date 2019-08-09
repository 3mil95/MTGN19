import React, { Component } from "react";
import Frack from "./../Frack";
import axios from "axios";
import "./Admin.css";
import Loader from "../loader"

class Anvandare extends Component {
    state = {
        types: [],
        n0llegroup: [],
        users: [],
        currentUser: "",
        loading: true
    };

    update_user = "";
    password = "lösenord1";

    componentDidMount = () => {
        window.scrollTo(0, 0)
        Frack.UserType.GetAll().then(res => {
            this.setState({ types: res.data });
        });
        Frack.N0lleGroup.GetAll().then(res => {
            this.setState({ n0llegroup: res.data });
        });

        Frack.User.GetAll().then(res => {
            this.setState({ users: res.data, loading: false });
        });


    }

    componentDidUpdate = () => {
        this.handle_usersHTML()
    }

    submitNewUser = (e) => {
        e.preventDefault()
        let name = e.target.username.value
        let username = e.target.username.value
        // eslint-disable-next-line
        if (e.target.n0llegroup.value == '-1' && e.target.usertype.value == 1) {
            alert("n0llan tillhör ingen n0llegrupp och n0llan är vilsen utan den!")
        }
        else {
            this.setState({ loading: true })
            // eslint-disable-next-line
            if (e.target.usertype.value == "1") {
                name += "-nØllan";
                username += "-nollan";
            }
            username = username.toLowerCase();

            var Password = this.password;
            var data = {
                name: name,
                username: username,
                password: Password,
                type_id: e.target.usertype.value
            };
            // eslint-disable-next-line
            if (e.target.n0llegroup.value != -1) {
                data["n0llegroup_id"] = e.target.n0llegroup.value;
            }
            //Uppdaterar frontenden
            Frack.User.New(data).then((res) => {
                alert("Skapat ny användare. ", res.data);
                Frack.User.GetAll().then(res => {
                    this.setState({ users: res.data, loading: false });
                })

            })
        }
    }

    saveUser = (user) => {
        user.preventDefault();
        this.setState({ loading: true })
        var id = user.target.username.id
        var data = {
            username: user.target.username.value,
            name: user.target.name.value,
            type_id: user.target.type.value,
            admin: user.target.admin.checked,
            hidden: user.target.hidden.checked,
        };
        // eslint-disable-next-line
        if (user.target.n0llegrupp.value != '-1') {
            data["n0llegroup_id"] = user.target.n0llegrupp.value;
        }
        else {
            // eslint-disable-next-line
            if (user.target.type.value == 1) {
                alert("OBS! n0llan tillhör ingen n0llegrupp!")
            }
        }

        var profilePicutureRequest = [];

        if (user.target.file.value.length > 0) {
            var file = user.target.file.files[0];
            var formData = new FormData();
            formData.append("image", file);

            profilePicutureRequest.push(axios({
                method: "post",
                url: `/api/upload_profile_picture/${id}`,
                data: formData,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
                }
            }).catch(function (error) {
                console.error(error);
            }));
        }

        axios.all(profilePicutureRequest).then((responses) => {
            if (responses.length > 0) {
                data["profile_picture"] = responses[0].data.url;
            }

            Frack.User.Update(id, data).then((res) => {
                Frack.User.GetAll().then(res => {
                    this.setState({ users: res.data, loading: false });
                    alert("Ändringar sparade!")
                })
            });
        })

    }

    removeUser = (user) => {
        var id = user.id
        if (window.confirm('Är du säker på att du vill ta bort användaren?')) {
            this.setState({loading: true})
            //Uppdaterar backenden
            Frack.User.Delete(id).then((res) => {
                //Uppdaterar frontenden
                const new_users = this.state.users;
                const i = new_users.indexOf(user)
                new_users.splice(i, 1)
                this.setState({ users: new_users, loading: false })
            })
        }
    }

    userResetPassword = (id) => {
        var newPassword = this.password;

        if (window.confirm('Är du säker på att du vill nollställa lösenordet?')) {
            //Uppdaterar backenden
            Frack.User.Update(id, { password: newPassword }).then((res) => {
                alert("Nollställt lösenord till: " + newPassword)
            })
        };
    }

    handle_usersHTML = () => {
        //Form(HTML) för att uppdatera användare
        this.update_user =
            <div className="admin_block">
                <h1 className="view_header">Hantera användare</h1>
                <div className="admin_container" id="user_list">

                    {this.state.users.map((user) => {
                        return (
                            <div className="user_block" key={user.id}>
                                <img className="prof_pic_admin" src={user.profile_picture} alt="" />
                                <form onSubmit={this.saveUser} >
                                    <div id={user.id} className="user_grid">

                                        <label className="form_label">Användarnamn: </label>
                                        <input type="text" name="username" id={`${user.id}`} defaultValue={user.username} />

                                        <label className="form_label">Namn: </label>
                                        <input type="text" name="name" defaultValue={user.name} />

                                        <label className="form_label">Typ: </label>
                                        <select name="type" defaultValue={user.type.id}>
                                            {this.state.types.map((type) => {
                                                return (<option key={type.id} value={type.id}>{type.name}</option>)
                                            })}
                                        </select>

                                        <label className="form_label">nØllegrupp: </label>

                                        <select name="n0llegrupp" defaultValue={(user.n0llegroup) ? (user.n0llegroup.id) : "-1"}>
                                            <option value="-1">Ingen</option>
                                            {this.state.n0llegroup.map((group) => {
                                                return (<option key={group.id} value={group.id}>{group.name}</option>)
                                            })}
                                        </select>

                                        <label className="form_label">Admin: </label>
                                        <input name="admin" type="checkbox" defaultChecked={user.admin} />

                                        <label className="form_label">Dold: </label>
                                        <input name="hidden" type="checkbox" defaultChecked={user.hidden} />

                                        <label className="form_label">Ny profilbild: </label>

                                        <input name="file" type="file" id={`input_picture_${user.id}`} />

                                        <br />
                                        <div className="buttons">
                                            <input type="submit" className="btn" value="Spara" />
                                            <button type="button" className="btn" onClick={() => this.userResetPassword(user.id)}>Återställ lösenord</button>
                                            <button type="button" className="btn" value={user.id} onClick={() => this.removeUser(user)}>Ta bort</button>
                                        </div></div>
                                </form>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
    }

    render() {
        this.handle_usersHTML()
        //Form(HTML) för att skapa användare
        var create_user = <div className="admin_block">
            <h1 className="view_header">Skapa användare</h1>
            <form className="form-group user_block" onSubmit={this.submitNewUser}>
                <label className="form_label">Namn: </label>
                <input type="text" className="form-control" placeholder="Namn" name="username" />
                <label className="form_label">Användartyp: </label>
                <select className="form-control" name="usertype">

                    {this.state.types.map((type) => {
                        return (<option key={type.id} value={type.id}>{type.name}</option>)
                    })}

                </select>
                <label className="form_label">nØllegrupp: </label>
                <select className="form-control" name="n0llegroup">
                    <option value="-1">Ingen</option>
                    {this.state.n0llegroup.map((group) => {
                        return (<option key={group.id} value={group.id}>{group.name}</option>)
                    })}

                </select>
                <br />
                <input type="submit" className="buttons" value="Skapa ny användare" />
            </form>
        </div>



        return (
            <div className="page">
                {(this.state.loading ? <Loader loading={true} /> :
                    <div>
                        {create_user}
                        {this.update_user}
                    </div>)}
            </div>
        );
    }
}

export default Anvandare;
