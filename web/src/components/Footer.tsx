export default function Footer() {
  return (
    <footer className="bg-brand-card border-t border-brand-border py-12 px-6 mt-20 text-brand-muted text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-bold text-white text-lg tracking-wider">CHECKMATE MEDIA</span>
          <p className="text-xs text-brand-muted mt-1">Independent Journalism. Stories That Matter.</p>
        </div>
        <div className="flex gap-6 text-xs">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Editorial Standards</span>
          <span>Contact</span>
        </div>
        <p className="text-xs">© 2026 Checkmate Media. All rights reserved.</p>
      </div>
    </footer>
  );
}
