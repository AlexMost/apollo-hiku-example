from flask import Flask, request
from flask import jsonify
from hikuserver.graph import execute, GRAPH
from flask_cors import CORS, cross_origin
import json
app = Flask(__name__)


@app.route("/")
def hello():
    return "Graphql server is working"


@app.route("/graphql",  methods=['POST', 'GET'])
@cross_origin()
def graphql():
    if request.method == 'POST':
        graph_str = json.loads(request.data)['query']
        print('Executing query >', graph_str)
        result = execute(GRAPH, graph_str)
        print('Result:', result)
        return jsonify({'data': result})

if __name__ == "__main__":
    app.run()
