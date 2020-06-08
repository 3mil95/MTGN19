import os
from sqlalchemy import desc, asc
from app.models.blandaren import Document
from app import db
from flask import jsonify, g
import sys
import base64


SAVE_FOLDER = os.path.join(os.getcwd(), "static", "blandaren")

def upload_document(request):
    files = request.files.getlist("files")
    
    if files is not None:
        for document in files:
            filename = document.filename
            filename = filename.replace(" ", "_")
            #print(filename)
            thumb_name = filename.split(".")[0] +".png"
            thumbnail = request.form["thumbnail"]
            #print(request.form["title"], file=sys.stdout)
            title = request.form["title"]
            with open(os.path.join(SAVE_FOLDER, thumb_name), "wb") as fh:
                fh.write(base64.b64decode(thumbnail))
            document.save(os.path.join(SAVE_FOLDER, filename))
            new_doc = Document(filename = filename, thumbnail = thumb_name, title=title)
            db.session.add(new_doc)
    db.session.commit()
    sys.stdout.flush()
    return True

def get_documents():
    output = []
    docs = Document.query.all()
    for result in docs:
        doc_dict = result.as_dictionary()
        output.append(doc_dict)
    
    return output


def delete_document(id):
    print("Inne i delete funktionen")
    print("id: ", id)
    Document.query.filter(Document.id == id).delete()
    db.session.commit()
    return jsonify({"message": "Bländaren med ID: " + id +" raderades!"})
    
