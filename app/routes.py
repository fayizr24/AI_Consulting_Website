from flask import Blueprint, render_template

main = Blueprint("main", __name__)

@main.route("/")
def home():
    return render_template("index.html")

@main.route("/about")
def about():
    return render_template("about.html")

@main.route("/for-students")
def get_students_page():
    return render_template("students_page.html")

@main.route("/for-clients")
def get_clients_page():
    return render_template("clients_page.html")

@main.route("/what-we-do")
def get_team_page():
    return render_template("team.html")

