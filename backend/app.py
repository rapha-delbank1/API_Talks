from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

database = [
]

@app.route('/items', methods=['GET'])
def get_items():
    print("Requisição GET recebida")
    return jsonify(database), 200

@app.route('/items', methods=['POST'])
def add_item():
    new_item = request.json
    print(f"Informação recebida do front-end: {new_item}")
    new_item['id'] = len(database) + 1
    database.append(new_item)
    return jsonify(new_item), 201

@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    item = next((item for item in database if item['id'] == item_id), None)
    if item:
        database.remove(item)
        return jsonify({"message": "Item deleted"}), 200
    print(f"Item com id {item_id} não encontrado")
    return jsonify({"error": "Item not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
