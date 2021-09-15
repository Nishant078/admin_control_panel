from flask import Flask

app = Flask(__name__)


@app.route("/")
def root():
    return "<h1>This is admin page<h1>"


if __name__ == "__main__":
    app.run(debug=True)
