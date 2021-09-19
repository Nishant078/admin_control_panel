from flask import Flask, request, jsonify
import json
import os

config = {}
app = Flask(__name__)


def handle_get_list():
    print("handling get list")
    res = {"status": "OK", "list": [1, 2, 3, 4, 5]}
    return jsonify(res)


@app.route("/api", methods=["GET", "POST"])
def api():
    if request.method == "POST":
        if request.json["command"] == "get_list":
            return handle_get_list()

    return "Error..........."


if __name__ == "__main__":
    config_file_path = os.path.dirname(os.path.abspath(__file__)) + "/config.json"
    with open(config_file_path) as config_file:
        config = json.load(config_file)
    app.run(debug=True)
