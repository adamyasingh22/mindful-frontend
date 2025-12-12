export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-2">MindfulHub</h3>
            <p className="text-muted-foreground text-sm">
              Your personal wellness companion for mood tracking, journaling, and mental health support.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/mood-tracker" className="hover:text-primary transition-colors">
                  Mood Tracker
                </a>
              </li>
              <li>
                <a href="/journal" className="hover:text-primary transition-colors">
                  Journal
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-primary transition-colors">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Wellness Quote</h4>
            <p className="italic text-sm text-muted-foreground">
              The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson
              Mandela
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} MindfulHub. All rights reserved. Dedicated to your wellness journey.</p>
        </div>
      </div>
    </footer>
  )
}