from app.models.event import Event
from app import db
from flask import jsonify, g
from datetime import datetime

def get_all_events():
    type_list = Event.query.all()
    res_list = []
    for type in type_list:
        res_list.append(type.to_dict())
    return jsonify(res_list)

def get_event_by_filter(filter):
    type_list = Event.query.filter_by(**filter.to_dict()).all()

    if len(type_list) == 1:
        return jsonify(type_list[0].to_dict())

    res_list = []
    for type in type_list:
        res_list.append(type.to_dict())
    return jsonify(res_list)

def add_event(data):
    if g.user.admin:
        dt = datetime.strptime(data["datetime"], "%Y-%m-%d %H:%M")
        t = Event(data["name"], dt)
        db.session.add(t)
        db.session.commit()

        return jsonify({"event_id": t.id}), 200
    else:
        return jsonify({"message": "unauthorized"}), 401

def delete_event(filter):
    if g.user.admin:
        types = Event.query.filter_by(**filter.to_dict())
        type_count = types.count()
        types.delete()
        db.session.commit()
        return jsonify({"count": type_count}), 200
    else:
        return jsonify({"message": "unauthorized"}), 401

def edit_event(filter, data):
    types = Event.query.filter_by(**filter.to_dict())
    type_count = types.count()
    for type in types:
        if g.user.admin:
            if "name" in data:
                type.name = data["name"]
                if "datetime" in data:
                    type.datetime = datetime.strptime(data["datetime"], "%Y-%m-%d %H:%M")
        else:
            return jsonify({"message": "unauthorized"}), 401
    db.session.commit()
    return jsonify({"count": type_count}), 200
