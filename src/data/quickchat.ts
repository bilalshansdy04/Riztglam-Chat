export type QuickChat = {
  id: number;
  title: string;
  content: string;
  attachment?: string;
};

export const quickChatsDummy: QuickChat[] = [
  {
    id: 1,
    title: "Price List",
    content: "Berikut daftar harga terbaru produk kami...",
  },
  {
    id: 2,
    title: "Greeting",
    content: "Halo! Ada yang bisa saya bantu hari ini? 😊",
  },
];
