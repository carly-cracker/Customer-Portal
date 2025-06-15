import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const data = {
  tickets: [
    {
      id: "2",
      title: "App crashing on launch",
      status: "in-progress",
      openedDate: "2025-06-13T15:30:00.000Z"
    },
    {
      id: "597a",
      title: "Buffering wifi",
      description: "I have bee experiencing wifi buffering from last night",
      priority: "High"
    },
    {
      id: "0702",
      title: "login issues",
      description: "I tried to login to my account but its failing",
      priority: "Normal",
      status: "open",
      openedDate: "2025-06-15T09:23:43.713Z"
    }
  ],
  comments: [
    {
      id: "1",
      ticketId: "2",
      text: "App crashes every time I open it on Android.",
      timestamp: "2025-06-13T15:35:00.000Z"
    },
    {
      id: "f353",
      ticketId: "2",
      text: "The support team has resolved the matter",
      timestamp: "2025-06-15T08:54:41.389Z"
    },
    {
      id: "6fa4",
      ticketId: "597a",
      text: "still havent got any reply from the support team",
      timestamp: "2025-06-15T09:12:11.643Z"
    },
    {
      id: "e137",
      ticketId: "0702",
      text: "still trying but nothing",
      timestamp: "2025-06-15T09:24:10.714Z"
    }
  ]
};

export async function seedFirestore() {
  try {
    for (const ticket of data.tickets) {
      const docRef = doc(db, "tickets", ticket.id);
      await setDoc(docRef, ticket);
    }

    for (const comment of data.comments) {
      const docRef = doc(db, "comments", comment.id);
      await setDoc(docRef, comment);
    }

    console.log("Firestore seeding complete!");
  } catch (error) {
    console.error("Error seeding Firestore:", error);
  }
}
