import React, { Component } from "react";
import ReactQuill, {Quill} from "react-quill";
import "react-quill/dist/quill.snow.css";
import '../News/News.css'
import Frack from "../Frack";
import "./Admin.css";


class Inlagg extends Component {
  /*
   * Simple editor component that takes placeholder text as a prop
   */
  constructor(props) {
    super(props);
    this.state = { editorHtml: "", theme: "snow", header: "", updating: false };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      Frack.News.GetByFilter(`id=${this.props.match.params.id}`).then((res) => {
        this.setState({editorHtml: res.data.text, header: res.data.headline, updating: true})
        console.log(res.data)
      })
    }
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  handleThemeChange(newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme });
  }

  handleUpdate = (event) => {
    event.preventDefault();
    console.log(this.state.header);
    let data = {
      author: Frack.CurrentUser,
      headline: event.target.header.value,
      tags: "",
      text: this.state.editorHtml
    };

    Frack.News.Update(this.props.match.params.id, data).then(res => {
      this.props.history.push("/nyheter");
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.header);
    let data = {
      author: Frack.CurrentUser,
      headline: event.target.header.value,
      tags: "",
      text: this.state.editorHtml
    };

    Frack.News.New(data).then(res => {
      this.props.history.push("/nyheter");
    });
  };

  handelHederChange = text => {
    this.setState({ header: text.value });
  };

  render() {
    return (
      <div className='page'>
        <form onSubmit={(this.state.updating) ? this.handleUpdate : this.handleSubmit}>
          <input type='text' name='header' placeholder='Rubrik' defaultValue={this.state.header}/>
          <CustomToolbar />
          <ReactQuill
            style={{ background: "#fff" }}
            theme={this.state.theme}
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={Inlagg.modules}
            formats={Inlagg.formats}
            bounds={".app"}
            placeholder={"text..."}
          />

          <input type='submit' value={(this.state.updating) ? 'Update' : 'Submit'}/>
        </form>
      </div>
    );
  }
}

const CustomToolbar = () => (
  <div id="toolbar" style={{background: "#b98d44"}}>
    <select className="ql-size" />
    <select className="ql-color" />
    <select className="ql-background" />
    <button class="ql-script" value="sub"></button>
    <button class="ql-script" value="super"></button>
    <button className="ql-list" value="bullet"></button>
    <button className="ql-list" value='ordered'></button>
    <select className="ql-align" />
    <button className="ql-link"></button>
    <button className="ql-image"></button>
    <button className="ql-video"></button>
    <button className="ql-insertNull">
        <span>Ø</span>
    </button>
  </div>
)
/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Inlagg.modules = {
  toolbar: {
    container: "#toolbar",
  handlers: {
    insertNull: insertNull,
    image: imageHandler
  }
},
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

function imageHandler() {
  var range = this.quill.getSelection();
  var value = prompt('What is the image URL');
  if (value) {
    this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
  }
}

function insertNull() {
  console.log("hej <3")
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "Ø");
  this.quill.setSelection(cursorPosition + 1);
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Inlagg.formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "align",
  "background",
  'script',
];



export default Inlagg;
