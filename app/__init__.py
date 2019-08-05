from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('flask.cfg')
db = SQLAlchemy(app)

from app import routes

if app.config["DEBUG"]:
    from app.models.news import News
    from app.models.user import User, UserType, N0lleGroup
    from app.models.event import Event
    from app.models.video import Video
    from app.models.image import Image
    db.drop_all()
    db.create_all()

    userTypeN0llan = UserType(name="nØllan")
    userTypeKph = UserType(name="KPH")
    userTypeInpho = UserType(name="INPHO")
    userTypeArr = UserType(name="ARR")
    userTypeLek = UserType(name="LEK")
    userTypeOph = UserType(name="ÖPH")
    userTypeVraque = UserType(name="VRAQUE")
    userTypeRsa = UserType(name="RSA")

    db.session.add(userTypeN0llan)
    db.session.add(userTypeKph)
    db.session.add(userTypeInpho)
    db.session.add(userTypeArr)
    db.session.add(userTypeLek)
    db.session.add(userTypeOph)
    db.session.add(userTypeVraque)
    db.session.add(userTypeRsa)

    adminUser = User("admin", "Admin", "hamburgare23", userTypeInpho)
    adminUser.admin = True
    adminUser.hidden = True
    """
    magikarparna = N0lleGroup(name="Magi-Karparna")
    krangligaKrabban = N0lleGroup(name="Krångliga Krabban")
    hasten = N0lleGroup(name="Trojanska Häztääen")

    joppe = User("joppe", "Joppe", "potatis", userTypeInpho, magikarparna)
    joppe.profile_picture = "/static/images/profiles/joppe.jpg"
    joppe.admin = True
    joppe.description = "🦌🦌🦌"
    joppe.q1 = "Om valet står mellan choklad och inte choklad så är det egentligen inget val!"
    joppe.q2 = "Snö och kyla"
    joppe.q3 = "Joppus"


    testNews = News(headline="Första inlägget", author=joppe, tags="", text="Här är det lite text!")
    dag1News = News(headline="Välkommen nØllan!", author=adminUser, tags="", text="Dag 1 är redan slut och vi hoppas att ni har haft en toppenstart tillsammans med oss!<br><br>Vi hoppas att ni ska trivas här hos oss på Medieteknik och att ni ser fram emot Mottagningen.<br><br>Under morgondagen vankas det gasque så passa på att komma till Gasquevettet där VRAQUE kommer lära er allt om hur man gasquear.<br><br>Tagga Välkomstgasque i morgon!")
    """
    """
    db.session.add(adminUser)

    db.session.add(joppe)
    db.session.add(testNews)
    db.session.add(dag1News)
    """
    db.session.commit()
