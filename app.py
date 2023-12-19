from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy #database tool

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///events.db' #bare store sqlite lokalt
db = SQLAlchemy(app) #db init med sqlalchemy

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    event = db.Column(db.String(100), nullable=False) #maks 100 chars
    iconName = db.Column(db.String(50), nullable=False)

def create_data():
    data = [ #bare init data hvis db ik findes
        { "id": 1, "latitude": 55.67377240048718, "longitude": 12.541496086505862, "event": 'Peter Belli På Hjørnet', "iconName": 'musical-notes' },
        { "id": 2, "latitude": 55.67307240048718, "longitude": 12.540496086505862, "event": 'Bold i gården', "iconName": 'football' },
        { "id": 3, "latitude": 55.67407240048718, "longitude": 12.542496086505862, "event": 'Kaffe hos Morten', "iconName": 'cafe' },
        { "id": 4, "latitude": 55.672500, "longitude": 12.539800, "event": 'Film Night', "iconName": 'film' },
        { "id": 5, "latitude": 55.672000, "longitude": 12.539000, "event": 'Yoga in the Park', "iconName": 'body' },
        { "id": 6, "latitude": 55.671000, "longitude": 12.538000, "event": 'Sara at the Museum', "iconName": 'person' },
        { "id": 7, "latitude": 55.670500, "longitude": 12.537500, "event": 'Book Club Meeting', "iconName": 'book' }
    ]
    for item in data:
        event = Event(id=item['id'], latitude=item['latitude'], longitude=item['longitude'], event=item['event'], iconName=item['iconName'])
        db.session.add(event) #add event og commit sync til database
    db.session.commit()

@app.route('/events', methods=['GET'])
def get_events(): 
    events = Event.query.all() #returner blot i samme format som data i JSON og parse fra frontend.
    return jsonify([{'id': e.id, 'latitude': e.latitude, 'longitude': e.longitude, 'event': e.event, 'iconName': e.iconName} for e in events])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        if not Event.query.first(): #First time query it og lav db
            create_data()
    app.run(debug=True)
