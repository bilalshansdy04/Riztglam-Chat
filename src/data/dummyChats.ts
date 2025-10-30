export const dummyChats = [
  {
    id: 1,
    name: "Customer 1",
    lastMessage: "Halo, saya mau tanya produk...",
    messages: [
      { from: "user", text: "Halo, saya mau tanya produk..." },
      { from: "ai", text: "Tentu! Produk yang mana ya?" },
    ],
    status: "Handled by AI", // atau "Assigned to Human", "Resolved"
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
];
