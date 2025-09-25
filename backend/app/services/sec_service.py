import socketio
from app.core.config import settings


def stream_sec_filings(callback):
    sio = socketio.Client()

    @sio.on("filing", namespace="/all-filings")
    def on_filings(filing):
        callback(filing)

    sio.connect(f"https://api.sec-api.io:3334?apiKey={settings.sec_api_key}", namespaces=["/all-filings"])  # use SEC_API_KEY
    sio.wait()

