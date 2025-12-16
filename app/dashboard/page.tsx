"use client";

import { useEffect, useMemo, useState } from "react";
import { CustomCard } from "@/components/card";
import api from "@/lib/api";
import { formatDateTime } from "@/lib/formatDate";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, BookOpen, Heart } from "lucide-react";

type StoredMood = "Happy" | "Relaxed" | "Stressed" | "Sad";

interface Mood {
  moodType: StoredMood;
  date: string;
}

interface Journal {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const UI_MOOD_COLORS = {
  happy: "#FFD700",
  calm: "#87CEEB",
  neutral: "#D3D3D3",
  anxious: "#FF6B6B",
  sad: "#4169E1",
};

export default function Dashboard() {
  const [moods, setMoods] = useState<Mood[]>([]);
  const [journals, setJournals] = useState<Journal[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [moodRes, journalRes] = await Promise.all([
        api.get("/moods"),
        api.get("/journals"),
      ]);
      setMoods(moodRes.data);
      setJournals(journalRes.data);
    };
    fetchData();
  }, []);

  const weeklyMoodData = useMemo(() => {
    const base = DAYS.map((day) => ({
      day,
      happy: 0,
      calm: 0,
      neutral: 0,
      anxious: 0,
      sad: 0,
    }));

    moods.forEach((mood) => {
      const day = DAYS[new Date(mood.date).getDay()];
      const record = base.find((d) => d.day === day);
      if (!record) return;

      switch (mood.moodType) {
        case "Happy":
          record.happy++;
          break;

        case "Relaxed":
          record.calm++;
          record.neutral++;
          break;

        case "Stressed":
          record.anxious++;
          break;

        case "Sad":
          record.sad++;
          break;
      }
    });

    return base;
  }, [moods]);

  const moodDistribution = useMemo(() => {
    const counts = {
      happy: 0,
      calm: 0,
      neutral: 0,
      anxious: 0,
      sad: 0,
    };

    moods.forEach((mood) => {
      switch (mood.moodType) {
        case "Happy":
          counts.happy++;
          break;
        case "Relaxed":
          counts.calm++;
          counts.neutral++;
          break;
        case "Stressed":
          counts.anxious++;
          break;
        case "Sad":
          counts.sad++;
          break;
      }
    });

    return Object.entries(counts).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value,
      fill: UI_MOOD_COLORS[key as keyof typeof UI_MOOD_COLORS],
    }));
  }, [moods]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-2">
          Your Wellness Dashboard
        </h1>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <CustomCard>
            <Heart className="mb-2 text-primary" />
            <p className="text-3xl font-bold">{moods.length}</p>
            <p className="text-sm text-muted-foreground">Mood Logs</p>
          </CustomCard>

          <CustomCard>
            <BookOpen className="mb-2 text-accent" />
            <p className="text-3xl font-bold">{journals.length}</p>
            <p className="text-sm text-muted-foreground">Journal Entries</p>
          </CustomCard>

          <CustomCard>
            <TrendingUp className="mb-2 text-secondary" />
            <p className="text-3xl font-bold">82</p>
            <p className="text-sm text-muted-foreground">Wellness Score</p>
          </CustomCard>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <CustomCard>
            <h2 className="text-xl font-semibold mb-4">
              Weekly Mood Trends
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyMoodData}>
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
          </CustomCard>

          <CustomCard>
            <h2 className="text-xl font-semibold mb-4">
              Mood Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={moodDistribution} dataKey="value" label>
                  {moodDistribution.map((e, i) => (
                    <Cell key={i} fill={e.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CustomCard>
        </div>

        {/* Journal Highlights */}
        <CustomCard>
          <h2 className="text-xl font-semibold mb-4">
            Journal Highlights
          </h2>
          <div className="space-y-4">
            {journals.slice(0, 3).map((j) => (
              <div key={j._id} className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium text-sm">{j.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {formatDateTime(j.createdAt)}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {j.content}
                </p>
              </div>
            ))}
          </div>
        </CustomCard>
      </div>
    </div>
  );
}
