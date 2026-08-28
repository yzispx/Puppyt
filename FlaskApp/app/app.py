from flask import Flask, render_template, request  # type: ignore
import threading
import webbrowser
import pyperclip

app = Flask(__name__)


def get_clipboard_content():
    try:
        pastedText = pyperclip.paste()
        if pastedText.startswith(("https://", "http://")):
            return pastedText
        return "Insert a valid media URL here."

    except Exception as e:
        print(f"Error accessing clipboard: {e}")
        return "Insert a valid media URL here."


def get_true_clipboard_content():
    try:
        pastedText = pyperclip.paste()
        return pastedText
    except Exception as e:
        print(f"Error accessing clipboard: {e}")
        return ""


@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        name = request.form.get("name")
        print(f"Hello {name}!")

    return render_template(
        "index.html",
        page_name="Home",
        clipboard_content = get_clipboard_content(),
        true_clipboard_content = get_true_clipboard_content()
    )

@app.route("/clipboard")
def clipboard():
    return get_true_clipboard_content()

@app.route("/test", methods=["GET", "POST"])
def test():
    if request.method == "POST":
        name = request.form.get("name")
        print(f"Hello {name}!")

    return render_template("testpage.html", page_name="Test")


@app.route("/about")
def about():
    return "This is the About Page."


def open_browser():
    webbrowser.open("http://localhost:49150")


if __name__ == "__main__":
    threading.Timer(0.1, open_browser).start()
    app.run(debug=True, use_reloader=False, port=49150)
