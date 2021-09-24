import sqlite3
from flask import Flask, request, jsonify
from data_manager import data_manager

config = {}
app = Flask(__name__)
dm = data_manager(verbose=True)


def handle_get_list_of_lists():
    list_of_lists = dm.get_list_of_lists()
    res = {"status": "OK", "list": list_of_lists}
    return jsonify(res)


def handle_add_list(req):
    try:
        dm.add_list(req["list_name"])
        res = {"status": "OK"}
    except sqlite3.IntegrityError as err:
        res = {"status": "ERROR"}
        print("cannot add list :", req["list_name"])
        print("ERROR :", err)
    return jsonify(res)


def handle_delete_list(req):
    dm.delete_list(req["list_name"])
    res = {"status": "OK"}
    return jsonify(res)


@app.route("/api", methods=["GET", "POST"])
def api():
    if request.method == "POST":
        if request.json["command"] == "get_list":
            return handle_get_list_of_lists()
        elif request.json["command"] == "add_list":
            return handle_add_list(request.json)
        elif request.json["command"] == "delete_list":
            return handle_delete_list(request.json)

    rtn = {
        "status": "ERROR",
        "message": f'unknown command {request.json["command"]}',
    }
    return jsonify(rtn)


if __name__ == "__main__":
    app.run(debug=True)
