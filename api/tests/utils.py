import json

def load_json(file_path):
    with open(file_path) as f:
        return json.loads(f.read())