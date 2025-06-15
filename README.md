# Customer Portal

A simple customer support ticketing portal built with **React**, **Firebase (Firestore + Auth)**, and **Vite**. Users can submit tickets, view ticket details, and comment on open tickets.

## Features

-  Firebase Authentication (Signup & Login)
-  Submit new tickets with title, description, and priority
-  Ticket list view showing title, status, and opened date
-  Detailed ticket view with timeline comments
-  Real-time updates via Firestore
-  Automatically stores `openedDate` timestamp on ticket creation

##  Project Structure

```
src/
├── components/         # Header, Login, Signup
├── pages/              # Home, Tickets, TicketDetails
├── firebase.js         # Firebase config & initialization
├── seedFirestore.js    # (Dev only) Seed Firestore with mock data
├── App.jsx             # Main app routing
```

##  Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/carly-cracker/customer-portal.git
cd customer-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Enable **Firestore Database** and **Authentication** (Email/Password)
- Add a web app and copy your Firebase config into `src/firebase.js`

#### Example:

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### 4. Run Locally

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

## ✅ Firestore Structure

**tickets (collection)**
- `id`: string
- `title`: string
- `description`: string
- `priority`: string
- `status`: string
- `openedDate`: timestamp

**comments (collection)**
- `id`: string
- `ticketId`: string (foreign key)
- `text`: string
- `timestamp`: timestamp

##  Seeding (Development Only)

To seed sample data, use the `seedFirestore.js` script by importing it into `App.jsx` **once**, then remove the call after seeding:

```js
import { seedFirestore } from "./seedFirestore";
seedFirestore(); // remove after first run
```

## 🔐 Firebase Security Rules (Example)

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tickets/{ticketId} {
      allow read, write: if request.auth != null;
    }
    match /comments/{commentId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 📦 Deployment


- **Firebase Hosting**
- **Vercel**
- **Netlify**

Ensure that `firebase.js` uses your production Firebase config.

---

## 👩Author

Carlos Korir  
(www.linkedin.com/in/carlos-korir-82808135b)(#) | [GitHub](https://github.com/carly-cracker)

