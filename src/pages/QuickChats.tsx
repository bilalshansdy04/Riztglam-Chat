import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { quickChatsDummy, type QuickChat } from "@/data/quickchat";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function QuickChats() {
  const [quickChats, setQuickChats] = useState<QuickChat[]>(() => {
    const stored = localStorage.getItem("quickChats");
    return stored ? JSON.parse(stored) : quickChatsDummy;
  });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<QuickChat>>({});

  useEffect(() => {
    localStorage.setItem("quickChats", JSON.stringify(quickChats));
  }, [quickChats]);

  const handleSave = () => {
    if (!form.title || !form.content) return;
    if (form.id) {
      setQuickChats((prev) =>
        prev.map((q) =>
          q.id === form.id ? { ...q, ...form } as QuickChat : q
        )
      );
    } else {
      setQuickChats((prev) => [
        ...prev,
        { ...form, id: Date.now() } as QuickChat,
      ]);
    }
    setForm({});
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    setQuickChats((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Quick Chats</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Add Quick Chat
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {form.id ? "Edit Quick Chat" : "Add Quick Chat"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="Nama Quick Chat (contoh: Price List)"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <textarea
                className="w-full border rounded p-2"
                placeholder="Isi Pesan"
                value={form.content || ""}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
              <Input
                type="url"
                placeholder="Attachment (opsional URL)"
                value={form.attachment || ""}
                onChange={(e) =>
                  setForm({ ...form, attachment: e.target.value })
                }
              />
              <Button onClick={handleSave}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Isi Pesan</TableHead>
            <TableHead>Attachment</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quickChats.map((q) => (
            <TableRow key={q.id}>
              <TableCell>{q.title}</TableCell>
              <TableCell>{q.content}</TableCell>
              <TableCell>
                {q.attachment ? (
                  <a
                    href={q.attachment}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Link
                  </a>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setForm(q);
                    setOpen(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(q.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
