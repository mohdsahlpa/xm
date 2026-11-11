#!/usr/bin/env python3
"""
Zero-dependency local CLI server for XM.
Supports both query parameter (?id=1) and path (/1, /1.c) requests.
Always returns pure text/plain responses.
"""

import http.server
import os
import urllib.parse

PORT = int(os.environ.get("PORT", 3000))
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class PlainTextHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        params = urllib.parse.parse_qs(parsed.query)

        target_id = params.get("id", [None])[0]

        # Check path if no query param
        if not target_id and parsed.path not in ["/", "/xm", "/xm/"]:
            clean_path = parsed.path.replace("/xm", "").strip("/")
            if clean_path and ".." not in clean_path:
                target_id = clean_path.removesuffix(".c")

        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

        if target_id:
            filename = target_id if target_id.endswith(".c") else f"{target_id}.c"
            candidates = [
                os.path.join(BASE_DIR, target_id),
                os.path.join(BASE_DIR, "programs", target_id),
                os.path.join(BASE_DIR, filename),
                os.path.join(BASE_DIR, "programs", filename)
            ]
            for c in candidates:
                if os.path.isfile(c):
                    with open(c, "rb") as f:
                        self.wfile.write(f.read())
                    return

            self.wfile.write(f"Error: Program '{target_id}' not found.\n".encode("utf-8"))
            return

        # Default: Serve index.html (pure text)
        index_file = os.path.join(BASE_DIR, "index.html")
        if os.path.isfile(index_file):
            with open(index_file, "rb") as f:
                self.wfile.write(f.read())
        else:
            self.wfile.write(b"XM - C Program Repository\n")

    def log_message(self, format, *args):
        # Quiet log for clean CLI testing
        pass

if __name__ == "__main__":
    server = http.server.HTTPServer(("0.0.0.0", PORT), PlainTextHandler)
    print(f"XM Plain-Text Server running at http://localhost:{PORT}")
    print(f"- curl \"http://localhost:{PORT}/?id=1\"")
    print(f"- curl \"http://localhost:{PORT}/1\"")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
