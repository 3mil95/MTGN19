import React, { Component } from "react";
import pdfjsLib from 'pdfjs-dist/build/pdf';
import Frack from "./../Frack";
import "./Admin.css";
import Loader from "../loader";

class HanteraBlandaren extends Component {
    state = {
        loading: false
    };

    uploadDocument = (event) => {
        event.preventDefault()
        this.setState({ loading: true })

        var files = event.target.file.files;
        var form_data = new FormData();

        for (var j = 0; j < files.length; j++) {
            var file = files[j];
            form_data.append("files", file, file.name);
        }
        this.generateThumbNail(files, form_data, event.target.blandar_title.value)

    };

    generateThumbNail = (fileList, form_data, title) => {
        pdfjsLib.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.js";
        //var pdfWorker = new pdfjsLib.PDFWorker();
        //var DOC_URL = "/static/blandaren/";
        //var title = title;
        console.log("Skapar thumbnail..")
        for (var i = 0; i < fileList.length; i++) {
            var docObj = fileList[i];
            var fileReader = new FileReader();
            //var pdf_file = docObj.filename;
            fileReader.readAsDataURL(docObj)
            fileReader.onload = (event) => {
                //var typedArray = new Uint8Array(event.target.result);
                console.log(event.target.result)
                pdfjsLib.getDocument(event.target.result).then((pdf) => {
                    pdf.getPage(1).then((page) => {
                        console.log("Hämtar första sidan...")
                        var viewport = page.getViewport(0.5);
                        var canvas = document.createElement('canvas');
                        var ctx = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        var renderContext = {
                            canvasContext: ctx,
                            viewport: viewport
                        };
                        page.render(renderContext).promise.then(() => {
                            // Draw behind current content
                            ctx.globalCompositeOperation = "destination-over";
                            // Set background color
                            ctx.fillStyle = "#fff";
                            // Draw on entire canvas
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            // Create image from canvas
                            var img_src = canvas.toDataURL("image/png");
                            img_src = img_src.split(",")[1];
                            form_data.append("thumbnail", img_src)
                            form_data.append("title", title)
                            console.log("Laddar upp..")
                            Frack.Blandaren.New(form_data).then((res) => {
                                this.setState({ loading: false })
                                //alert("Bländaren was successfully uploaded")
                                this.props.history.push('/blandaren')
                            }).catch((error) => {
                                console.error(error)
                                this.setState({loading: false})
                            })

                        })
                    })
                })
            }
        }

    };


    render() {

        return (
            <div className="page">
                {(this.state.loading ? 
                <Loader loading={true} /> :
                    <div>
                        <h1 className="view_header">Ladda upp bländaren</h1>
                        <h2 className="form_label">Filer:</h2>
                        <br />
                        <form onSubmit={this.uploadDocument}>
                            <input type="file" name="file" />
                            <br />
                            <input type="text" name="blandar_title" defaultValue="Insert name..." />
                            <br />

                            <input type="submit" value="Ladda upp" />
                        </form>
                    </div>
                )}
            </div>
        );
    }
}

export default HanteraBlandaren;
