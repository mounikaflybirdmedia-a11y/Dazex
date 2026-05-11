import { useState } from "react";
import { Phone, Mail, MapPin, Globe, Ship, Plane, Truck, Package, ShieldCheck, Globe2, ArrowRight, MessageCircle, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import logo from "./assets/dazex-logo.png";
import hero from "./assets/hero-port.jpg";

const WHATSAPP_NUMBER = "917075707683"; // Srikar Kashetty
const waLink = (service?: string) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
    service
      ? `Hi Srikar, I'd like to enquire about Dazex's ${service} service.`
      : `Hi Srikar, I'd like to know more about Dazex.`
  )}`;

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Services />
      <About />
      <Stats />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Dazex on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-elegant hover:scale-105 transition-transform animate-float"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/95">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center gap-3">
          <img src={logo} alt="Dazex logo" className="h-20 md:h-24 w-auto object-contain" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-navy-deep">
          <a href="#top" className="hover:text-brand-blue transition-colors">Home</a>
          <a href="#services" className="hover:text-brand-blue transition-colors">Services</a>
          <a href="#about" className="hover:text-brand-blue transition-colors">About</a>
          <a href="#contact" className="hover:text-brand-blue transition-colors">Contact</a>
        </nav>
        <QuoteModal />
      </div>
    </header>
  );
}

function QuoteModal() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    service: "",
    requirement: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi Srikar, I'd like to request a quote for my shipment:
    
👤 *Name:* ${formData.name}
🏢 *Company:* ${formData.company}
📞 *Phone:* ${formData.phone}
🚢 *Service:* ${formData.service || "General Inquiry"}
📝 *Requirement:* ${formData.requirement}`;

    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant hover:shadow-glow transition-all cursor-pointer">
          Get a Quote <ArrowRight className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-brand-navy-deep">Request a Quote</DialogTitle>
          <DialogDescription>
            Fill out your cargo requirements and we'll get back to you immediately on WhatsApp.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+91..."
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="service">Service Type</Label>
            <select
              id="service"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            >
              <option value="">Select a service</option>
              <option value="Sea Freight">Sea Freight</option>
              <option value="Air Freight">Air Freight</option>
              <option value="Road Logistics">Road Logistics</option>
              <option value="Customs Clearance">Customs Clearance</option>
              <option value="Global Sourcing">Global Sourcing</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="requirement">Your Requirements</Label>
            <Textarea
              id="requirement"
              placeholder="Briefly describe your shipment (Origin, Destination, Weight, etc.)"
              required
              className="min-h-[100px]"
              value={formData.requirement}
              onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-elegant hover:shadow-glow transition-all"
          >
            Send Requirement <Send className="h-4 w-4" />
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
      <img src={hero} alt="Global shipping port at sunset" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-deep via-brand-navy-deep/85 to-brand-navy-deep/30" />
      <div className="relative container mx-auto px-6 py-32">
        <div className="max-w-3xl text-primary-foreground animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wider uppercase backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" style={{ background: "var(--brand-gold)" }} />
            Trade Beyond Boundaries
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-[1.05]">
            Connecting <span className="text-gold">commerce</span> across continents.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">
            Dazex is your trusted import & export partner — delivering goods, opening markets, and powering global trade from Hanamkonda to the world.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#services" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-navy-deep hover:bg-white/90 transition-all shadow-elegant">
              Our Services <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all">
              Talk to Srikar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  { icon: Ship, title: "Sea Freight", desc: "Cost-efficient ocean shipping with full container and consolidated cargo options worldwide." },
  { icon: Plane, title: "Air Freight", desc: "Fast, reliable air cargo for time-sensitive shipments to every major hub." },
  { icon: Truck, title: "Road Logistics", desc: "Door-to-door domestic and cross-border trucking with real-time tracking." },
  { icon: Package, title: "Customs Clearance", desc: "End-to-end documentation, duties and compliance handled by experts." },
  { icon: ShieldCheck, title: "Trade Compliance", desc: "Stay compliant across markets with our regulatory and licensing support." },
  { icon: Globe2, title: "Global Sourcing", desc: "Access vetted suppliers and buyers across Asia, Europe and the Americas." },
];

function Services() {
  return (
    <section id="services" className="py-28 bg-secondary/40">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wider uppercase text-brand-blue">What we do</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Import & export, end to end.</h2>
          <p className="mt-4 text-muted-foreground text-lg">From sourcing to delivery, Dazex handles every link in your supply chain so you can focus on growing your business.</p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {services.map((s) => (
            <div key={s.title} className="group flex flex-col h-full rounded-2xl border border-border bg-card p-8 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-elegant group-hover:shadow-glow transition-shadow">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground flex-grow">{s.desc}</p>
              <a
                href={waLink(s.title)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Enquire about ${s.title} on WhatsApp`}
                className="mt-8 inline-flex items-center gap-2 self-start rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-sm mt-auto"
              >
                <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-28">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative flex items-center justify-center min-h-[420px]">
          <img src={logo} alt="Dazex" className="relative w-full max-w-md animate-float" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wider uppercase text-brand-blue">About Dazex</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Built on trust. Driven by global ambition.</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Founded by <span className="font-semibold text-foreground">Srikar Kashetty</span>, Dazex is a Hanamkonda-based import & export company committed to making global trade simple, transparent and dependable for businesses of every size.
          </p>
          <p className="mt-4 text-muted-foreground">
            Our promise is in our tagline — <span className="italic">Trade Beyond Boundaries</span>. From the first inquiry to final delivery, we move your goods with care, speed and accountability.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <Pill label="Owner" value="Srikar Kashetty" />
            <Pill label="HQ" value="Hanamkonda, India" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-5 py-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}

function Stats() {
  const items = [
    { n: "50+", l: "Global Routes" },
    { n: "24/7", l: "Cargo Support" },
    { n: "100%", l: "Compliance Focus" },
    { n: "1-Stop", l: "Logistics Partner" },
  ];
  return (
    <section className="py-20 bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((i) => (
          <div key={i.l} className="text-center">
            <p className="text-4xl md:text-5xl font-bold text-gold">{i.n}</p>
            <p className="mt-2 text-sm uppercase tracking-wider text-white/70">{i.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-28">
      <div className="container mx-auto px-6">
        <div className="rounded-3xl bg-gradient-hero p-10 md:p-16 text-primary-foreground shadow-elegant relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-brand-blue/30 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-sm font-semibold tracking-wider uppercase text-gold">Get in touch</p>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold">Let's move your cargo, anywhere.</h2>
              <p className="mt-4 text-white/80 text-lg max-w-md">
                Reach out for a quote, partnership, or to discuss your next shipment. We respond within 24 hours.
              </p>
            </div>
            <div className="space-y-5">
              <ContactRow icon={Phone} label="Call us" lines={["+91 70757 07683", "+91 70937 03193"]} />
              <ContactRow icon={Mail} label="Email" lines={["contact@dazex.com"]} />
              <ContactRow icon={Globe} label="Website" lines={["www.dazex.com"]} />
              <ContactRow icon={MapPin} label="Visit" lines={["2-7-444, Exide Colony,", "Road No. 9, Hanamkonda."]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, lines }: { icon: any; label: string; lines: string[] }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur border border-white/20">
        <Icon className="h-5 w-5 text-gold" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-white/60">{label}</p>
        {lines.map((l) => (
          <p key={l} className="font-semibold">{l}</p>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-white py-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Dazex" className="h-16 w-auto object-contain" />
        </div>
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Dazex. Trade Beyond Boundaries.</p>
      </div>
    </footer>
  );
}

export default App;
