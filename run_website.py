from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os, threading, webbrowser

# Serve the folder containing this file.
os.chdir(Path(__file__).resolve().parent)
server = ThreadingHTTPServer(("127.0.0.1", 8000), SimpleHTTPRequestHandler)
url = "http://127.0.0.1:8000"
print(f"Birthday surprise is running at: {url}")
print("Keep this window open while you use the website. Press Ctrl+C to stop.")
threading.Timer(1.0, lambda: webbrowser.open(url)).start()
try:
    server.serve_forever()
except KeyboardInterrupt:
    print("Website stopped.")
    server.server_close()
