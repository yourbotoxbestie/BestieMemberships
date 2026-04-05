import { useState, useEffect } from "react";

const SERVICES = {
  injectables: {
    title: "Injectable Treatments",
    subtitle: "Neurotoxins, fillers, and biostimulators — precision artistry by Brittany McBride, RN",
    items: [
      { name: "Botox", desc: "Smooth forehead lines, frown lines, and crow's feet with the gold standard in neurotoxins. Results in 7–14 days, lasts 3–4 months.", price: "Starting at $14/unit", tag: "Most Popular", icon: "💉" },
      { name: "Dysport", desc: "A softer-spreading neurotoxin ideal for larger areas like the forehead. Natural-looking results that last 3–4 months.", price: "Starting at $5/unit", icon: "💉" },
      { name: "Xeomin", desc: "A pure-form neurotoxin with no additives. Great for patients who want a clean formula or have built tolerance to other brands.", price: "Starting at $14/unit", icon: "💉" },
      { name: "Dermal Fillers", desc: "Hyaluronic acid fillers to restore volume in cheeks, lips, jawline, under-eyes, and nasolabial folds. Immediate, natural-looking results lasting 6–18 months.", price: "Starting at $600/syringe", icon: "✨" },
      { name: "Lip Filler", desc: "Add volume, shape, and definition to your lips. We specialize in natural, balanced results — never overdone.", price: "Starting at $600/syringe", tag: "Fan Favorite", icon: "💋" },
      { name: "Sculptra", desc: "A biostimulator that rebuilds your skin's own collagen over time. Ideal for volume loss, skin laxity, and full-face rejuvenation. Results develop over 3–6 months and last up to 2 years.", price: "Starting at $900/vial", icon: "🔬" },
      { name: "Radiesse", desc: "An injectable biostimulator that provides immediate volume and stimulates long-term collagen production. Great for cheeks, jawline, and hands.", price: "Starting at $750/syringe", icon: "🔬" },
    ]
  },
  skin: {
    title: "Skin Rejuvenation",
    subtitle: "Advanced treatments to transform your skin's texture, tone, and clarity",
    items: [
      { name: "Medical Microneedling", desc: "Controlled micro-injuries trigger your skin's natural collagen remodeling process. Improves fine lines, acne scars, pore size, and overall skin texture. Series of 3–6 treatments recommended.", price: "Starting at $350/session", icon: "🪡" },
      { name: "Bestie Signature Facial", desc: "Our customized facial tailored to your skin type and concerns. Includes deep cleanse, exfoliation, extractions, peptide serum application, and LED therapy. 60 minutes of pure glow.", price: "Starting at $125", tag: "Signature Service", icon: "🧖‍♀️" },
      { name: "Peptide Glow Facial", desc: "Our premium facial featuring GHK-Cu copper peptide serum as the hero active ingredient. Everything in the Signature Facial plus targeted peptide infusion for enhanced collagen support and radiance.", price: "Starting at $165", tag: "Premium", icon: "✨" },
      { name: "Chemical Peel", desc: "Professional-grade exfoliation to address texture, hyperpigmentation, acne, and dullness. We offer superficial to medium-depth peels customized to your skin's needs and tolerance.", price: "Starting at $150", icon: "🌟" },
      { name: "Dermaplaning", desc: "Gentle exfoliation that removes dead skin cells and peach fuzz, leaving skin silky smooth and allowing better product penetration. Perfect before any facial treatment.", price: "Starting at $85", icon: "🪒" },
    ]
  },
  wellness: {
    title: "Wellness Programs",
    subtitle: "Medical weight management supervised by licensed providers",
    items: [
      { name: "Semaglutide Weight Management", desc: "A supervised medical weight loss program using FDA-approved GLP-1 medication. Includes initial consultation, monthly check-ins, dosage management, and ongoing clinical support.", price: "Starting at $500/month", icon: "⚖️" },
    ]
  },
  peptides: {
    title: "Peptide Skincare Collection",
    subtitle: "Professional-grade copper peptide products available for retail and used in all our facial treatments",
    items: [
      { name: "GHK-Cu Peptide Serum", desc: "Our hero product. Copper peptide serum that supports collagen production, improves skin firmness, and promotes a radiant, youthful glow. Apply morning and night after cleansing.", price: "$95", tag: "Hero Product", icon: "💧" },
      { name: "Peptide Eye Complex", desc: "Targeted copper peptide formula for the delicate eye area. Addresses dark circles, puffiness, crepiness, and fine lines.", price: "$75", icon: "👁️" },
      { name: "Peptide Hair & Scalp Serum", desc: "GHK-Cu and AHK-Cu copper peptides in a lightweight scalp serum to support fuller, healthier-looking hair and a balanced scalp.", price: "$85", icon: "💇‍♀️" },
      { name: "Barrier Repair Moisturizer", desc: "Peptide-infused moisturizer with ceramides and squalane that strengthens the skin barrier and locks in treatment results.", price: "$62", icon: "🧴" },
      { name: "Bestie Peptide Protocol", desc: "The complete 5-product system: cleanser, GHK-Cu serum, eye complex, barrier repair moisturizer, and mineral SPF. Your full at-home routine, curated by us.", price: "$340", tag: "Best Value", icon: "📋" },
    ]
  }
};

const MEMBERSHIPS = [
  {
    id: "glow", name: "Glow Getter", emoji: "🌸", tag: "Most Popular",
    price: 99, priceTo: 129, interval: "month",
    description: "Your entry into consistent, glow-maintaining skincare with monthly professional treatments and insider perks.",
    includes: [
      { text: "1 Bestie Signature Facial every month", highlight: true },
      { text: "10% off all skincare retail products" },
      { text: "Birthday month bonus treatment" },
      { text: "Early access to new services and products" },
      { text: "Complimentary skin analysis at enrollment" },
    ],
    idealFor: "You want consistent professional skincare, save on products, and start building a real routine.",
    savings: "Save $30–$50/month vs. paying per visit",
    color: "#D4548A",
    bg: "linear-gradient(135deg, #fdf0f5 0%, #fce8f0 100%)",
  },
  {
    id: "vip", name: "Bestie VIP", emoji: "💎", tag: "Best Value",
    price: 179, priceTo: 229, interval: "month",
    description: "The full Bestie experience — premium peptide facials, skincare perks, and priority access to injectable appointments.",
    includes: [
      { text: "1 Peptide Glow Facial every month (our premium facial)", highlight: true },
      { text: "Peptide serum sample with every visit", highlight: true },
      { text: "15% off all skincare retail products" },
      { text: "Priority booking for injectable appointments" },
      { text: "Birthday month bonus treatment" },
      { text: "Exclusive VIP-only promotions and events" },
      { text: "Complimentary skin analysis at enrollment" },
      { text: "Personalized skincare protocol consultation" },
    ],
    idealFor: "You are serious about your skin and want premium treatments, a curated peptide routine, and first access to injectables.",
    savings: "Save $75–$120/month vs. paying per visit + retail",
    color: "#C9A96E",
    bg: "linear-gradient(135deg, #fdf8f0 0%, #f8f0e0 100%)",
  },
];

const FAQS = [
  { q: "Where is Bestie Beauty Bar located?", a: "We are located at 3467 Merrick Road, Suite 206, Wantagh, NY 11793 on Long Island. We serve clients from Wantagh, Bellmore, Merrick, Seaford, Massapequa, and throughout Nassau County." },
  { q: "Who performs the injectable treatments?", a: "All injectable treatments are performed by Brittany McBride, RN — a licensed registered nurse with specialized training in aesthetic injection techniques, under medical direction as required by New York State law." },
  { q: "What is a peptide facial?", a: "Our peptide facials use GHK-Cu copper peptide serums — proteins that support your skin's natural collagen production. The Bestie Signature Facial includes peptide serum application, and the Peptide Glow Facial features an enhanced copper peptide infusion for maximum results." },
  { q: "What are copper peptides (GHK-Cu)?", a: "GHK-Cu is a naturally occurring copper peptide that supports collagen synthesis, skin firmness, and overall skin quality. We use it in our facial treatments and carry a full retail line of copper peptide skincare products." },
  { q: "How does membership billing work?", a: "Memberships are billed monthly via auto-pay. We accept all major credit cards. We ask for a 3-month initial commitment, after which you can cancel with 30 days notice." },
  { q: "Can I cancel my membership?", a: "After your initial 3-month commitment, you can cancel anytime with 30 days notice. No penalties, no fees." },
  { q: "What if I miss my monthly facial?", a: "Unused facials roll over for one month. You will always have time to use what you have earned." },
  { q: "Do I need to be an existing client to join?", a: "No. Memberships are open to everyone. Your first visit includes a complimentary skin analysis so we can customize everything to your skin." },
  { q: "Is Botox safe?", a: "Botox (onabotulinumtoxinA) is FDA-approved and has been used safely in aesthetic medicine for over 20 years. All treatments at Bestie Beauty Bar are performed by a licensed registered nurse under appropriate medical oversight." },
  { q: "How do I book an appointment?", a: "You can book online through our Aesthetic Record booking page, take our free online Skin Analysis quiz for personalized recommendations, or contact us directly." },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #f0e4ea" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "none", border: "none", cursor: "pointer", textAlign: "left",
      }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#2d2d2d", fontFamily: "'DM Sans', sans-serif", flex: 1, paddingRight: 16 }}>{faq.q}</span>
        <span style={{ fontSize: 20, color: "#D4548A", transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0)", flexShrink: 0 }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
        <p style={{ fontSize: 14, color: "#6a5a60", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", paddingBottom: 16, margin: 0 }}>{faq.a}</p>
      </div>
    </div>
  );
}

function ServiceCard({ item }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 20, padding: "22px 20px", border: "1px solid #f0e4ea",
      boxShadow: "0 2px 8px rgba(212,84,138,0.04)", position: "relative", transition: "box-shadow 0.3s",
    }}>
      {item.tag && (
        <div style={{
          position: "absolute", top: 14, right: 14, background: "#D4548A", color: "#fff",
          fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
          fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.5, textTransform: "uppercase",
        }}>{item.tag}</div>
      )}
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "#2d2d2d", margin: "0 0 6px 0", fontFamily: "'DM Sans', sans-serif", paddingRight: item.tag ? 80 : 0 }}>{item.name}</h3>
          <p style={{ fontSize: 13, color: "#6a5a60", lineHeight: 1.6, margin: "0 0 10px 0", fontFamily: "'DM Sans', sans-serif" }}>{item.desc}</p>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#D4548A", fontFamily: "'DM Sans', sans-serif" }}>{item.price}</div>
        </div>
      </div>
    </div>
  );
}

function MembershipCard({ m, featured }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 24, overflow: "hidden", position: "relative",
      border: featured ? "2px solid " + m.color : "1px solid #f0e4ea",
      boxShadow: featured ? "0 8px 32px rgba(212,84,138,0.15)" : "0 2px 12px rgba(0,0,0,0.04)",
    }}>
      {m.tag && (
        <div style={{
          position: "absolute", top: 16, right: 16, background: m.color, color: "#fff",
          fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20,
          fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.5, textTransform: "uppercase",
        }}>{m.tag}</div>
      )}
      <div style={{ background: m.bg, padding: "32px 24px 24px" }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>{m.emoji}</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 700, color: "#2d2d2d", margin: "0 0 8px 0" }}>{m.name}</h3>
        <p style={{ fontSize: 14, color: "#6a5a60", lineHeight: 1.6, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{m.description}</p>
        <div style={{ marginTop: 20 }}>
          <span style={{ fontSize: 14, color: "#8a7a80", fontFamily: "'DM Sans', sans-serif" }}>Starting at</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: 42, fontWeight: 700, color: m.color, fontFamily: "'DM Sans', sans-serif" }}>${m.price}</span>
          <span style={{ fontSize: 16, color: "#8a7a80", fontFamily: "'DM Sans', sans-serif" }}>/{m.interval}</span>
        </div>
      </div>
      <div style={{ padding: "24px" }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#C9A96E", textTransform: "uppercase", fontWeight: 600, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>What's Included</div>
        {m.includes.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
            <span style={{ color: m.color, fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 14, color: item.highlight ? "#2d2d2d" : "#6a5a60", fontWeight: item.highlight ? 600 : 400, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>{item.text}</span>
          </div>
        ))}
        <div style={{ background: m.bg, borderRadius: 12, padding: "12px 16px", marginTop: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: m.color, fontFamily: "'DM Sans', sans-serif" }}>{m.savings}</div>
        </div>
        <div style={{ fontSize: 13, color: "#8a7a80", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", marginBottom: 24 }}>
          <span style={{ fontWeight: 600, color: "#2d2d2d", fontStyle: "normal" }}>Ideal for you if: </span>{m.idealFor}
        </div>
        <a href="https://bestiebeautybar.myaestheticrecord.com/online-booking" target="_blank" rel="noopener noreferrer" style={{
          display: "block", width: "100%", padding: "16px", borderRadius: 50, textAlign: "center",
          background: featured ? "linear-gradient(135deg, " + m.color + ", " + m.color + "dd)" : "#fff",
          color: featured ? "#fff" : m.color, border: featured ? "none" : "2px solid " + m.color,
          fontSize: 15, fontWeight: 700, cursor: "pointer", textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.5, boxSizing: "border-box",
          boxShadow: featured ? "0 4px 16px " + m.color + "40" : "none",
        }}>Join {m.name}</a>
      </div>
    </div>
  );
}

function SectionDivider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "40px 0 8px" }}>
      <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, transparent, #e8d5de)" }} />
      <span style={{ fontSize: 11, letterSpacing: 3, color: "#C9A96E", textTransform: "uppercase", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, #e8d5de, transparent)" }} />
    </div>
  );
}

export default function BestieFullPage() {
  const [showSticky, setShowSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("services");

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#fffbfd", fontFamily: "'DM Sans', sans-serif", paddingBottom: 80 }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Hero */}
      <div style={{ background: "linear-gradient(180deg, #fffbfd 0%, #fdf0f5 40%, #f8e8ef 100%)", padding: "52px 24px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: "#C9A96E", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Bestie Beauty Bar</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 36, fontWeight: 300, color: "#2d2d2d", lineHeight: 1.1, margin: "0 0 12px 0" }}>
            Aesthetic Treatments &<br /><span style={{ fontWeight: 700, fontStyle: "italic", color: "#D4548A" }}>Peptide Skincare</span>
          </h1>
          <p style={{ fontSize: 15, color: "#6a5a60", lineHeight: 1.7, margin: "0 0 8px 0" }}>
            Botox, fillers, medical microneedling, signature peptide facials, and a curated copper peptide skincare line — all in one Wantagh, Long Island location.
          </p>
          <p style={{ fontSize: 13, color: "#8a7a80", margin: "0 0 24px 0" }}>3467 Merrick Road, Suite 206, Wantagh, NY 11793</p>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://bestiebeautybar.myaestheticrecord.com/online-booking" target="_blank" rel="noopener noreferrer" style={{
              background: "linear-gradient(135deg, #D4548A, #c44a7e)", color: "#fff", borderRadius: 50,
              padding: "14px 32px", fontSize: 15, fontWeight: 700, textDecoration: "none", letterSpacing: 0.5,
              boxShadow: "0 6px 20px rgba(212,84,138,0.3)",
            }}>Book Appointment</a>
            <a href="https://bestieskinanalysis.netlify.app" target="_blank" rel="noopener noreferrer" style={{
              background: "#fff", color: "#D4548A", border: "2px solid #D4548A", borderRadius: 50,
              padding: "12px 28px", fontSize: 15, fontWeight: 700, textDecoration: "none", letterSpacing: 0.5,
            }}>Free Skin Analysis</a>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,251,253,0.97)", backdropFilter: "blur(10px)", borderBottom: "1px solid #f0e4ea" }}>
        <div style={{ maxWidth: 540, margin: "0 auto", display: "flex", overflow: "auto" }}>
          {[
            { id: "services", label: "Services" },
            { id: "skincare", label: "Peptide Skincare" },
            { id: "memberships", label: "Memberships" },
            { id: "faq", label: "FAQ" },
          ].map(tab => (
            <button key={tab.id} onClick={() => {
              setActiveSection(tab.id);
              document.getElementById(tab.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }} style={{
              flex: 1, padding: "14px 8px", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer",
              background: "transparent", color: activeSection === tab.id ? "#D4548A" : "#8a7a80",
              borderBottom: activeSection === tab.id ? "3px solid #D4548A" : "3px solid transparent",
              fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", whiteSpace: "nowrap",
            }}>{tab.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 540, margin: "0 auto", padding: "0 20px" }}>

        {/* SERVICES SECTION */}
        <div id="services">
          {/* Injectables */}
          <SectionDivider label="Injectable Treatments" />
          <p style={{ fontSize: 14, color: "#6a5a60", lineHeight: 1.6, marginBottom: 20, textAlign: "center" }}>{SERVICES.injectables.subtitle}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {SERVICES.injectables.items.map((item, i) => <ServiceCard key={i} item={item} />)}
          </div>

          {/* Skin Rejuvenation */}
          <SectionDivider label="Skin Rejuvenation" />
          <p style={{ fontSize: 14, color: "#6a5a60", lineHeight: 1.6, marginBottom: 20, textAlign: "center" }}>{SERVICES.skin.subtitle}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {SERVICES.skin.items.map((item, i) => <ServiceCard key={i} item={item} />)}
          </div>

          {/* Wellness */}
          <SectionDivider label="Wellness Programs" />
          <p style={{ fontSize: 14, color: "#6a5a60", lineHeight: 1.6, marginBottom: 20, textAlign: "center" }}>{SERVICES.wellness.subtitle}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {SERVICES.wellness.items.map((item, i) => <ServiceCard key={i} item={item} />)}
          </div>
        </div>

        {/* PEPTIDE SKINCARE SECTION */}
        <div id="skincare">
          <SectionDivider label="Peptide Skincare Collection" />
          <p style={{ fontSize: 14, color: "#6a5a60", lineHeight: 1.6, marginBottom: 8, textAlign: "center" }}>{SERVICES.peptides.subtitle}</p>
          <p style={{ fontSize: 13, color: "#C9A96E", textAlign: "center", fontWeight: 600, marginBottom: 20 }}>Members save 10–15% on all products</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {SERVICES.peptides.items.map((item, i) => <ServiceCard key={i} item={item} />)}
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{ background: "linear-gradient(135deg, #fdf0f5, #f8e8ef)", borderRadius: 20, padding: "28px 24px", marginTop: 40, textAlign: "center", border: "1px solid #f0e4ea" }}>
          <div style={{ fontSize: 20, fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: "#2d2d2d", marginBottom: 8 }}>Not sure where to start?</div>
          <p style={{ fontSize: 14, color: "#6a5a60", lineHeight: 1.6, marginBottom: 16 }}>Take our free 3-minute Skin Analysis Quiz. Get a personalized Skin Health Score and custom treatment recommendations.</p>
          <a href="https://bestieskinanalysis.netlify.app" target="_blank" rel="noopener noreferrer" style={{
            display: "inline-block", background: "linear-gradient(135deg, #D4548A, #c44a7e)", color: "#fff",
            borderRadius: 50, padding: "14px 32px", fontSize: 15, fontWeight: 700, textDecoration: "none",
            boxShadow: "0 4px 16px rgba(212,84,138,0.25)",
          }}>Take the Free Skin Quiz</a>
        </div>

        {/* MEMBERSHIPS SECTION */}
        <div id="memberships">
          <SectionDivider label="Memberships" />
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 300, color: "#2d2d2d", margin: "0 0 8px 0" }}>
              Your Glow, <span style={{ fontWeight: 700, fontStyle: "italic", color: "#D4548A" }}>On Membership</span>
            </h2>
            <p style={{ fontSize: 14, color: "#6a5a60", lineHeight: 1.6 }}>Monthly facials, peptide skincare discounts, priority booking, and insider perks — all in one simple monthly plan.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {MEMBERSHIPS.map((m, i) => <MembershipCard key={m.id} m={m} featured={i === 1} />)}
          </div>

          {/* Comparison */}
          <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #f0e4ea", marginTop: 32 }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", borderBottom: "1px solid #f0e4ea" }}>
              <div style={{ padding: "14px 16px" }}></div>
              <div style={{ padding: "14px 8px", textAlign: "center", fontSize: 11, fontWeight: 700, color: "#8a7a80", textTransform: "uppercase", letterSpacing: 1, borderLeft: "1px solid #f0e4ea" }}>Per Visit</div>
              <div style={{ padding: "14px 8px", textAlign: "center", fontSize: 11, fontWeight: 700, color: "#D4548A", textTransform: "uppercase", letterSpacing: 1, borderLeft: "1px solid #f0e4ea", background: "#fdf0f5" }}>Member</div>
            </div>
            {[
              { f: "Monthly facial", pv: "$125–165", mb: "Included ✓" },
              { f: "Retail discount", pv: "Full price", mb: "10–15% off" },
              { f: "Peptide samples", pv: "—", mb: "Every visit (VIP)" },
              { f: "Priority booking", pv: "—", mb: "Yes (VIP)" },
              { f: "Birthday perk", pv: "—", mb: "Included ✓" },
              { f: "Skin analysis", pv: "$75 value", mb: "Free" },
            ].map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", borderBottom: i < 5 ? "1px solid #f5eff2" : "none" }}>
                <div style={{ padding: "11px 16px", fontSize: 13, color: "#2d2d2d", fontWeight: 500 }}>{r.f}</div>
                <div style={{ padding: "11px 8px", textAlign: "center", fontSize: 13, color: "#8a7a80", borderLeft: "1px solid #f0e4ea" }}>{r.pv}</div>
                <div style={{ padding: "11px 8px", textAlign: "center", fontSize: 13, color: "#D4548A", fontWeight: 600, borderLeft: "1px solid #f0e4ea", background: "#fdf8fc" }}>{r.mb}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div id="faq">
          <SectionDivider label="Frequently Asked Questions" />
          {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} />)}
        </div>

        {/* About / Location */}
        <div style={{ marginTop: 40, background: "#fff", borderRadius: 20, padding: "28px 24px", border: "1px solid #f0e4ea" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#C9A96E", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>About Bestie Beauty Bar</div>
          <p style={{ fontSize: 14, color: "#2d2d2d", lineHeight: 1.7, marginBottom: 16 }}>
            Bestie Beauty Bar is an aesthetic and skincare studio in Wantagh, Long Island, offering Botox, dermal fillers, medical microneedling, signature peptide facials, chemical peels, and a curated line of GHK-Cu copper peptide skincare products. Founded by Brittany McBride, RN, we combine clinical expertise with a warm, personalized approach to help you look and feel your best.
          </p>
          <div style={{ fontSize: 14, color: "#6a5a60", lineHeight: 1.8 }}>
            <div><strong>Address:</strong> 3467 Merrick Road, Suite 206, Wantagh, NY 11793</div>
            <div><strong>Areas Served:</strong> Wantagh, Bellmore, Merrick, Seaford, Massapequa, Levittown, and all of Nassau County, Long Island</div>
            <div><strong>Instagram:</strong> @yourbotoxbestie</div>
          </div>
        </div>

        {/* Final CTA */}
        <div style={{
          background: "linear-gradient(135deg, #D4548A, #c44a7e)", borderRadius: 24, padding: "36px 28px",
          textAlign: "center", marginTop: 32, boxShadow: "0 12px 40px rgba(212,84,138,0.3)",
        }}>
          <div style={{ fontSize: 26, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#fff", fontWeight: 600, marginBottom: 8, lineHeight: 1.2 }}>Ready to glow?</div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: 24 }}>Book your appointment or join a membership today.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a href="https://bestiebeautybar.myaestheticrecord.com/online-booking" target="_blank" rel="noopener noreferrer" style={{
              display: "block", background: "#fff", color: "#D4548A", borderRadius: 50, padding: "16px 32px",
              fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}>Book Now</a>
            <a href="https://bestieskinanalysis.netlify.app" target="_blank" rel="noopener noreferrer" style={{
              display: "block", color: "rgba(255,255,255,0.9)", fontSize: 14, textDecoration: "underline",
            }}>Take the free Skin Analysis Quiz first</a>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 32, paddingBottom: 20 }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "#C9A96E", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Bestie Beauty Bar</div>
          <div style={{ fontSize: 13, color: "#8a7a80" }}>3467 Merrick Road, Suite 206, Wantagh, NY 11793</div>
          <div style={{ fontSize: 12, color: "#bbb", marginTop: 8 }}>Botox, Fillers, Microneedling, Peptide Facials, and Skincare in Wantagh, Long Island</div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, padding: "10px 20px",
        background: "rgba(255,251,253,0.97)", backdropFilter: "blur(10px)",
        borderTop: "1px solid #f0e4ea", zIndex: 100,
        transform: showSticky ? "translateY(0)" : "translateY(100%)", transition: "transform 0.3s ease",
      }}>
        <div style={{ maxWidth: 540, margin: "0 auto", display: "flex", gap: 8 }}>
          <a href="https://bestiebeautybar.myaestheticrecord.com/online-booking" target="_blank" rel="noopener noreferrer" style={{
            flex: 1, display: "block", background: "linear-gradient(135deg, #D4548A, #c44a7e)", color: "#fff",
            borderRadius: 50, padding: "13px 16px", fontSize: 14, fontWeight: 700, textAlign: "center", textDecoration: "none",
          }}>Book Now</a>
          <a href="https://bestieskinanalysis.netlify.app" target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "#fff", color: "#D4548A", border: "2px solid #D4548A",
            borderRadius: 50, padding: "13px 20px", fontSize: 14, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap",
          }}>Skin Quiz</a>
        </div>
      </div>
    </div>
  );
}
