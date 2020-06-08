from app.models.user import User, UserType, N0lleGroup
from app import db
from PIL import Image as Img
from flask import jsonify, g
import os, uuid

def upload_profile_picture(image, id):
    ALLOWED_EXTENTIONS = ['.png', '.jpg', '.jpeg'] 
    original_filename, extension = os.path.splitext(image.filename)
    filename = str(uuid.uuid4()) + extension
    if extension in ALLOWED_EXTENTIONS:
        path = os.path.join("static", "images", "profiles", filename)
        local_path = os.path.join(os.getcwd(), path)
        user = User.query.filter(User.id == id).first()
        print(user)
        image.save(local_path)
        user.profile_picture = resize_profile_picture(local_path, filename)
        db.session.add(user)
        db.session.commit()
        url = "/" + path
        return jsonify({"url": url})
    else:
        return jsonify({"message": "invalid file type"}),401

def resize_profile_picture(filePath, filename):
    im = Img.open(filePath)
    size = (512, 512) # thumbnail-storleken
    filename = filename.split(".")[0]
    outfile = os.path.splitext(im.filename)[0]
    try:
        im.thumbnail(size)
        im.save(outfile +".jpg")
    except IOError:
        print("en liten fuck wucky")

    print(outfile)
    return  outfile + ".jpg"

## USERS
def get_all_users():
    user_list = User.query.all()
    res_list = []
    for user in user_list:
        res_list.append(user.to_dict())
    return jsonify(res_list)

def get_user_by_filter(filter):
    user_list = User.query.filter_by(**filter.to_dict()).all()

    if len(user_list) == 1:
        return jsonify(user_list[0].to_dict())

    res_list = []
    for user in user_list:
        res_list.append(user.to_dict())
    return jsonify(res_list)

def add_user(data):
    if g.user.admin:
        n0llegroup = None

        if "n0llegroup_id" in data:
            n0llegroup = N0lleGroup.query.get(data["n0llegroup_id"])


        u = User(data["username"], data["name"], data["password"], UserType.query.get(data["type_id"]), n0llegroup)
        db.session.add(u)
        db.session.commit()

        return jsonify({"usr_id": u.id}), 200
    else:
        return jsonify({"message": "unauthorized"}), 401

def delete_user(filter):
    if g.user.admin:
        users = User.query.filter_by(**filter.to_dict())
        user_count = users.count()
        users.delete()
        db.session.commit()
        return jsonify({"count": user_count}), 200
    else:
        return jsonify({"message": "unauthorized"}), 401

def edit_user(filter, data):
    users = User.query.filter_by(**filter.to_dict())
    user_count = users.count()
    for user in users:
        if g.user.admin or g.user.id == user.id:
            if "username" in data:
                user.username = data["username"]
            if "name" in data:
                user.name = data["name"]
            if "password" in data:
                user.set_password(data["password"])
            if "type_id" in data and g.user.admin:
                user.user_type = UserType.query.get(data["type_id"])
            if "n0llegroup_id" in data and g.user.admin:
                user.n0llegroup = N0lleGroup.query.get(data["n0llegroup_id"])
            if "admin" in data and g.user.admin:
                user.admin = data["admin"]
            if "hidden" in data and g.user.admin:
                user.hidden = data["hidden"]
            if "profile_picture" in data:
                user.profile_picture = data["profile_picture"]
            if "description" in data:
                user.description = data["description"]
            if "q1" in data:
                user.q1 = data["q1"]
            if "q2" in data:
                user.q2 = data["q2"]
            if "q3" in data:
                user.q3 = data["q3"]
        else:
            return jsonify({"message": "unauthorized"}), 401
    db.session.commit()
    return jsonify({"count": user_count}), 200

## TYPES
def get_all_types():
    type_list = UserType.query.all()
    res_list = []
    for type in type_list:
        res_list.append(type.to_dict())
    return jsonify(res_list)

def get_type_by_filter(filter):
    type_list = UserType.query.filter_by(**filter.to_dict()).all()

    if len(type_list) == 1:
        return jsonify(type_list[0].to_dict())

    res_list = []
    for type in type_list:
        res_list.append(type.to_dict())
    return jsonify(res_list)

def add_type(data):
    if g.user.admin:
        t = UserType(data["name"])
        db.session.add(t)
        db.session.commit()

        return jsonify({"type_id": t.id}), 200
    else:
        return jsonify({"message": "unauthorized"}), 401

def delete_type(filter):
    if g.user.admin:
        types = UserType.query.filter_by(**filter.to_dict())
        type_count = types.count()
        types.delete()
        db.session.commit()
        return jsonify({"count": type_count}), 200
    else:
        return jsonify({"message": "unauthorized"}), 401

def edit_type(filter, data):
    types = UserType.query.filter_by(**filter.to_dict())
    type_count = types.count()
    for type in types:
        if g.user.admin:
            if "name" in data:
                type.name = data["name"]
        else:
            return jsonify({"message": "unauthorized"}), 401
    db.session.commit()
    return jsonify({"count": type_count}), 200


## N0LLEGROUPS

def get_all_groups():
    group_list = N0lleGroup.query.all()
    res_list = []
    for group in group_list:
        res_list.append(group.to_dict())
    return jsonify(res_list)

def get_group_by_filter(filter):
    group_list = N0lleGroup.query.filter_by(**filter.to_dict()).all()

    if len(group_list) == 1:
        return jsonify(group_list[0].to_dict())

    res_list = []
    for group in group_list:
        res_list.append(group.to_dict())
    return jsonify(res_list)

def add_group(data):
    if g.user.admin:
        group = N0lleGroup(data["name"])
        db.session.add(group)
        db.session.commit()

        return jsonify({"group_id": group.id}), 200
    else:
        return jsonify({"message": "unauthorized"}), 401

def delete_group(filter):
    if g.user.admin:
        groups = N0lleGroup.query.filter_by(**filter.to_dict())
        group_count = groups.count()
        groups.delete()
        db.session.commit()
        return jsonify({"count": group_count}), 200
    else:
        return jsonify({"message": "unauthorized"}), 401

def edit_group(filter, data):
    groups = N0lleGroup.query.filter_by(**filter.to_dict())
    group_count = groups.count()
    for group in groups:
        if g.user.admin:
            if "name" in data:
                group.name = data["name"]
        else:
            return jsonify({"message": "unauthorized"}), 401
    db.session.commit()
    return jsonify({"count": group_count}), 200
