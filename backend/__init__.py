from flask import Flask

app = Flask(__name__)


@app.route("/api")
def root():
    return "This is admin page api response..........."


if __name__ == "__main__":
    app.run(debug=True)
