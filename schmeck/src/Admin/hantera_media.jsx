import React, { Component } from "react";
import Frack from "./../Frack";
import "./Admin.css"
import Loader from "../loader";

class HanteraMedia extends Component {
    state = {
        events: [],
        loading: true
    };

    events = "";

    componentDidMount() {
        Frack.Event.GetAll().then(res => {
            this.setState({ events: res.data, loading: false });
        });
    }

    componentDidUpdate = () => {
        //this.update_events()

    }

    uploadMedia = (e) => {
        e.preventDefault();
        if (e.target.event.value.length > 0) {
            this.setState({ loading: true })
            // funktion för uppladning av bilder till servern
            var files = e.target.files.files;
            var week = e.target.week.value // veckan bilden togs
            var event = e.target.event.value // eventet bilden togs under
            var links = e.target.videos.value;
            var linkList = links.split(",");
            linkList = linkList.filter(v => v !== "");
            var form_data = new FormData();

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                form_data.append("files", file, file.name)
            }
            form_data.append("week", week);
            form_data.append("event", event);


            for (var j = 0; j < linkList.length; j++) {
                var link = linkList[j];
                form_data.append("videos", link);
            }

            Frack.Media.New(form_data).then((res) => {
                this.setState({ loading: false })
                this.props.history.push('/media')
            })

        }

        else {
            alert("Du måste skapa ett event först!")
        }

    };



    newType = (event) => {
        event.preventDefault()

        var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        var name = event.target.name.value
        var date = event.target.date.value
        let timestamp = new Date(Date.parse(date));
        timestamp = timestamp.toLocaleDateString('sv-SV', options)

        Frack.Event.New({ name: name, datetime: timestamp }).then((res) => {
            alert("Skapade nytt event " + name)
            Frack.Event.GetAll().then(res => {
                this.setState({ events: res.data, loading: false });
            });

        });
    }

    saveType = (event) => {
        event.preventDefault()
        this.setState({ loading: true });
        //var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }

        var name = event.target.name.value
        var date = event.target.date.value
        var id = event.target.id;

        var data = {
            name: name,
            datetime: date
        };

        Frack.Event.Update(id, data).then((res) => {
            Frack.Event.GetAll().then(res => {
                this.setState({ events: res.data, loading: false });
                alert("Ändringar sparade!")
            });
        });
    }

    removeType(id) {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            this.setState({ loading: true });
            Frack.Event.Delete(id).then((res) => {

                Frack.Event.GetAll().then(res => {
                    this.setState({ events: res.data, loading: false });
                    alert("Tog bort event!")
                });
            });
        }
    }

    update_events = () => {
        this.events = <div>
            {this.state.events.map((event) => {

                var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
                var date = event.datetime
                let timestamp = new Date(Date.parse(date));
                timestamp = timestamp.toLocaleDateString('sv-SV', options)

                return (
                    <form onSubmit={this.saveType} key={event.id} id={event.id}>

                        <label className="form_label" >Namn: </label>
                        <input type="text" name="name" defaultValue={event.name} />

                        <label className="form_label">Datum/tid: </label>
                        <input type="text" name="date" defaultValue={timestamp} />

                        <input type="submit" value="Spara" />
                        <button type="button" onClick={() => this.removeType(event.id)}>Ta bort</button>

                    </form>
                )
            })}
        </div>
    }


    render() {
        this.update_events()
        var new_event = <div>
            <h2 className="view_header" >Nytt event</h2>
            <form className="form-control" onSubmit={this.newType}>
                <label className="form_label">Namn: </label>
                <input type="text" name="name" className="form-control" />

                <label className="form_label">Datum/tid: </label>
                <input type="datetime-local" name="date" className="form-control" />

                <input type="submit" value="Skapa" />
            </form>

        </div>

        var media = <div>
            <form onSubmit={this.uploadMedia} className="user_block">
                <label className="form_label">Bilder:</label>
                <input type="file" name="files" multiple />
                <label className="form_label">Videor: (separera med ",")</label>
                <input name="videos" type="text" />
                <label className="form_label">Vecka</label>
                <select name="week">
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                </select>
                <label className="form_label">Event</label>
                <select name="event">
                    {this.state.events.map((event) => {
                        return (<option value={event.id} key={event.id}>{event.name}</option>)
                    })}
                </select>
                <input type="submit" value="Ladda upp" />
            </form>
        </div>

        return (
            <div className="page">
                {(this.state.loading ? <Loader loading={true} /> :
                    <div>
                        <h1 className="view_header">Ladda upp bild/video</h1>
                        {media}
                        <h1 className="view_header">Hantera event</h1>
                        {this.events}

                        {new_event}
                    </div>)}


            </div>
        );
    }
}

export default HanteraMedia;
