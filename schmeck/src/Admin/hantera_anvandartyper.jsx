import React, { Component } from "react";
import Frack from "./../Frack";
import "./Admin.css"
class Anvandartyper extends Component {
    state = {
        types: []
    };

    componentDidMount() {
        window.scrollTo(0, 0)
        Frack.UserType.GetAll().then(res => {
            this.setState({ types: res.data });
        });

    }


    newType = (event) => {
        event.preventDefault()

        //Uppdatera backenden
        var name = event.target.name.value;

        Frack.UserType.New({ name: name }).then((res)=> {
            alert("Skapat ny typ!")
            //Uppdatera frontenden
            const new_types = this.state.types;
            const new_type= {"id": res.data.type_id, "name": name}
            new_types.push(new_type);
            this.setState({ types: new_types })

        });

    }

    saveType = (event) => {
        event.preventDefault()
        var id = event.target.name.id;
        var data = {
            name: event.target.name.value
        };

        Frack.UserType.Update(id, data).then(function (res) {
            alert("Ändringar sparade!")
        });

    }

    removeType = (type) => {
        var id = type.id
        //Tar bort från backenden
        if (window.confirm('Är du säker på att du vill ta bort användartypen?')) {
            Frack.UserType.Delete(id).then((res) => {

                //Tar bort (uppdatera) från frontenden
                const new_types = this.state.types;
                const i = new_types.indexOf(type)
                new_types.splice(i, 1)
                this.setState({ types: new_types })

            })
        };

    }

    render() {

        var hantera_typer = <div>
            <ul className="list-group" id="type_list">

                {this.state.types.map((type) => {
                    return (
                        <form onSubmit={this.saveType} key={type.id}>
                            <li className="list-group-item" id="type_{{id}}">
                                <div className="d-flex w-100 justify-content-between">
                                    <label className="form_label">Namn: </label>
                                    <input type="text" name="name" id={type.id} className="inline_type_edit_input" defaultValue={type.name} />
                                </div>
                                <br />
                                <div className="d-flex w-100 justify-content-between">
                                    <input type="submit" className="btn btn-primary btn-sm" value="Spara" />
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => this.removeType(type)}>Ta bort</button>
                                </div>
                            </li>
                        </form>
                    )
                })}

            </ul>
            <br />
            <h1 className="view_header">Skapa användartyper</h1>
            <h4 className="form_label">Ny användartyp</h4>
            <form className="form-control" onSubmit={this.newType}>
                <label className="form_label">Namn: </label>
                <input type="text" name="name" id="new_type_name" className="form-control" />
                <br />
                <input type="submit" className="btn btn-primary" value="Skapa" />
            </form>
        </div>
        return (
            <div className="page">

                <h1 className="view_header">Hantera användartyper</h1>

                {hantera_typer}
            </div>
        );
    }
}

export default Anvandartyper;
