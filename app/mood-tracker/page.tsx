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
import { addMood, getMoods } from "@/services/moodService";

const moodOptions = [
  { id: "happy", label: "Happy", icon: Smile, color: "#FFD700" },
  { id: "calm", label: "Calm", icon: Wind, color: "#87CEEB" },
  { id: "neutral", label: "Neutral", icon: Meh, color: "#D3D3D3" },
  { id: "anxious", label: "Anxious", icon: AlertCircle, color: "#FF6B6B" },
  { id: "sad", label: "Sad", icon: Frown, color: "#4169E1" },
];

const moodMap: Record<string, string> = {
  happy: "Happy",
  calm: "Relaxed",
  neutral: "Relaxed",
  anxious: "Stressed",
  sad: "Sad",
};

const affirmations = [
  "You are stronger than you think.",
  "Today is a fresh start.",
  "You deserve kindness, especially from yourself.",
  "Progress, not perfection.",
  "Your feelings are valid.",
  "You are growing every day.",
];

interface Mood {
  _id: string;
  moodType: "Happy" | "Sad" | "Stressed" | "Relaxed";
  note?: string;
  date: string;
  userId: string;
}


export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [reflection, setReflection] = useState("");
  const [affirmation, setAffirmation] = useState("");
  const [moods, setMoods] = useState<Mood[]>([]);
  const [loading, setLoading] = useState(false);

  // Load Affirmation 
  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const pick =
      affirmations[Math.floor(Math.random() * affirmations.length)];
    setAffirmation(pick);
  }, []);

  // Fetch moods from backend
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await getMoods();
        setMoods(res.data);
      } catch (err) {
        console.error("Failed to fetch moods", err);
      }
    };

    fetchMoods();
  }, []);

  // Save Mood
  const handleLogMood = async () => {
    if (!selectedMood) return;

    try {
      setLoading(true);

      await addMood({
        moodType: moodMap[selectedMood],
        note: reflection,
      });

      const res = await getMoods();
      setMoods(res.data);

      setSelectedMood(null);
      setReflection("");
    } catch (err) {
      console.error("Failed to log mood", err);
    } finally {
      setLoading(false);
    }
  };


  const getWeeklyMoodData = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const base = days.map((day) => ({
      day,
      happy: 0,
      calm: 0,
      neutral: 0,
      anxious: 0,
      sad: 0,
    }));

    moods.forEach((mood) => {
      const day = days[new Date(mood.date).getDay()];
      const record = base.find((d) => d.day === day);
      if (!record) return;

      switch (mood.moodType) {
        case "Happy":
          record.happy += 1;
          break;
        case "Relaxed":
          record.calm += 1;
          break;
        case "Stressed":
          record.anxious += 1;
          break;
        case "Sad":
          record.sad += 1;
          break;
        default:
          record.neutral += 1;
      }
    });

    return base;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Mood Tracker
          </h1>
          <p className="text-muted-foreground mb-12 text-lg">
            Record your daily emotions and track patterns over time.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Mood Input */}
            <div className="lg:col-span-2 space-y-6">
              <CustomCard>
                <h2 className="text-2xl font-semibold mb-4">
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
                      <Icon className="w-7 h-7" style={{ color }} />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium">
                    Daily Reflection (Optional)
                  </label>
                  <CustomTextarea
                    placeholder="What influenced your mood today?"
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    className="min-h-24"
                  />
                </div>

                <CustomButton
                  onClick={handleLogMood}
                  disabled={!selectedMood || loading}
                  className="w-full"
                >
                  {loading ? "Saving..." : "Log Mood"}
                </CustomButton>
              </CustomCard>

              {/*Affirmation*/}
              <CustomCard className="bg-gradient-to-br from-accent/10 to-primary/10">
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
                  TODAY&apos;S AFFIRMATION
                </h3>
                <p className="text-lg italic">{affirmation}</p>
              </CustomCard>
            </div>

            {/* Chart */}
            <CustomCard className="h-fit">
              <h2 className="text-xl font-semibold mb-4">
                Weekly Mood Trends
              </h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getWeeklyMoodData()}>
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
