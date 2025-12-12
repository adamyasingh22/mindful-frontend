"use client";

import { useState, useEffect, useRef } from "react";
import { CustomButton } from "@/components/button";
import { CustomCard } from "@/components/card";
import { CustomTextarea } from "@/components/textarea";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Smile, Frown, AlertCircle, Meh, Wind } from "lucide-react";

const moodOptions = [
  { id: "happy", label: "Happy", icon: Smile, color: "#FFD700" },
  { id: "calm", label: "Calm", icon: Wind, color: "#87CEEB" },
  { id: "neutral", label: "Neutral", icon: Meh, color: "#D3D3D3" },
  { id: "anxious", label: "Anxious", icon: AlertCircle, color: "#FF6B6B" },
  { id: "sad", label: "Sad", icon: Frown, color: "#4169E1" },
];

const moodData = [
  { day: "Mon", happy: 2, calm: 3, neutral: 1, anxious: 1, sad: 0 },
  { day: "Tue", happy: 3, calm: 2, neutral: 1, anxious: 0, sad: 1 },
  { day: "Wed", happy: 2, calm: 4, neutral: 1, anxious: 1, sad: 0 },
  { day: "Thu", happy: 4, calm: 3, neutral: 0, anxious: 1, sad: 0 },
  { day: "Fri", happy: 3, calm: 3, neutral: 1, anxious: 0, sad: 1 },
  { day: "Sat", happy: 5, calm: 2, neutral: 0, anxious: 0, sad: 0 },
  { day: "Sun", happy: 4, calm: 4, neutral: 1, anxious: 0, sad: 0 },
];

const affirmations = [
  "You are stronger than you think.",
  "Today is a fresh start.",
  "You deserve kindness, especially from yourself.",
  "Progress, not perfection.",
  "Your feelings are valid.",
  "You are growing every day.",
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [reflection, setReflection] = useState("");
  const [affirmation, setAffirmation] = useState<string>("");

  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const rafId = requestAnimationFrame(() => {
      const pick =
        affirmations[Math.floor(Math.random() * affirmations.length)];
      setAffirmation(pick);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleLogMood = () => {
    if (selectedMood && reflection) {
      alert(`Mood "${selectedMood}" logged with reflection: "${reflection}"`);
      setSelectedMood(null);
      setReflection("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Mood Tracker
          </h1>
          <p className="text-muted-foreground mb-12 text-lg">
            Record your daily emotions and track patterns over time.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Mood Input Section */}
            <div className="lg:col-span-2 space-y-6">
              <CustomCard>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  How are you feeling today?
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                  {moodOptions.map(({ id, label, icon: Icon, color }) => (
                    <button
                      key={id}
                      onClick={() => setSelectedMood(id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        selectedMood === id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon className="w-6 h-6 md:w-8 md:h-8" style={{ color }} />
                      <span className="text-sm font-medium text-foreground">
                        {label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  <label
                    htmlFor="reflection"
                    className="text-sm font-medium text-foreground"
                  >
                    Daily Reflection (Optional)
                  </label>
                  <CustomTextarea
                    id="reflection"
                    placeholder="Share what's on your mind... What triggered this mood? Any thoughts to process?"
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    className="min-h-24"
                  />
                </div>

                <CustomButton
                  onClick={handleLogMood}
                  disabled={!selectedMood}
                  className="w-full"
                >
                  Log Mood
                </CustomButton>
              </CustomCard>

              {/* Today's Affirmation */}
              <CustomCard className="bg-gradient-to-br from-accent/10 to-primary/10 border-accent/50">
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                  TODAY&apos;S AFFIRMATION
                </h3>
                <p className="text-lg md:text-xl font-medium text-foreground italic">
                  {affirmation}
                </p>
              </CustomCard>
            </div>

            {/* Weekly Chart */}
            <CustomCard className="h-fit">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Weekly Mood Trends
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="happy" fill="#FFD700" />
                    <Bar dataKey="calm" fill="#87CEEB" />
                    <Bar dataKey="neutral" fill="#D3D3D3" />
                    <Bar dataKey="anxious" fill="#FF6B6B" />
                    <Bar dataKey="sad" fill="#4169E1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CustomCard>
          </div>
        </div>
      </main>
    </div>
  );
}
