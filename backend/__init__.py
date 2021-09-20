from flask import Flask, request, jsonify
from data_manager import data_manager

config = {}
app = Flask(__name__)
dm = data_manager(verbose=True)


def handle_get_list():
    res = {"status": "OK", "list": dm.get_list_of_lists()}
    return jsonify(res)


def handle_add_list(req):
    print("handle_add_list")
    dm.add_list(req["list_name"])
    res = {"status": "OK"}
    return jsonify(res)


@app.route("/api", methods=["GET", "POST"])
def api():
    if request.method == "POST":
        if request.json["command"] == "get_list":
            return handle_get_list()
        elif request.json["command"] == "add_list":
            return handle_add_list(request.json)

    rtn = {
        "status": "ERROR",
        "message": f'Was not able to process command {request.json["command"]}',
    }
    return jsonify(rtn)


if __name__ == "__main__":
    app.run(debug=True)
