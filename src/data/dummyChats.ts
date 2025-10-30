export interface Message {
  from: "user" | "ai";
  text: string;
}

export interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  messages: Message[];
  status: "Handled by AI" | "Assigned to Human" | "Resolved";
}

export const dummyChats: Chat[] = [
  {
    id: 1,
    name: "Customer 1",
    lastMessage: "Halo, saya mau tanya produk...",
    messages: [
      { from: "user", text: "Halo, saya mau tanya produk..." },
      { from: "ai", text: "Tentu! Produk yang mana ya?" },
    ],
    status: "Handled by AI",
  },
  {
    id: 2,
    name: "Customer 2",
    lastMessage: "Terima kasih ya!",
    messages: [
      { from: "user", text: "Terima kasih ya!" },
      { from: "ai", text: "Sama-sama 😊" },
    ],
    status: "Resolved",
  },
    {
    id: 3,
    name: "Customer 3",
    lastMessage: "Kapan pesanan saya dikirim?",
    messages: [
        { from: "user", text: "Kapan pesanan saya dikirim?" },
        { from: "ai", text: "Pesanan Anda akan dikirim besok." },
    ],
    status: "Assigned to Human",
  },
];
