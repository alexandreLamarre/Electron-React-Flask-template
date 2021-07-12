from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*" : {"origins" : "http://localhost:3000"}})

@app.route('/test')
def hello():
    return jsonify({"result" : "Hello world!"})

if __name__ == '__main__':
    app.run(host = '127.0.0.1', port = 5000) 