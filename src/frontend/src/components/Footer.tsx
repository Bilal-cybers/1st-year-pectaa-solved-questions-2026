import { Facebook, Mail, Shield, Twitter, Youtube } from "lucide-react";

function FooterLink({ children }: { children: React.ReactNode }) {
  return (
    <li>
      <span className="cursor-default text-white/70 text-sm">{children}</span>
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-navy text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-orange flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-display font-bold text-lg">
                PECTAA Prep
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Comprehensive solved questions for Year 1 students following the
              PECTAA curriculum 2026.
            </p>
            <div className="flex gap-3">
              <span
                className="hover:text-orange transition-colors cursor-default"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </span>
              <span
                className="hover:text-orange transition-colors cursor-default"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </span>
              <span
                className="hover:text-orange transition-colors cursor-default"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </span>
              <span
                className="hover:text-orange transition-colors cursor-default"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <FooterLink>Study Guides</FooterLink>
              <FooterLink>Past Papers</FooterLink>
              <FooterLink>Sample Tests</FooterLink>
              <FooterLink>Video Lectures</FooterLink>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Subjects
            </h3>
            <ul className="space-y-2">
              <FooterLink>Mathematics</FooterLink>
              <FooterLink>English</FooterLink>
              <FooterLink>Science</FooterLink>
              <FooterLink>Social Studies</FooterLink>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <FooterLink>Terms of Use</FooterLink>
              <FooterLink>Privacy Policy</FooterLink>
              <FooterLink>Cookie Policy</FooterLink>
              <FooterLink>Disclaimer</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {year} PECTAA Prep. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              className="underline hover:text-white/80 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
