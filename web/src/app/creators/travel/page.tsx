import Link from 'next/link';
import { 
  Plane, Map, Camera, Globe, ArrowRight, CheckCircle, 
  Ticket, MapPin, Compass, PlayCircle, Star
} from 'lucide-react';

export const metadata = {
  title: "Travel Agencies & Vloggers | Alamia OTT",
  description: "Take Your Audience on a Journey. Build Your Travel Business.",
};

export default function TravelCreatorsPage() {
  return (
    <div className="min-h-screen bg-brand-dark text-foreground">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Abstract Background Elements (No images) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surface border border-brand-border text-brand-goldLight text-sm font-semibold tracking-wide uppercase shadow-lg">
            <Compass className="w-4 h-4" /> For Travel Agencies & Adventure Vloggers
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Take Your Audience on a Journey.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-goldLight via-brand-accent to-amber-700">
              Build Your Travel Business.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-brand-muted max-w-2xl leading-relaxed">
            Showcase breathtaking destinations in 4K, sell exclusive tour packages directly beneath your videos, and monetize your global adventures.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
            <Link href="#start" className="group inline-flex items-center justify-center gap-2 gold-gradient-bg hover:opacity-90 text-brand-dark px-8 py-4 rounded-xl font-extrabold text-lg transition-all gold-glow-hover w-full sm:w-auto">
              Launch Your Travel Channel <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRAVEL VALUE PROPOSITION GRID */}
      <section className="px-6 py-20 bg-brand-surface/30 border-y border-brand-border">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">More Than Just Vlogs. It's a Booking Engine.</h2>
            <p className="text-brand-muted text-lg">Turn passive viewers into active travelers with deeply integrated features.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Camera, title: 'Cinematic HLS Streams', desc: 'Deliver stutter-free, high-definition travel documentaries globally.' },
              { icon: Ticket, title: 'Direct Tour Bookings', desc: 'Embed direct booking and ticketing links right below your destination videos.' },
              { icon: MapPin, title: 'Interactive Itineraries', desc: 'Share detailed maps and daily guides alongside your travel series.' },
              { icon: Globe, title: 'Global Audience', desc: 'Reach international travelers without algorithm restrictions.' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-brand-card border border-brand-border rounded-2xl p-8 space-y-4 hover:border-brand-accent/50 hover:-translate-y-1 transition-all group shadow-lg">
                <div className="w-14 h-14 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-brand-accent" />
                </div>
                <h3 className="font-bold text-xl text-white">{feature.title}</h3>
                <p className="text-brand-muted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MONETIZATION STRATEGIES */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              Monetize Your <br/>
              <span className="text-brand-accent">Global Expeditions</span>
            </h2>
            <p className="text-xl text-brand-muted">
              Stop relying solely on ad-revenue. Our platform enables travel agencies and creators to build premium digital products.
            </p>
            
            <ul className="space-y-6 pt-4">
              {[
                { title: 'Premium Virtual Tours', desc: 'Lock exclusive, deeply researched destination guides behind a paywall.' },
                { title: 'Sponsored Travelogues', desc: 'Publish ad-free videos sponsored directly by tourism boards and hotels.' },
                { title: 'Exclusive Community', desc: 'Offer premium memberships for one-on-one travel consultation and Q&A sessions.' }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 rounded-xl transition-all border border-transparent hover:border-brand-border hover:shadow-sm">
                  <div className="mt-1 bg-brand-accent/20 p-2 rounded-full">
                    <Star className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{item.title}</h4>
                    <p className="text-brand-muted">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-brand-card border border-brand-border rounded-3xl p-10 relative overflow-hidden group shadow-2xl h-full flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 text-brand-accent font-bold tracking-widest uppercase text-sm mb-4">
                <PlayCircle className="w-5 h-5" /> The Checkmate Advantage
              </div>
              <h3 className="text-3xl font-extrabold text-white leading-snug">
                "We turned our YouTube travel vlogs into a full-scale booking engine."
              </h3>
              <p className="text-brand-muted text-lg leading-relaxed">
                By hosting our premium documentaries on our own channel, we can guide viewers directly to our custom tour packages without losing them to recommended competitor videos.
              </p>
              
              <div className="pt-6 border-t border-brand-border flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-surface border-2 border-brand-accent flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-bold">Global Adventures Agency</div>
                  <div className="text-brand-muted text-sm">Verified Travel Partner</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section id="start" className="px-6 py-24 pb-32 border-t border-brand-border">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Ready to share the world?
          </h2>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto">
            Join the premier platform for independent travel creators and agencies. Start broadcasting your journeys today.
          </p>
          <div className="pt-8">
            <Link href="/" className="inline-block bg-brand-accent hover:bg-brand-goldLight text-brand-dark px-10 py-5 rounded-xl font-extrabold text-lg transition-colors shadow-lg">
              Start Your Travel Channel
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}
