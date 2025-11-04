export type Chat = {
  id: number;
  name: string;
  phone: string;
  handledBy: string;
  status: "Assigned to Human" | "Handled by AI" | "Resolved";
  lastMessage: string;
  messages: { from: "user" | "ai" | "human"; text: string }[];
  systemMessages?: string[];
  labels?: string[];
  notes?: string;    
  log?: string[];
  unreadCount?: number;
};

export const dummyChats: Chat[] = [
  {
    id: 1,
    name: "Rina Setiawan",
    phone: "0812-3456-7890",
    handledBy: "AI Agent A",
    status: "Handled by AI",
    lastMessage: "Tentu! Apa yang bisa saya bantu?",
    messages: [
      { from: "user", text: "Halo, saya ingin tanya produk skincare." },
      { from: "ai", text: "Tentu! Apa yang bisa saya bantu?" },
    ],
    unreadCount: 0,
    labels: ["Customer", "New"],
    notes: "Pelanggan baru dari Instagram Ads", 
    log: ["Chat started", "Handled by AI Agent A"], 
  },
  {
    id: 2,
    name: "Dimas Anggara",
    phone: "0821-1111-2222",
    handledBy: "Agent A",
    status: "Assigned to Human",
    lastMessage: "Pesananmu sudah dikirim ya!",
    messages: [
      { from: "user", text: "Pesanan saya dikirim belum?" },
      { from: "human", text: "Sudah dikirim, silakan cek resi ya." },
    ],
    unreadCount: 0,
    labels: ["Repeat Customer"],
    notes: "Sudah belanja 3x",
    log: ["Chat assigned to Agent A"],
  },
  {
    id: 3,
    name: "Nadia Lestari",
    phone: "0831-5678-9012",
    handledBy: "Agent B",
    status: "Assigned to Human",
    lastMessage: "Oke, terima kasih!",
    messages: [
      { from: "user", text: "Bisa ubah alamat pengiriman?" },
      { from: "human", text: "Bisa, saya bantu ubah ya." },
    ],
    unreadCount: 5,
    labels: ["Repeat Customer"],
    notes: "Sudah belanja 3x",
    log: ["Chat assigned to Agent A"],
  },
  {
    id: 4,
    name: "Andi Pratama",
    phone: "0852-9999-0000",
    handledBy: "AI Agent B",
    status: "Handled by AI",
    lastMessage: "Produk tersedia, silakan checkout.",
    messages: [
      { from: "user", text: "Apakah produk A masih tersedia?" },
      { from: "ai", text: "Produk tersedia, silakan checkout." },
    ],
    unreadCount: 2,
    labels: ["Customer", "New"],
    notes: "Pelanggan baru dari Instagram Ads", 
    log: ["Chat started", "Handled by AI Agent A"], 
  },
  {
    id: 5,
    name: "Sinta Dewi",
    phone: "0853-8765-4321",
    handledBy: "Agent C",
    status: "Assigned to Human",
    lastMessage: "Kami akan segera proses pengembalian dana.",
    messages: [
      { from: "user", text: "Saya ingin refund pesanan yang salah." },
      { from: "human", text: "Kami akan segera proses pengembalian dana." },
    ],
    unreadCount: 1,
    labels: ["Repeat Customer"],
    notes: "Sudah belanja 3x",
    log: ["Chat assigned to Agent A"],
  },
  {
    id: 6,
    name: "Rafi Akbar",
    phone: "0813-2468-3579",
    handledBy: "AI Agent C",
    status: "Handled by AI",
    lastMessage: "Terima kasih sudah menghubungi kami!",
    messages: [
      { from: "user", text: "Bagaimana cara melacak pesanan saya?" },
      { from: "ai", text: "Gunakan nomor resi di halaman pesanan Anda." },
    ],
    unreadCount: 2,
    labels: ["Repeat Customer"],
    notes: "Sudah belanja 3x",
    log: ["Chat assigned to Agent A"],
  },
  {
    id: 7,
    name: "Aulia Rahman",
    phone: "0814-7777-9999",
    handledBy: "Agent A",
    status: "Assigned to Human",
    lastMessage: "Silakan kirim foto produk yang dimaksud ya.",
    messages: [
      { from: "user", text: "Barang yang dikirim rusak, bagaimana ya?" },
      { from: "human", text: "Silakan kirim foto produk yang dimaksud ya." },
    ],
    unreadCount: 0,
    labels: ["Customer", "New"],
    notes: "Pelanggan baru dari Instagram Ads", 
    log: ["Chat started", "Handled by AI Agent A"], 
  },
  {
    id: 8,
    name: "Clara Putri",
    phone: "0812-1111-3333",
    handledBy: "AI Agent A",
    status: "Handled by AI",
    lastMessage: "Diskon berlaku hingga 31 Oktober!",
    messages: [
      { from: "user", text: "Apakah ada promo bulan ini?" },
      { from: "ai", text: "Diskon berlaku hingga 31 Oktober!" },
    ],
    unreadCount: 4,
    labels: ["Customer", "New"],
    notes: "Pelanggan baru dari Instagram Ads", 
    log: ["Chat started", "Handled by AI Agent A"], 
  },
  {
    id: 9,
    name: "Bayu Nugraha",
    phone: "0877-2222-4444",
    handledBy: "Agent B",
    status: "Assigned to Human",
    lastMessage: "Baik, nanti kami konfirmasi ulang ke Anda.",
    messages: [
      { from: "user", text: "Bisa tolong ubah ukuran baju saya?" },
      { from: "human", text: "Baik, nanti kami konfirmasi ulang ke Anda." },
    ],
    unreadCount: 0,
    labels: ["Repeat Customer"],
    notes: "Sudah belanja 3x",
    log: ["Chat assigned to Agent A"],
  },
  {
    id: 10,
    name: "Eka Wirawan",
    phone: "0896-5555-6666",
    handledBy: "AI Agent B",
    status: "Handled by AI",
    lastMessage: "Silakan isi form pendaftaran terlebih dahulu.",
    messages: [
      { from: "user", text: "Bagaimana cara daftar member baru?" },
      { from: "ai", text: "Silakan isi form pendaftaran terlebih dahulu." },
    ],
    unreadCount: 2,
    labels: ["Repeat Customer"],
    notes: "Sudah belanja 3x",
    log: ["Chat assigned to Agent A"],
  },
];
