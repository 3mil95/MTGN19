import React, { Component } from "react";
import "./Admin.css"
import Frack from "./../Frack";

class HanteraNollegrupp extends Component {
    state = {
        n0llegroup: []
    };

    componentDidMount() {
        window.scrollTo(0, 0)
        Frack.N0lleGroup.GetAll().then(res => {
            this.setState({ n0llegroup: res.data });
        });
    }

    newN0lleGroup = (event) => {
        event.preventDefault()
        var name = event.target.name.value;
        //Uppdatera backenden
        Frack.N0lleGroup.New({ name: name }).then((res) => {
            alert("Skapade ny n0llegrupp!")
            //Uppdatera frontenden
            const new_groups = this.state.n0llegroup;
            const new_group= {"id": res.data.group_id, "name": name}
            new_groups.push(new_group);
            this.setState({ n0llegroup: new_groups })

        });
    }

    saveN0lleGroup = (event) => {
        event.preventDefault()
        
        var id = event.target.name.id;
        var data = {
            name: event.target.name.value
        };
        //Uppdaterar backenden
       Frack.N0lleGroup.Update(id, data).then(function (res) {
           //Notifierar användaren
           alert("Ändringar sparade!")
        });
    }

    removeN0lleGroup = (group) => {
        var id = group.id
        //Uppdaterar backenden
        if(window.confirm('Är du säker på att du vill ta bort n0llegruppen?')){
            Frack.N0lleGroup.Delete(id).then((res) => {

            //Tar bort (uppdaterar) från frontenden
            const new_groups = this.state.n0llegroup;
            const i = new_groups.indexOf(group)
            new_groups.splice(i, 1)
            this.setState({ n0llegroup: new_groups })

        })}
    }


    render() {

        var handle_groups = <div>
                {this.state.n0llegroup.map((group) => {
                    return (
                        <form onSubmit={this.saveN0lleGroup} key={group.id} >
                            
                                <div >
                                    <label className="form_label" >Namn: </label>
                                    <input type="text" name="name" id={group.id} defaultValue={group.name} />
                                </div>
                                <br />
                                <div >
                                    <input type="submit"  value="Spara" />
                                    <button type="button" onClick={() => this.removeN0lleGroup(group)}>Ta bort</button>
                                </div>
                        </form>)
                })}
            <br />
            <h1 className="view_header">Skapa n0llegrupp</h1>
            <h4 className="form_label">Ny nØllegrupp</h4>
            <form  onSubmit={this.newN0lleGroup}>
                <label className="form_label">Namn: </label>
                <input type="text" name="name" />
                <br />
                <input type="submit" className="btn" value="Skapa"/>
            </form>
        </div>

        return (
            <div className="page">
                <h1 className="view_header">Hantera n0llegrupper</h1>
                {handle_groups}
            </div>
        );
    }
}

export default HanteraNollegrupp;
