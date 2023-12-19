from flask import Flask, jsonify

app = Flask(__name__) #init app

data = [
    { "id": 1, "latitude": 55.67377240048718, "longitude": 12.541496086505862, "event": 'Peter Belli På Hjørnet', "iconName": 'musical-notes' },
    { "id": 2, "latitude": 55.67307240048718, "longitude": 12.540496086505862, "event": 'Bold i gården', "iconName": 'football' },
    { "id": 3, "latitude": 55.67407240048718, "longitude": 12.542496086505862, "event": 'Kaffe hos Morten', "iconName": 'cafe' },
    { "id": 4, "latitude": 55.672500, "longitude": 12.539800, "event": 'Film Night', "iconName": 'film' },
    { "id": 5, "latitude": 55.672000, "longitude": 12.539000, "event": 'Yoga in the Park', "iconName": 'body' },
    { "id": 6, "latitude": 55.671000, "longitude": 12.538000, "event": 'Sara at the Museum', "iconName": 'person' },
    { "id": 7, "latitude": 55.670500, "longitude": 12.537500, "event": 'Book Club Meeting', "iconName": 'book' }
]

@app.route('/events', methods=['GET'])
def get_events():
    return jsonify(data) # returner bare dataen i json.. dette skal være live senere

if __name__ == '__main__': # kør app med debug
    app.run(debug=True)
