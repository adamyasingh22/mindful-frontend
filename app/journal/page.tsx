"use client";

import { useState, useEffect } from "react";
import { CustomButton } from "@/components/button";
import { CustomCard } from "@/components/card";
import { CustomTextarea } from "@/components/textarea";
import { CustomInput } from "@/components/input";
import { Trash2, Plus } from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function Journal() {
  // Lazy init from localStorage (no effect, no cascading renders)
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("journalEntries");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Persist whenever entries change (effect talks to external system)
  useEffect(() => {
    try {
      localStorage.setItem("journalEntries", JSON.stringify(entries));
    } catch {}
  }, [entries]);

  const handleAddEntry = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content");
      return;
    }
    const newEntry: JournalEntry = {
      id: String(Date.now()),
      title,
      content,
      date: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setEntries((prev) => [newEntry, ...prev]);
    setTitle("");
    setContent("");
  };

  const handleDeleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Your Journal</h1>
          <p className="text-muted-foreground mb-12 text-lg">
            Write your thoughts, reflect on your day, and track your journey.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* New Entry Form */}
            <div className="lg:col-span-1">
              <CustomCard className="sticky top-24">
                <h2 className="text-xl font-semibold text-foreground mb-4">New Entry</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="entry-title" className="text-sm font-medium text-foreground block mb-2">
                      Title
                    </label>
                    <CustomInput
                      id="entry-title"
                      placeholder="Entry title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="entry-content" className="text-sm font-medium text-foreground block mb-2">
                      Content
                    </label>
                    <CustomTextarea
                      id="entry-content"
                      placeholder="Write your thoughts here..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="min-h-32"
                    />
                  </div>

                  <CustomButton onClick={handleAddEntry} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Save Entry
                  </CustomButton>
                </div>
              </CustomCard>
            </div>

            {/* Entries List */}
            <div className="lg:col-span-2 space-y-4">
              {entries.length === 0 ? (
                <CustomCard className="text-center p-8">
                  <p className="text-muted-foreground mb-4">No entries yet. Start journaling today!</p>
                  <p className="text-sm text-muted-foreground">
                    Create your first entry to begin your reflection journey.
                  </p>
                </CustomCard>
              ) : (
                entries.map((entry) => (
                  <CustomCard key={entry.id} className="hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-foreground">{entry.title}</h3>
                        <p className="text-sm text-muted-foreground">{entry.date}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-foreground whitespace-pre-wrap line-clamp-3">{entry.content}</p>
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
