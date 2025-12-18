import api from "@/lib/api";

export const sendChatMessage = (message: string) =>
  api.post("/api/chat", { message });
