import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Menu,
  X,
  ArrowRight,
  MessageCircle,
  Upload,
  ImageIcon,
  Trash2,
} from "lucide-react";

export default function Home() {
  {/*/8const [products, setProducts] = React.useState([]);*/}
  const [sheetProducts, setSheetProducts] = useState([]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [attachedImages, setAttachedImages] = useState<{ file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const newImages = files
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, 5 - attachedImages.length)
      .map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setAttachedImages((prev) => [...prev, ...newImages]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setAttachedImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    console.log(sheetProducts);
    
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
  fetch("https://opensheet.elk.sh/1EvuTmh7NeEuPh6xpXX4gaMt19Se-EaBQsu3x3pt0bJ4/Form%20Responses%201")
    .then(res => res.json())
    .then(data => {
      setSheetProducts(data);
    });
}, []);
  {/*const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setAttachedImages([]);
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };*/}
  const handleFormSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const phoneNumber = "919468962444"; // 👉 your WhatsApp number

  // 📸 Image note (WhatsApp web can't send images directly from browser)
  const imageNote =
    attachedImages.length > 0
      ? `\n\nAttached Images: ${attachedImages.length} image(s) selected`
      : "";

  const message = `🙏 New Enquiry from Website

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}

📝 Message:
${formData.message}${imageNote}

📍 Sent via website`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");

  // reset form
  setFormData({ name: "", email: "", phone: "", message: "" });
  setAttachedImages([]);
};

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };


 

  const staticProducts = [
    {
      name: "Lord Ganesha",
      description: "Hand-carved pure white marble Ganesha idol. A symbol of wisdom, prosperity and new beginnings.",
      image: "/images/ganesh-idol.png",
      size: "Available in 6\", 12\", 18\" & custom",
    },
    {
      name: "Jain Idol",
      description: "Hand-carved pure white & black marble Jain idol. A symbol of wisdom, prosperity and new beginnings.",
      image: "/images/jain-idol.png",
      hoverImage: "/images/jain-idol 2.jpeg", 
      size: "Available in 6\", 12\", 18\" & custom",
    },
    {
      name: "Personality Statue",
      description: "Hand-carved pure white & black marble personality statue.",
      image: "/images/personal-statu.png",
      size: "Available in 24\", 36\", 50\" & custom",
    },
    {
      name: "Shiva Nataraja",
      description: "Exquisite Nataraja sculpture depicting the cosmic dance of Lord Shiva, finely chiselled in white marble.",
      image: "/images/shiva-idol.png",
      size: "Available in 12\", 18\", 24\" & custom",
    },
    {
      name: "Goddess Lakshmi",
      description: "Graceful Lakshmi idol in premium white marble with gold-toned finishing details. Brings wealth and fortune.",
      image: "/images/lakshmi-idol.png",
      size: "Available in 9\", 12\", 18\" & custom",
    },
    {
      name: "Goddess Saraswati",
      description: "Beautifully detailed Saraswati idol in pure marble, carrying the veena, symbolising art and learning.",
      image: "/images/saraswati-idol.png",
      size: "Available in 12\", 18\", 24\" & custom",
    },
    {
      name: "Goddess Durga",
      description: "Majestic Durga Maa idol carved from a single block of white marble with stunning detail and devotion.",
      image: "/images/durga-idol.png",
      size: "Available in 12\", 18\", 36\" & custom",
    },
    {
      name: "Lord Hanuman",
      description: "Powerful Hanuman idol in fine white marble, carved with sacred geometry and intricate detailing.",
      image: "/images/hanuman-idol.png",
      size: "Available in 9\", 12\", 24\" & custom",
    },
  ];

  const features = [
    { title: "Pure White Marble", description: "We use only premium Makrana and Italian white marble — the finest material for sacred idols." },
    { title: "Master Craftsmen", description: "Each idol is carved by skilled artisans with generations of experience in sacred sculpture." },
    { title: "Custom Orders", description: "Bespoke idols made to your specifications — size, pose, deity, and finish." },
    { title: "Nationwide Delivery", description: "Safe, padded packaging and insured shipping to temples and homes across India and abroad." },
  ];

  const stats = [
    { value: "30+", label: "Years of Craft" },
    { value: "5,000+", label: "Idols Delivered" },
    { value: "200+", label: "Happy Temples" },
    { value: "18+", label: "Deity Collections" },
  ];
 const convertDriveLink = (url) => {
  if (!url) return "";

  // Handle multiple links (comma separated)
  const first = url.split(",")[0].trim();

  // Extract file ID
  const match = first.match(/[-\w]{25,}/);

  if (match) {
    return `https://lh3.googleusercontent.com/d/${match[0]}`;
  }

  return "";
};
  

const clean = (obj, key) => {
  return Object.keys(obj).find(k => k.trim() === key)?.trim();
};

const allProducts = [
  ...staticProducts.map((p) => ({
    ...p,
    images: [p.image, p.hoverImage].filter(Boolean),
  })),

  ...sheetProducts.map((p) => {
    const get = (key) =>
      Object.keys(p).find((k) => k.trim() === key);

    const raw = p[get("Image Upload 1")] || "";

    // 👉 split multiple uploaded images
    const images = raw
      .split(",")
      .map((url) => convertDriveLink(url.trim()))
      .filter(Boolean);

    return {
      name: p[get("Product Name")] || "",
      description: p[get("Description")] || "",
      size: p[get("Size")] || "",
      images,
    };
  }),
];
  const navLinks = ["Home", "About Us", "Collection", "Contact"];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex flex-col cursor-pointer" onClick={() => scrollTo("home")}>
            <span className="text-xl font-serif font-bold tracking-wider text-primary leading-none">INDRA MOORTI ART</span>
            <span className="text-[12px] uppercase tracking-[0.3em] text-muted-foreground">Marble Idol Manufacturers</span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase().replace(" ", "-"))}
                className="text-sm uppercase tracking-widest hover:text-primary transition-colors font-medium"
              >
                {item}
              </button>
            ))}
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pt-24 px-6 md:hidden">
          <div className="flex flex-col space-y-6 text-center">
            {navLinks.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase().replace(" ", "-"))}
                className="text-xl uppercase tracking-widest font-serif"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/55 z-10" />
          <img
            src="/images/idol-hero.png"
            alt="Marble Idol Craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-6 font-semibold">Handcrafted in Pure Marble</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-bold mb-6 tracking-tight leading-tight">
            Sculpted with<br />Devotion & Grace.
          </h1>
          <p className="text-lg md:text-xl text-white/85 mb-10 font-light tracking-wide max-w-2xl mx-auto">
            Premium Marble Idols, Jain Idols, Vedi & Chhatri, and Handcrafted Creations — meticulously hand-carved by master artisans for temples, homes, and sacred spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-sm uppercase tracking-widest rounded-none border border-primary transition-all duration-300"
              onClick={() => scrollTo("collection")}
            >
              View Collection
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-foreground px-8 py-6 text-sm uppercase tracking-widest rounded-none transition-all duration-300 bg-transparent"
              onClick={() => scrollTo("contact")}
            >
              Request a Quote
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-white/50">
          <div className="w-px h-10 bg-white/30 animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest mt-2">Scroll</span>
        </div>
      </section>
       {/* END OF HERO */}


{/* ✅ ADD HERE (INSIDE RETURN) */}
<section id="owner" style={{ padding: "60px 20px", background: "#f9f9f9" }}>
  <div style={{ maxWidth: "1100px", margin: "auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px" }}>

    <div style={{ flex: "1", minWidth: "280px" }}>
      <img
        src="/images/owner.jpg"
        alt="Owner"
        style={{ width: "100%", borderRadius: "12px" }}
      />
    </div>

    <div style={{ flex: "1", minWidth: "280px" }}>
      <h2>About the Owner</h2>
      <p>Welcome to Indra Moorti Art...</p>
    </div>

  </div>
</section>


{/* Stats Bar */}
<section className="bg-primary py-10"></section>

      {/* Stats Bar */}
      <section className="bg-primary py-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-primary-foreground/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about-us" className="py-24 bg-secondary">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-bold">The Indra Moorti Art Standard</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-6 text-foreground">A Legacy of Sacred Craft</h3>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              For over 30 years, Indra Moorti Art has been bringing the divine to life through stone. Every idol we create is not
              just a sculpture — it is a vessel of devotion, shaped by hands that have spent lifetimes learning this sacred craft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-8 border border-border/50 bg-card hover:border-primary/40 transition-colors group">
                <CheckCircle2 className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="text-xl font-serif mb-3">{feature.title}</h4>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-bold">Our Sacred Collection</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-foreground">Handcrafted Marble Idols</h3>
            </div>
            <Button
              variant="outline"
              className="rounded-none border-foreground hover:bg-foreground hover:text-background uppercase tracking-widest text-xs px-6 py-5"
              onClick={() => scrollTo("contact")}
            >
              Custom Order
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {allProducts.map((product, idx) => (
  <div key={idx} className="group cursor-pointer" onClick={() => scrollTo("contact")}>

    {/* IMAGE CARD */}
    <div className="overflow-hidden mb-6 aspect-[3/4] relative bg-secondary">
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />

      <div className="relative w-full h-full overflow-hidden">

  {/* First Image */}
  <img
    src={product.images?.[0] || "/images/placeholder.png"}
    alt={product.name}
    className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1200ms] ease-in-out
      ${product.images?.length > 1 ? "" : "group-hover:scale-105"}
    `}
  />

  {/* Hover Images (only if more than 1) */}
  {product.images?.length > 1 &&
    product.images.slice(1).map((img, i) => (
      <img
        key={i}
        src={img}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover 
                   opacity-0 group-hover:opacity-100 
                   transition-all duration-[1200ms] ease-in-out"
        style={{ transitionDelay: `${i * 800}ms` }}
      />
    ))}

</div>
    </div>

    {/* TEXT CONTENT */}
    <div>
      <h4 className="text-2xl font-serif mb-2">{product.name}</h4>
      <p className="text-muted-foreground font-light text-sm mb-2 leading-relaxed">
        {product.description}
      </p>
      <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-3">
        {product.size}
      </p>
    </div>

  </div>
))}
                  {/*<div className="absolute top-4 right-4 z-20 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Enquire Now
                  </div>
                </div>
                <h4 className="text-2xl font-serif mb-2">{product.name}</h4>
                <p className="text-muted-foreground font-light text-sm mb-2 leading-relaxed">{product.description}</p>
                <p className="text-xs text-primary uppercase tracking-wider font-semibold mb-3">{product.size}</p>
                <div className="flex items-center text-foreground text-sm uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Request Quote <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>*/}
            
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-foreground text-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-bold">How We Work</h2>
            <h3 className="text-4xl md:text-5xl font-serif">From Stone to Sanctity</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { step: "01", title: "Choose Your Deity", desc: "Browse our collection or describe your custom idol requirements." },
              { step: "02", title: "Select Marble & Size", desc: "Pick from premium Makrana, Italian, or other marble varieties." },
              { step: "03", title: "Master Carving", desc: "Our artisans begin the sacred work — each chisel stroke guided by devotion." },
              { step: "04", title: "Safe Delivery", desc: "Professionally packed and delivered to your doorstep or temple." },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-5xl font-serif text-primary/30 font-bold mb-3">{item.step}</div>
                <h4 className="text-lg font-serif mb-2 text-white">{item.title}</h4>
                <p className="text-white/50 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-secondary">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-primary mb-4 font-bold">Get in Touch</h2>
              <h3 className="text-4xl md:text-5xl font-serif mb-6">Send Us a Query</h3>
              <p className="text-muted-foreground font-light leading-relaxed mb-10">
                Interested in an idol or want a custom sculpture made for your temple or home? Leave us a message and our team
                will get back to you within 24 hours.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold uppercase tracking-wider text-sm mb-1">Workshop & Showroom</h5>
                    <p className="text-muted-foreground font-light text-sm">
                      2465, Khanjane Walon ka Rasta, 3rd Crossing, Chandpole Bazar, Chandpole, Pink City,<br />Jaipur, Rajasthan — 302001
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold uppercase tracking-wider text-sm mb-1">Phone</h5>
                    <p className="text-muted-foreground font-light text-sm">+91 98280 19860/+91 94689 62444</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-bold uppercase tracking-wider text-sm mb-1">Email</h5>
                    <p className="text-muted-foreground font-light text-sm">sharmamk.153@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="p-5 border border-primary/30 bg-primary/5">
                <p className="text-sm text-muted-foreground font-light">
                  <span className="font-semibold text-foreground">Custom orders welcome.</span> We craft idols for temples,
                  homes, gifts, and institutional installations. Minimum order and bulk pricing available.
                </p>
              </div>
            </div>

            <Card className="rounded-none border-border shadow-xl bg-card">
              <CardContent className="p-8 md:p-10">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold">Full Name</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="rounded-none border-border bg-transparent focus-visible:ring-primary focus-visible:border-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-bold">Email Address</label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="rounded-none border-border bg-transparent focus-visible:ring-primary focus-visible:border-primary"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-bold">Phone Number</label>
                      <Input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="rounded-none border-border bg-transparent focus-visible:ring-primary focus-visible:border-primary"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-bold">Your Message / Idol Requirements</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="rounded-none border-border bg-transparent focus-visible:ring-primary focus-visible:border-primary min-h-[150px] resize-none"
                      placeholder="Tell us which deity, size, marble type, and any special requirements..."
                    />
                  </div>
                  {/* Image Attachment */}
                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-wider font-bold">
                      Attach Images <span className="text-muted-foreground font-normal normal-case">(optional, up to 5)</span>
                    </label>

                    {/* Drop zone / trigger */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={attachedImages.length >= 5}
                      className="w-full border border-dashed border-border hover:border-primary/60 bg-transparent hover:bg-primary/5 transition-colors p-6 flex flex-col items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {attachedImages.length >= 5
                          ? "Maximum 5 images reached"
                          : "Click to upload images"}
                      </span>
                      <span className="text-xs text-muted-foreground/70">JPG, PNG, WEBP supported</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageAttach}
                    />

                    {/* Image previews */}
                    {attachedImages.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {attachedImages.map((img, idx) => (
                          <div key={idx} className="relative group aspect-square">
                            <img
                              src={img.preview}
                              alt={`Attachment ${idx + 1}`}
                              className="w-full h-full object-cover border border-border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                              aria-label="Remove image"
                            >
                              <Trash2 className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        ))}
                        {/* Empty slots */}
                        {Array.from({ length: Math.max(0, 5 - attachedImages.length) }).map((_, idx) => (
                          <button
                            key={`empty-${idx}`}
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square border border-dashed border-border/50 hover:border-primary/40 flex items-center justify-center transition-colors"
                          >
                            <ImageIcon className="w-4 h-4 text-border" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground">We'll get back to you within 24 hours.</p>
                  <Button
                    type="submit"
                    disabled={formStatus !== "idle"}
                    className="w-full rounded-none bg-primary hover:bg-primary/90 text-primary-foreground py-6 uppercase tracking-widest text-sm transition-all"
                  >
                    {formStatus === "submitting" ? "Sending..." : formStatus === "success" ? "Query Sent ✓" : "Send Query"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-2xl font-serif font-bold tracking-wider text-primary mb-2">INDRA MOORTI ART</h2>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-5">Marble Idol Manufacturers</p>
              <p className="text-white/60 font-light leading-relaxed max-w-sm">
                Handcrafted marble idols made with devotion, tradition, and mastery. Serving temples and homes since 1980.
              </p>
            </div>
            <div>
          
              
              <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-white/60 font-light text-sm">
                <li><button onClick={() => scrollTo("home")} className="hover:text-primary transition-colors">Home</button></li>
                <li><button onClick={() => scrollTo("about-us")} className="hover:text-primary transition-colors">About Us</button></li>
                <li><button onClick={() => scrollTo("collection")} className="hover:text-primary transition-colors">Collection</button></li>
                <li><button onClick={() => scrollTo("contact")} className="hover:text-primary transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
              <div className="mt-8">
                <a
                  href="https://wa.me/916468962444"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#1ebe57] text-white px-4 py-2 text-sm font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-white/10 text-center md:text-left text-white/40 text-xs font-light flex flex-col md:flex-row justify-between">
            <p>&copy; {new Date().getFullYear()} Indra Moorti Art — Marble Idol Manufacturers. All rights reserved.</p>
            <div className="mt-4 md:mt-0 space-x-6">
              <div className="flex items-center justify-center md:justify-start gap-2 text-white/80">
  <span>Made with</span>
  <span className="text-red-500 animate-pulse text-lg">❤️</span>
  {/*<span>by Indra Moorti Art</span>*/}
</div>
              {/*<a href="#" className="hover:text-white transition-colors">Made with love </a>
              {/*<a href="#" className="hover:text-white transition-colors">Terms of Service</a>*/}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919468962444"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe57] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-foreground text-background text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-medium shadow-lg">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
