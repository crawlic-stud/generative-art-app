import sys
import pathlib
import os

from flask import Flask, render_template
from flask_frozen import Freezer


app = Flask(__name__)
freezer = Freezer(app)


@app.route('/')
def home():
    return render_template('index.html')


def cmd(command):
    os.system(command)


def main():
    # if building to static site
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
        
        current_dir = pathlib.Path(__file__).parent
        index_path = pathlib.Path(current_dir / "build" / "index.html")
        static_html = index_path.read_text()
        new_html = static_html.replace("/static", f"/{current_dir.name}/static")
        index_path.write_text(new_html)
    
    # if pushing to prod
    elif len(sys.argv) > 1 and sys.argv[1] == "push":
        cmd("git add .")
        cmd("git commit -m \"build commit\"")
        cmd("git push origin master")
        cmd("git checkout prod")
        cmd("git add ./build/")
        cmd("git commit -m \"build commit\"")
        cmd("git push origin prod")
        cmd("git checkout master")

    # if developing
    else:
        app.run(host='127.0.0.1', port=8000, debug=True)


if __name__ == '__main__':
    main()