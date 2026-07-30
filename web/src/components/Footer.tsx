export default function Footer() {
  return (
    <footer className="bg-brand-card border-t border-brand-border py-12 px-6 mt-20 text-brand-muted text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 text-xl font-black tracking-tight text-white mb-2">
            <img
              src="/checkmate-logo.jpg"
              alt="Checkmate Media Logo"
              className="w-9 h-9 rounded-md object-cover border border-brand-accent/50 shadow-sm"
            />
            <div className="flex items-center gap-1.5 font-sans">
              <span className="text-white uppercase tracking-wider font-bold">CHECKMATE</span>
              <span className="text-brand-accent uppercase tracking-wider font-bold">MEDIA</span>
            </div>
          </div>
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
