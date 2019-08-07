#Importera moduler
from app import app
from flask import jsonify, request, send_from_directory, g
import json
from app import db
import os
from app.models.news import News
import app.news_functions as news_functions
import app.image_functions as image_functions
import app.user_functions as user_functions
import app.document_functions as document_functions
import app.event_functions as event_functions
from sqlalchemy import desc
from app.authentication import requires_auth, requires_auth_token, check_auth
import uuid
from app.daily_message import get_daily_messange_json

STATIC_DIR = os.path.join(os.getcwd(), "static")


#Definiera olika URL-er och vad de leder till
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return send_from_directory(os.getcwd(), "index.html")

"""
@app.route("asset-manifest.json")
def asset_manifest():
    return send_from_directory(os.getcwd(), "asset_manifest.json")

@app.route("favicon.ico")
def favicon():
    return send_from_directory(os.getcwd(), "favicon.ico")

@app.route("<file>.js")
def service_worker(file):
    return send_from_directory(os.getcwd(), file + ".js")
"""

# På servern är det bättre att en "riktig" web server som Nginx sköter statiska filer
if app.config["DEBUG"]:
    #ladda CSS
    @app.route("/static/css/<filename>")
    def get_css(filename):
        return send_from_directory(os.path.join(STATIC_DIR, "css"), filename)

    #ladda JavaScript
    @app.route("/static/js/<filename>")
    def get_js(filename):
        return send_from_directory(os.path.join(STATIC_DIR, "js"), filename)

    #ladda templates
    @app.route("/static/templates/<filename>")
    def get_templates(filename):
        return send_from_directory(os.path.join(STATIC_DIR, "templates"), filename)

    @app.route("/static/images/<filename>")
    def get_profile_images(filename):
        return send_from_directory(os.path.join(STATIC_DIR, "images"), filename)

    @app.route("/static/images/profiles/<filename>")
    def get_images(filename):
        return send_from_directory(os.path.join(STATIC_DIR, "images", "profiles"), filename)


    #ladda media (bild, film, osv)
    @app.route("/static/media/<file_path>")
    def get_media(file_path):
        return send_from_directory(os.path.join(STATIC_DIR, "media"), file_path)

    @app.route("/static/blandaren/<file_path>")
    def get_blandaren(file_path):
        return send_from_directory(os.path.join(STATIC_DIR, "blandaren"), file_path)

    @app.route("/static/uploads/<file_path>")
    def get_uploads(file_path):
        return send_from_directory(os.path.join(STATIC_DIR, "uploads"), file_path)

@app.route("/api/blandaren", methods = ["GET", "POST", "DELETE"])
def blandar_route():
    id = request.args.get("id")
    if request.method == "POST":
        document_functions.upload_document(request)
        return jsonify({"message":"fil(er) laddades upp!"}), 200
    if request.method == "GET":
        document_response = document_functions.get_documents()
        print(document_response)
        return jsonify(document_response), 200
    if request.method == "DELETE":
        document_functions.delete_document(id)
        return jsonify({"Message":"Bländaren raderades!"}), 200


@app.route("/api/media/", methods = ["GET", "POST", "DELETE"]) #Hämta media eller ladda upp media
def media_path():
    week_filter = request.args.get("week")
    event_filter = request.args.get("event")
    type_filter = request.args.get("type")
    uploader_filter = request.args.get("uploader")
    if week_filter is None and event_filter is None and type_filter is None and uploader_filter is None:
        if request.method == "GET":
            image_response = image_functions.get_media()
            return jsonify(image_response), 200
        if request.method == "POST":
            image_functions.upload_media(request)
            return jsonify({"Message":"Bild(er) laddades upp!"}), 200
        if request.method == "DELETE":
            image_functions.delete_media(request)
            return jsonify({"Message":"Media raderades!"}), 200
    else:
        image_response = image_functions.get_media(week_filter = week_filter, event_filter = event_filter, media_type = type_filter, uploaded_by=uploader_filter)
        return jsonify(image_response), 200

@app.route("/api/event/", methods=["GET", "POST", "DELETE", "PUT"])
@requires_auth_token
def event_route():
    if request.method == "GET":
        if len(request.args) > 0:
            return event_functions.get_event_by_filter(request.args)
        else:
            return event_functions.get_all_events()
    elif request.method == "POST":
        return event_functions.add_event(request.json)
    elif request.method == "DELETE":
        return event_functions.delete_event(request.args)
    elif request.method == "PUT":
        return event_functions.edit_event(request.args, request.json)


@app.route("/api/news/", methods=["GET", "POST", "DELETE", "PUT"])
@requires_auth_token
def news_route():
    id = request.args.get("id")
    if request.method == "GET":
        if id == None:
            return news_functions.get_all_news()
        else:
            return news_functions.get_news_by_id(id), 201
    elif request.method == "POST":
        return news_functions.add_news(request.json), 200
    elif request.method == "DELETE":
        return news_functions.delete_news(id), 200
    elif request.method == "PUT":
        return news_functions.edit_news(id, request.json), 201

@app.route("/api/user/", methods=["GET", "POST", "DELETE", "PUT"])
@requires_auth_token
def user_route():
    if request.method == "GET":
        if len(request.args) > 0:
            return user_functions.get_user_by_filter(request.args)
        else:
            return user_functions.get_all_users()
    elif request.method == "POST":
        return user_functions.add_user(request.json)
    elif request.method == "DELETE":
        return user_functions.delete_user(request.args)
    elif request.method == "PUT":
        return user_functions.edit_user(request.args, request.json)

@app.route("/api/user_type/", methods=["GET", "POST", "DELETE", "PUT"])
@requires_auth_token
def user_type_route():
    if request.method == "GET":
        if len(request.args) > 0:
            return user_functions.get_type_by_filter(request.args)
        else:
            return user_functions.get_all_types()
    elif request.method == "POST":
        return user_functions.add_type(request.json)
    elif request.method == "DELETE":
        return user_functions.delete_type(request.args)
    elif request.method == "PUT":
        return user_functions.edit_type(request.args, request.json)

@app.route("/api/n0llegroup/", methods=["GET", "POST", "DELETE", "PUT"])
@requires_auth_token
def user_group_route():
    if request.method == "GET":
        if len(request.args) > 0:
            return user_functions.get_group_by_filter(request.args)
        else:
            return user_functions.get_all_groups()
    elif request.method == "POST":
        return user_functions.add_group(request.json)
    elif request.method == "DELETE":
        return user_functions.delete_group(request.args)
    elif request.method == "PUT":
        return user_functions.edit_group(request.args, request.json)

@app.route("/api/upload_profile_picture/<id>", methods=["POST"])
@requires_auth_token
def profile_picture_route(id):
    if g.user.admin:
        if "image" in request.files:
            image = request.files["image"]
            res = user_functions.upload_profile_picture(image, id)
            return res
        else:
            return jsonify({"message": "invalid"}), 400
    else:
        return jsonify({"message": "unauthorized"}), 401

@app.route("/api/upload_file/", methods=["POST"])
@requires_auth_token
def upload_file_route():
    if g.user.admin:
        if "file" in request.files:
            f = request.files["file"]
            original_filename, extension = os.path.splitext(f.filename)
            filename = str(uuid.uuid4()) + extension
            path = os.path.join("static", "images", "profiles", filename)
            local_path = os.path.join(os.getcwd(), path)
            id = request.args.get("id")
            print(id)
            f.save(local_path)


            return jsonify({"url": "/" + path})
        else:
            return jsonify({"message": "invalid"}), 400
    else:
        return jsonify({"message": "unauthorized"}), 401

@app.route("/api/dailymessage", methods=["GET"])
def get_daily_message():
    return get_daily_messange_json()

@app.route("/api/currentUser/", methods=["GET"])
@requires_auth_token
def current_user():
    return g.user.to_json()

@app.route('/api/token')
@requires_auth
def get_auth_token():
    token = g.user.generate_auth_token()
    return jsonify({ 'token': token.decode('ascii') })

@app.route('/api/checkToken', methods=["POST"])
def check_token():
    return jsonify({"valid": check_auth(request.json["token"], "", True)})

@app.route("/api/hemlig")
@requires_auth_token
def hemlig():
    return "Välkommen " + g.user.username + "!"
