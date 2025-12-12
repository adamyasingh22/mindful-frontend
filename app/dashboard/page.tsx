'use client';
import { CustomCard } from "@/components/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, BookOpen, Heart } from "lucide-react"

const weeklyMoodData = [
  { day: "Mon", happy: 4, calm: 3, neutral: 2, anxious: 1, sad: 0 },
  { day: "Tue", happy: 5, calm: 4, neutral: 1, anxious: 0, sad: 0 },
  { day: "Wed", happy: 3, calm: 5, neutral: 2, anxious: 1, sad: 0 },
  { day: "Thu", happy: 6, calm: 3, neutral: 1, anxious: 1, sad: 0 },
  { day: "Fri", happy: 4, calm: 4, neutral: 2, anxious: 1, sad: 1 },
  { day: "Sat", happy: 7, calm: 3, neutral: 1, anxious: 0, sad: 0 },
  { day: "Sun", happy: 5, calm: 5, neutral: 1, anxious: 0, sad: 0 },
]

const moodDistribution = [
  { name: "Happy", value: 34, fill: "#FFD700" },
  { name: "Calm", value: 27, fill: "#87CEEB" },
  { name: "Neutral", value: 10, fill: "#D3D3D3" },
  { name: "Anxious", value: 4, fill: "#FF6B6B" },
  { name: "Sad", value: 1, fill: "#4169E1" },
]

const trendData = [
  { week: "Week 1", wellness: 65, journal: 3, entries: 5 },
  { week: "Week 2", wellness: 72, journal: 5, entries: 8 },
  { week: "Week 3", wellness: 78, journal: 7, entries: 11 },
  { week: "Week 4", wellness: 82, journal: 9, entries: 14 },
]

const sampleJournalHighlights = [
  {
    title: "Peaceful Morning",
    excerpt: "Started the day with meditation and reflection. Feeling grounded and ready to tackle the day.",
  },
  {
    title: "Breakthrough Moment",
    excerpt: "Had an important realization today about my priorities and what truly matters to me.",
  },
  {
    title: "Grateful Evening",
    excerpt: "Taking time to appreciate the small moments - a warm cup of tea and a good conversation.",
  },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Your Wellness Dashboard</h1>
          <p className="text-muted-foreground mb-12 text-lg">Your weekly wellness overview and insights.</p>

          {/* Stats Row */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <CustomCard>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Weekly Mood Logs</h3>
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">38</p>
              <p className="text-xs text-muted-foreground mt-1">↑ 12% from last week</p>
            </CustomCard>

            <CustomCard>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Journal Entries</h3>
                <BookOpen className="w-4 h-4 text-accent" />
              </div>
              <p className="text-3xl font-bold text-foreground">14</p>
              <p className="text-xs text-muted-foreground mt-1">↑ 40% from last week</p>
            </CustomCard>

            <CustomCard>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">Wellness Score</h3>
                <TrendingUp className="w-4 h-4 text-secondary" />
              </div>
              <p className="text-3xl font-bold text-foreground">82</p>
              <p className="text-xs text-muted-foreground mt-1">↑ 8 points this week</p>
            </CustomCard>
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Weekly Mood Trends */}
            <CustomCard>
              <h2 className="text-xl font-semibold text-foreground mb-4">Weekly Mood Trends</h2>
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
                </BarChart>
              </ResponsiveContainer>
            </CustomCard>

            {/* Mood Distribution */}
            <CustomCard>
              <h2 className="text-xl font-semibold text-foreground mb-4">Mood Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={moodDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {moodDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CustomCard>
          </div>

          {/* Wellness Progress */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CustomCard>
                <h2 className="text-xl font-semibold text-foreground mb-4">Wellness Progress Over Time</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="wellness" stroke="#60A5FA" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CustomCard>
            </div>

            {/* Journal Highlights */}
            <CustomCard>
              <h2 className="text-xl font-semibold text-foreground mb-4">Journal Highlights</h2>
              <div className="space-y-4">
                {sampleJournalHighlights.map((highlight, idx) => (
                  <div key={idx} className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <h4 className="font-medium text-foreground text-sm mb-1">{highlight.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{highlight.excerpt}</p>
                  </div>
                ))}
              </div>
            </CustomCard>
          </div>
        </div>
      </main>

    </div>
  )
}