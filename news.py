import eventlet
import eventlet.wsgi
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
import requests

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")  # <--- Correct

NEWS_API_KEY = 'afad4568c22b4491ab5a17a463168cdf'

def fetch_us_headlines():
    url = f'https://newsapi.org/v2/top-headlines?country=us&apiKey={NEWS_API_KEY}'
    try:
        response = requests.get(url)
        data = response.json()
        print('Fetched data:', data)  # Log the fetched data
        if data['status'] == 'ok':
            return [{'title': article['title'], 'url': article['url']} for article in data['articles']]
        else:
            print('Error fetching news:', data)
            return []
    except Exception as e:
        print('Exception while fetching news:', e)
        return []


def emit_news():
    while True:
        headlines = fetch_us_headlines()
        if headlines:
            for title in headlines:
                data = {'title': title['title'], 'url': title['url']}  # Correct format
                print(f"Emitting news: {data}")
                socketio.emit('news', data)
                eventlet.sleep(3)
        else:
            print('No headlines fetched.')
            eventlet.sleep(10)

@app.route('/')
def index():
    return 'Backend running with live US news!'

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.start_background_task(emit_news)
    eventlet.wsgi.server(eventlet.listen(('localhost', 5000)), app)
