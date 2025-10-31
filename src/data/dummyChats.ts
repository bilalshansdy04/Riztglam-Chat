export interface Message {
  from: "user" | "ai";
  text: string;
}

export interface Chat {
  id: number;
  name: string;
  phone: string;
  lastMessage: string;
  messages: Message[];
  status: "Handled by AI" | "Assigned to Human" | "Resolved";
  labels: string[];
  notes: string;
  log: string[];
  systemMessages?: string[];
}

export const dummyChats: Chat[] = [
  {
    id: 1,
    name: "Customer 1",
    phone: "+62 812-3456-7890",
    lastMessage: "Halo, saya mau tanya produk...",
    messages: [
      { from: "user", text: "Halo, saya mau tanya produk..." },
      { from: "ai", text: "Tentu, produk yang mana ya?" },
    ],
    status: "Handled by AI",
    labels: ["Order", "New Customer"],
    notes: "Pernah order sebelumnya bulan lalu.",
    log: ["10:02 Chat created", "10:05 AI replied"],
  },
  {
    id: 2,
    name: "Customer 2",
    phone: "+62 813-5678-9012",
    lastMessage: "Terima kasih banyak!",
    messages: [
      { from: "user", text: "Terima kasih banyak!" },
      { from: "ai", text: "Sama-sama 😊" },
    ],
    status: "Assigned to Human",
    labels: ["Promo", "Loyal"],
    notes: "Sering bertanya tentang promo mingguan.",
    log: ["09:55 Assigned to Human"],
  },
  {
    id: 3,
    name: "Customer 3",
    phone: "+62 815-9876-5432",
    lastMessage: "Barang saya belum sampai nih...",
    messages: [
      { from: "user", text: "Barang saya belum sampai nih..." },
      { from: "ai", text: "Baik, mohon tunggu sebentar ya." },
    ],
    status: "Resolved",
    labels: ["Complaint", "Shipping"],
    notes: "Pesanan dikirim ulang tanggal 25 Okt.",
    log: ["08:22 Assigned to Human", "08:40 Resolved"],
  },
];
