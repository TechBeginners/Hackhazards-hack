import json
import eventlet
import eventlet.wsgi
import requests
from flask import Flask
from flask_socketio import SocketIO
from fluvio import Fluvio

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

NEWS_API_KEY = 'afad4568c22b4491ab5a17a463168cdf'
TOPIC_NAME = 'news-topic'

fluvio = Fluvio.connect()
topic = fluvio.topic(TOPIC_NAME)

def fetch_news():
    url = f'https://newsapi.org/v2/top-headlines?country=us&apiKey={NEWS_API_KEY}'
    try:
        response = requests.get(url)
        data = response.json()
        if data['status'] == 'ok':
            news_list = [{'title': article['title'], 'url': article['url']} for article in data['articles']]
            return news_list
        else:
            print('Error fetching news:', data)
            return []
    except Exception as e:
        print('Exception while fetching news:', e)
        return []

def emit_news_to_flv():
    while True:
        headlines = fetch_news()
        if headlines:
            for article in headlines:
                message = json.dumps(article)
                print(f"Sending message to Fluvio: {message}")
                topic.send(message.encode())
                eventlet.sleep(3)  
        else:
            print('No headlines fetched. Retrying...')
            eventlet.sleep(10) 

def emit_news_to_socket():
    while True:
        headlines = fetch_news()
        if headlines:
            for article in headlines:
                socketio.emit('news', article)
                eventlet.sleep(3)  
        else:
            print('No headlines fetched. Retrying...')
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
    socketio.start_background_task(emit_news_to_socket)
    socketio.start_background_task(emit_news_to_flv)
    eventlet.wsgi.server(eventlet.listen(('localhost', 5000)), app)
