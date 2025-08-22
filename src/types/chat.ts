export interface Message {
  sender: "me" | "other";
  text: string;
  time: string;
}

export interface Chat {
  name: string;
  messages: Message[];
}
// export interface Message {
//   id: string; // Unique ID for better rendering and updates
//   sender: "me" | "other";
//   text: string;
//   time: string; // Could be changed to Date if you'll handle formatting later
//   status?: "sent" | "delivered" | "read"; // Optional: for message tracking
// }

// export interface Chat {
//   id: string; // Unique ID for the chat
//   name: string;
//   avatarUrl?: string; // Optional profile image
//   messages: Message[];
//   lastUpdated?: string; // ISO date for sorting chats
// }
