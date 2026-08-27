from flask import Flask, render_template, request  # type: ignore
import threading
import webbrowser

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        name = request.form.get("name")
        print(f"Hello {name}!")

    return render_template("index.html", page_name="Home")

@app.route("/test", methods=["GET", "POST"])
def test():
    if request.method == "POST":
        name = request.form.get("name")
        print(f"Hello {name}!")

    return render_template("testpage.html", page_name="Test")

@app.route('/about')
def about():
    return "This is the About Page."

def open_browser():
    webbrowser.open("http://localhost:5000")


if __name__ == "__main__":
    threading.Timer(0.1, open_browser).start()
    app.run(debug=True, use_reloader=False)
