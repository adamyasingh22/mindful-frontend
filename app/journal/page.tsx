"use client";

import { useState, useEffect } from "react";
import { CustomButton } from "@/components/button";
import { CustomCard } from "@/components/card";
import { CustomTextarea } from "@/components/textarea";
import { CustomInput } from "@/components/input";
import { Trash2, Plus } from "lucide-react";
import {
  createJournal,
  getJournals,
  deleteJournal,
} from "@/services/journalService";

interface JournalEntry {
  _id: string;
  title: string;
  content: string;
  moodContext?: string;
  createdAt: string;
  userId: string;
}

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const res = await getJournals();
        setEntries(res.data);
      } catch (err) {
        console.error("Failed to load journals", err);
      }
    };

    fetchJournals();
  }, []);

  const handleAddEntry = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      setLoading(true);

      await createJournal({
        title,
        content,
        moodContext: "General",
      });

      const res = await getJournals();
      setEntries(res.data);

      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Failed to create journal", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntry = async (id: string) => {
    try {
      await deleteJournal(id);
      setEntries((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Failed to delete journal", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Your Journal
          </h1>
          <p className="text-muted-foreground mb-12 text-lg">
            Write your thoughts, reflect on your day, and track your journey.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/*New Entry*/}
            <div className="lg:col-span-1">
              <CustomCard className="sticky top-24">
                <h2 className="text-xl font-semibold mb-4">
                  New Entry
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Title
                    </label>
                    <CustomInput
                      placeholder="Entry title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Content
                    </label>
                    <CustomTextarea
                      placeholder="Write your thoughts here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-32"
                    />
                  </div>

                  <CustomButton
                    onClick={handleAddEntry}
                    disabled={loading}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save Entry"}
                  </CustomButton>
                </div>
              </CustomCard>
            </div>

            {/*Entries */}
            <div className="lg:col-span-2 space-y-4">
              {entries.length === 0 ? (
                <CustomCard className="text-center p-8">
                  <p className="text-muted-foreground mb-4">
                    No entries yet. Start journaling today!
                  </p>
                </CustomCard>
              ) : (
                entries.map((entry) => (
                  <CustomCard
                    key={entry._id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {entry.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(entry.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => handleDeleteEntry(entry._id)}
                        className="text-muted-foreground hover:text-destructive p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="whitespace-pre-wrap line-clamp-4">
                      {entry.content}
                    </p>
                  </CustomCard>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
