
import { CustomButton } from "@/components/button"
import Link from "next/link"
import { Heart, BookOpen, MessageCircle, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Start Your Wellness Journey
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Track your daily moods, journal your thoughts, and connect with AI-powered mental wellness support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/mood-tracker">
                <CustomButton size="lg">Get Started Today</CustomButton>
              </Link>
              <Link href="/dashboard">
                <CustomButton size="lg" variant="outline">
                  View Dashboard
                </CustomButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Your Wellness Toolkit</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Mood Tracker Card */}
              <Link href="/mood-tracker" className="group">
                <div className="bg-card rounded-lg p-6 border border-border h-full hover:shadow-lg transition-shadow">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Mood Tracker</h3>
                  <p className="text-muted-foreground mb-4">
                    Record your daily emotions with interactive mood icons and insightful reflections.
                  </p>
                  <div className="text-primary font-medium text-sm">Learn more →</div>
                </div>
              </Link>

              {/* Journal Card */}
              <Link href="/journal" className="group">
                <div className="bg-card rounded-lg p-6 border border-border h-full hover:shadow-lg transition-shadow">
                  <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Journal</h3>
                  <p className="text-muted-foreground mb-4">
                    Write secure journal entries and track your thoughts over time with timestamps.
                  </p>
                  <div className="text-accent font-medium text-sm">Learn more →</div>
                </div>
              </Link>

              {/* AI Chatbot Card */}
              <div className="bg-card rounded-lg p-6 border border-border h-full">
                <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">AI Wellness Companion</h3>
                <p className="text-muted-foreground mb-4">
                  Coming soon: Connect with our AI-powered mental wellness companion for personalized support.
                </p>
                <div className="text-secondary font-medium text-sm">Coming soon</div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">See Your Wellness at a Glance</h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  Your comprehensive dashboard visualizes your mood trends, journal highlights, and wellness insights in
                  one beautiful view.
                </p>
                <Link href="/dashboard">
                  <CustomButton>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Full Dashboard
                  </CustomButton>
                </Link>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
                <div className="space-y-4">
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded-full w-3/4"></div>
                    <div className="h-3 bg-muted rounded-full w-2/3"></div>
                    <div className="h-3 bg-muted rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
