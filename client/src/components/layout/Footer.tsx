import { Link } from "wouter";
import { Instagram } from "lucide-react";
import { OPEN_ARCHIVE_URL } from "@/lib/open-archive";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30 py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-primary">PromptPro</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your learning platform for AI prompt engineering, sacred Latin, and vibe coding. Master the skills of tomorrow, today.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Academy</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/academy">Academy Home</Link></li>
              <li><Link href="/learn">Lessons</Link></li>
              <li><Link href="/academy/tutor">AI Tutor</Link></li>
              <li><Link href="/prompts">Prompt Library</Link></li>
              <li><Link href="/academy/forum">Community</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/latin">Sacred Latin Course</Link></li>
              <li>
                <a href={OPEN_ARCHIVE_URL} target="_blank" rel="noopener noreferrer">
                  Open Archive (separate repo)
                </a>
              </li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Follow Jackie</h4>
            <div className="space-y-3">
              <a 
                href="https://www.instagram.com/theclassybratt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
                @Theclassybratt
              </a>
              <a 
                href="https://www.tiktok.com/@scorpiorising218" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <TikTokIcon className="h-5 w-5" />
                @Scorpiorising218
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Grimoires, history, spiritual wisdom & more
            </p>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 PromptPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
