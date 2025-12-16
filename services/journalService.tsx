import api from "@/lib/api";

/* -------------------- */
/* Types */
/* -------------------- */
export interface CreateJournalPayload {
  title: string;
  content: string;
  moodContext?: string;
}

export interface UpdateJournalPayload {
  title?: string;
  content?: string;
  moodContext?: string;
}

/* -------------------- */
/* API Calls */
/* -------------------- */

export const createJournal = (data: CreateJournalPayload) => {
  return api.post("/journals", data);
};

export const getJournals = () => {
  return api.get("/journals");
};

export const updateJournal = (
  id: string,
  data: UpdateJournalPayload
) => {
  return api.put(`/journals/${id}`, data);
};

export const deleteJournal = (id: string) => {
  return api.delete(`/journals/${id}`);
};
