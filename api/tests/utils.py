import json

def load_json(file_path):
    with open(file_path) as f:
        return json.loads(f.read())

class MockResponse():
    def __init__(self, status_code, text):
        self.status_code = status_code
        self.text = text

    def json(self):
        return json.loads(self.text)
