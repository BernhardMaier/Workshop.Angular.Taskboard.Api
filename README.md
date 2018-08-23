# Bootcamp API

> The one and only API you ever need to master this bootcamp!

Die Bootcamp API stellt drei Endpunkte zur Verfügung, um die Komplexaufgaben zu
lösen.

1.  Taskboard API
2.  Chat API
3.  Dashboard API

## Installation und Start

Bitte lade die Bootcamp API herunter und installiere sie, wie im folgenden
Snippet beschrieben.
Nach der Installation läuft die API lokal und benötigt keinen Zugriff auf andere Netzwerkressourcen.

> **Hinweis** Nachdem `npm start` ausgeführt wurde, startet die API unter https://localhost:3000.

```bash
# Herunterladen
git clone https://github.com/ui-bootcamp/bootcamp-api.git

# In das API Verzeichnis wechseln
cd bootcamp-api

# Abhängigkeiten installieren
npm install

# API starten
npm start
```

## Dokumentation

### HTTP

Die RESTful APIs _Taskboard_ und _Dashboard_ wurden mit
[Swagger](https://swagger.io/) dokumentiert. Nach dem starten der API befindet
sich unter http://localhost:3000/api/ eine interaktive Dokumentation.

### Websocket

Die Chat-API wird durch eine Websocket-Verbindung genutzt.

#### Mit Websocket API verbinden

Nachdem `npm start` ausgeführt wurde kann unter Angabe [ws://localhost:3000]()
die Socketverbindung hergestellt werden.

> **Hinweis** Wie genau die Socketverbindung in einem Angular-Projekt
> hergestellt wird, ist in in der [Chat-Aufgabe](https://github.com/ui-bootcamp/bootcamp-schedule/tree/master/05-chat)
> beschrieben.

#### Chatnachrichten laden

Um früher versendete Chatnachrichten zu laden muss einer geöffnete
Socketverbindung in `Event Name` übergeben werden.
Das folgendes Code Snippet skizziert, wie die Anweisung ausgeführt werden kann.

```ts
// ...
socket.emit('[Chat:Client] Load messages from history');
```

#### Chatnachricht senden

Eine Nachricht wird versendet, in dem neben dem `Event Name` eine `Payload`
übergeben wird.
Die Tabelle unter dem Code Snippet spezifiziert, welche Felder eine Chat Message
haben muss.

```ts
// ...
socket.emit('[Chat:Client] Publish message to the channel', message);
```

| Property  | Typ    |
| --------- | ------ |
| guid      | string |
| text      | string |
| writtenBy | string |
| writtenAt | Date   |

#### Chatverlauf löschen

Falls während der Lösung der Komplexaufgabe unübersichtlich viele
Chatnachrichten im Verlauf stehen, können mit folgender Anweisung alle
Nachrichten von Server gelöscht werden.

```ts
// ...
socket.emit('[Chat:Client] Remove messages from history');
```
