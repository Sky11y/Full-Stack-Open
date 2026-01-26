```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: The browser sends a POST request with a JSON payload
    activate server
    server-->>browser: JSON
    deactivate server

    Note right of browser: The browser handles response and updates the page

```
