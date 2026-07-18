# 🌿 Rawan Oud (روان للعود)

Rawan Oud ist eine moderne E-Commerce-Webanwendung für arabische Luxusparfüme. 
Das Projekt wurde als WebTech-Semesteraufgabe an der HTW Berlin entwickelt und umfasst ein Frontend zur Präsentation der Parfüms sowie ein robustes Backend zur Datenverwaltung.

**Entwickelt von:** Rawan Alhussin 
**Betreuer:** Prof. J. Freiheit (HTW Berlin)  
**Kurs:** Webtech (Frontend & Backend)  
**Semester:** SS 2026 

### 🛠️ Tech-Stack
- **Frontend:** Angular (Version 17) mit Standalone Components
- **Backend:** Node.js & Express.js
- **Datenbank:** MongoDB Compass (Mongoose)

---

## 📸 Screenshots

**1. Startseite mit Hero-Video:**
![Startseite](./screenshots/home.png)
![Startseite](./screenshots/home2.png)

**2. Parfüm-Kollektion (Tabelle):**
![Parfüm Tabelle](./screenshots/table.png)

**3. Neues Parfüm anlegen (Formular):**
![Create Formular](./screenshots/create.png)

---

## ⚙️ Installation & Setup

### Voraussetzungen
* **Node.js** (lokal installiert)
* **Angular CLI** (falls nicht installiert: `npm install -g @angular/cli`)
* **Git** (zum Klonen des Repositories)
* **MongoDB** (Lokal installiert und laufend, z.B. über MongoDB Compass)

### 1. Backend einrichten
Öffne das Terminal und klone das Backend-Repository:

```bash
git clone https://github.com/RaWaN-2003-A/Parfuem_Backend.git
cd Parfuem_Backend
npm install
```

Datenbank initialisieren (.env erstellen): Erstelle eine Datei namens `.env` im Verzeichnis `Parfuem_Backend` und füge den folgenden Inhalt ein:

```bash
DB_CONNECTION=mongodb://127.0.0.1:27017
DATABASE=rawan_db
PORT=3000
NODE_ENV=development
```

Backend-Start:

```bash
node server.js
```

### 2. Frontend einrichten
Öffne ein neues Terminal-Fenster und klone das Frontend-Repository:

```bash
git clone https://github.com/RaWaN-2003-A/Parfuem_Frontend.git
cd Parfuem_Frontend
npm install
```

Frontend-Start (Entwicklungsmodus):

```bash
ng serve
```


### 🧪 Testen & Validierung
Manuelles Testen
**Backend-Prüfung:**
curl http://localhost:3000/api/parfuems

**Frontend geladen: Öffne deinen Browser und gehe zu:**
 http://localhost:4200

### 🎓 Lernziele erreicht
✅ Angular verstanden: Components, Services, Routing

✅ TypeScript: Typen, Schnittstellen, Generika

✅ Express/Node.js: REST-API, Routen, Fehlerbehandlung

✅ MongoDB: Schema-Design, CRUD-Operationen

✅ HTML/CSS: Bootstrap, responsives Design

✅ Git: Versionskontrolle, Commit-Hygiene

✅ Datenfluss: Frontend ↔ Backend ↔ MongoDB

### 🤖 Verwendete KI-Tools
Im Rahmen der Erstellung dieser Semesteraufgabe wurde Künstliche Intelligenz (Claude/Gemini) unterstützend eingesetzt für:

**Verständnisfragen:** Erläuterung komplexer Konzepte wie Angular-Services und Dependency Injection.

**Debugging:** Unterstützung bei der Fehlersuche (z.B. bei Modul-Import-Fehlern).

**Strukturierung:** Hilfe bei der logischen Planung der REST-API-Routen.

**Dokumentation:** Unterstützung bei der Formulierung und Markdown-Formatierung dieser README-Datei.

Dieses Projekt folgt den Anforderungen von Prof. J. Freiheit (HTW Berlin, WebTech SS 2026)

© 2026 Rawan Alhussin —  روان للعود