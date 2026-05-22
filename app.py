from flask import Flask, send_from_directory, render_template
import os

app = Flask(__name__, static_folder='superhero-explorer', template_folder='superhero-explorer')

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Serve other static files (js, css, images, data)
@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    # Use port 5000 by default
    app.run(host='0.0.0.0', port=5000, debug=True)
