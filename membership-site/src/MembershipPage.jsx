import { useState, useEffect } from "react";

const MEMBERSHIPS = [
  {
    id: "glow",
    name: "Glow Getter",
    emoji: "🌸",
    tag: "Most Popular",
    price: 99,
    priceTo: 129,
    interval: "month",
    description: "Your entry into consistent, glow-maintaining skincare with monthly professional treatments and insider perks.",
    includes: [
      { text: "1 Bestie Signature Facial every month", highlight: true },
      { text: "10% off all skincare retail products" },
      { text: "Birthday month bonus treatment" },
      { text: "Early access to new services & products" },
      { text: "Complimentary skin analysis at enrollment" },
    ],
    idealFor: "You want to start a consistent skincare routine with professional guidance and save on products you'd buy anyway.",
    savings: "Save $30–$50/month vs. paying per visit",
    color: "#D4548A",
    bg: "linear-gradient(135deg, #fdf0f5 0%, #fce8f0 100%)",
  },
  {
    id: "vip",
    name: "Bestie VIP",
    emoji: "💎",
    tag: "Best Value",
    price: 179,
    priceTo: 229,
    interval: "month",
    description: "The full Bestie experience — premium facials, peptide skincare, and priority access to our injectable schedule.",
    includes: [
      { text: "1 Peptide Glow Facial every month (our premium facial)", highlight: true },
      { text: "Peptide serum sample with every visit", highlight: true },
      { text: "15% off all skincare retail products" },
      { text: "Priority booking for injectable appointments" },
      { text: "Birthday month bonus treatment" },
      { text: "Exclusive VIP-only promotions & events" },
      { text: "Complimentary skin analysis at enrollment" },
      { text: "Personalized skincare protocol consultation" },
    ],
    idealFor: "You're serious about your skin. You want both professional treatments and a curated at-home peptide routine — and you want priority access when you're ready for injectables.",
    savings: "Save $75–$120/month vs. paying per visit + retail",
    color: "#C9A96E",
    bg: "linear-gradient(135deg, #fdf8f0 0%, #f8f0e0 100%)",
  },
];

const FAQS = [
  { q: "How does billing work?", a: "Your membership is billed monthly via auto-pay. You'll set up payment at enrollment — we accept all major credit cards." },
  { q: "Can I cancel anytime?", a: "We ask for a 3-month initial commitment so you can actually see results. After that, you can cancel with 30 days' notice — no penalties, no drama." },
  { q: "What if I miss my monthly facial?", a: "Life happens! Unused facials roll over for one month. So you'll always have time to use what you've earned." },
  { q: "Can I upgrade from Glow Getter to VIP?", a: "Absolutely. You can upgrade at any time and we'll prorate the difference for that billing cycle." },
  { q: "Do I need to be an existing client?", a: "Nope! Memberships are open to everyone. Your first visit will include a complimentary skin analysis so we can tailor everything to your skin." },
  { q: "What's included in the skin analysis?", a: "It's our comprehensive assessment — we evaluate your skin type, aging zones, lifestyle factors, and build you a personalized treatment plan. You'll also get a Skin Health Score." },
  { q: "Can I use my retail discount on peptide products?", a: "Yes! Your discount applies to our entire skincare line including GHK-Cu Peptide Serum, Peptide Eye Complex, Hair Serum, and all future products." },
  { q: "What does 'priority injectable booking' mean?", a: "VIP members get first access to our injectable schedule before we open availability to non-members. When Botox day is fully booked, VIPs get the first cancellation spots." },
];

const TESTIMONIALS = [
  { text: "I used to spend more buying individual facials and products. Now I get better treatments, save money, and my skin has never looked this good.", name: "Sarah M.", member: "Glow Getter" },
  { text: "The peptide serum samples alone sold me. I tried the GHK-Cu serum during my facial and had to have it. The 15% discount pays for itself.", name: "Jessica R.", member: "Bestie VIP" },
  { text: "Priority booking for Botox is everything. I used to wait weeks. Now I get in the same week. Worth it just for that.", name: "Amanda K.", member: "Bestie VIP" },
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
        <span style={{ fontSize: 20, color: "#D4548A", transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0 }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 200 : 0, overflow: "hidden", transition: "max-height 0.3s ease",
      }}>
        <p style={{ fontSize: 14, color: "#6a5a60", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", paddingBottom: 16, margin: 0 }}>{faq.a}</p>
      </div>
    </div>
  );
}

function MembershipCard({ membership, featured }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 24, overflow: "hidden",
      border: featured ? "2px solid " + membership.color : "1px solid #f0e4ea",
      boxShadow: featured ? "0 8px 32px rgba(212,84,138,0.15)" : "0 2px 12px rgba(0,0,0,0.04)",
      transition: "transform 0.3s, box-shadow 0.3s",
      position: "relative",
    }}>
      {/* Tag */}
      {membership.tag && (
        <div style={{
          position: "absolute", top: 16, right: 16, background: membership.color,
          color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20,
          fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.5, textTransform: "uppercase",
        }}>{membership.tag}</div>
      )}

      {/* Header */}
      <div style={{ background: membership.bg, padding: "32px 24px 24px" }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>{membership.emoji}</div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 700, color: "#2d2d2d", margin: "0 0 8px 0" }}>{membership.name}</h3>
        <p style={{ fontSize: 14, color: "#6a5a60", lineHeight: 1.6, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{membership.description}</p>

        <div style={{ marginTop: 20, display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: 14, color: "#8a7a80", fontFamily: "'DM Sans', sans-serif" }}>Starting at</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: 42, fontWeight: 700, color: membership.color, fontFamily: "'DM Sans', sans-serif" }}>${membership.price}</span>
          <span style={{ fontSize: 16, color: "#8a7a80", fontFamily: "'DM Sans', sans-serif" }}>/{membership.interval}</span>
        </div>
      </div>

      {/* Includes */}
      <div style={{ padding: "24px" }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#C9A96E", textTransform: "uppercase", fontWeight: 600, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>What's Included</div>
        {membership.includes.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
            <span style={{ color: membership.color, fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>✓</span>
            <span style={{
              fontSize: 14, color: item.highlight ? "#2d2d2d" : "#6a5a60",
              fontWeight: item.highlight ? 600 : 400, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif",
            }}>{item.text}</span>
          </div>
        ))}

        {/* Savings */}
        <div style={{
          background: membership.bg, borderRadius: 12, padding: "12px 16px", marginTop: 20, marginBottom: 20,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: membership.color, fontFamily: "'DM Sans', sans-serif" }}>{membership.savings}</div>
        </div>

        {/* Ideal for */}
        <div style={{ fontSize: 13, color: "#8a7a80", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", marginBottom: 24 }}>
          <span style={{ fontWeight: 600, color: "#2d2d2d", fontStyle: "normal" }}>Ideal for you if: </span>{membership.idealFor}
        </div>

        {/* CTA */}
        <a href="https://bestiebeautybar.myaestheticrecord.com/online-booking" target="_blank" rel="noopener noreferrer" style={{
          display: "block", width: "100%", padding: "16px", borderRadius: 50, textAlign: "center",
          background: featured ? `linear-gradient(135deg, ${membership.color}, ${membership.color}dd)` : "#fff",
          color: featured ? "#fff" : membership.color,
          border: featured ? "none" : `2px solid ${membership.color}`,
          fontSize: 15, fontWeight: 700, cursor: "pointer", textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.5, boxSizing: "border-box",
          boxShadow: featured ? `0 4px 16px ${membership.color}40` : "none",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}>
          Join {membership.name}
        </a>
      </div>
    </div>
  );
}

export default function MembershipPage() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => { setShowSticky(window.scrollY > 600); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#fffbfd", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Hero */}
      <div style={{
        background: "linear-gradient(180deg, #fffbfd 0%, #fdf0f5 40%, #f8e8ef 100%)",
        padding: "60px 24px 48px", textAlign: "center",
      }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: "#C9A96E", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Bestie Beauty Bar</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 38, fontWeight: 300, color: "#2d2d2d", lineHeight: 1.1, margin: "0 0 16px 0" }}>
            Your Glow,<br /><span style={{ fontWeight: 700, fontStyle: "italic", color: "#D4548A" }}>On Membership</span>
          </h1>
          <p style={{ fontSize: 16, color: "#6a5a60", lineHeight: 1.7, margin: "0 0 24px 0" }}>
            Consistent skin wins. Monthly facials, peptide skincare perks, insider pricing, and priority booking — all in one simple monthly plan.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#D4548A" }}>$30–$120</div>
              <div style={{ fontSize: 12, color: "#8a7a80" }}>saved per month</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#D4548A" }}>10–15%</div>
              <div style={{ fontSize: 12, color: "#8a7a80" }}>off all skincare</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#D4548A" }}>Priority</div>
              <div style={{ fontSize: 12, color: "#8a7a80" }}>injectable booking</div>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Cards */}
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 20px 40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {MEMBERSHIPS.map((m, i) => (
            <MembershipCard key={m.id} membership={m} featured={i === 1} />
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={{ background: "#fdf0f5", padding: "48px 24px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#C9A96E", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Simple Process</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 400, color: "#2d2d2d", margin: 0 }}>
              How It <span style={{ fontWeight: 700, fontStyle: "italic", color: "#D4548A" }}>Works</span>
            </h2>
          </div>

          {[
            { num: "1", title: "Choose Your Tier", desc: "Glow Getter for consistent care, or Bestie VIP for the full experience. Both include a complimentary skin analysis." },
            { num: "2", title: "Book Your First Facial", desc: "We'll do a thorough skin assessment, customize your treatment, and build your at-home peptide skincare protocol." },
            { num: "3", title: "Glow Monthly", desc: "Come back each month for your facial. Shop skincare at your member discount. Book injectables with priority access (VIP)." },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 16, marginBottom: 24, alignItems: "flex-start" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #D4548A, #c44a7e)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                color: "#fff", fontSize: 18, fontWeight: 700,
              }}>{s.num}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#2d2d2d", marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: "#6a5a60", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: "48px 24px", background: "#fffbfd" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#C9A96E", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>What Members Say</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 400, color: "#2d2d2d", margin: 0 }}>
              Real <span style={{ fontWeight: 700, fontStyle: "italic", color: "#D4548A" }}>Results</span>
            </h2>
          </div>

          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 20, padding: "24px", marginBottom: 16,
              border: "1px solid #f0e4ea", boxShadow: "0 2px 12px rgba(212,84,138,0.06)",
            }}>
              <div style={{ fontSize: 24, color: "#D4548A", marginBottom: 8 }}>"</div>
              <p style={{ fontSize: 14, color: "#2d2d2d", lineHeight: 1.7, margin: "0 0 16px 0", fontStyle: "italic" }}>{t.text}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#2d2d2d" }}>{t.name}</span>
                <span style={{ fontSize: 12, color: "#C9A96E", fontWeight: 600 }}>{t.member} Member</span>
              </div>
            </div>
          ))}
          <p style={{ fontSize: 12, color: "#bbb", textAlign: "center", marginTop: 8, fontStyle: "italic" }}>Names and details shared with permission. Individual results may vary.</p>
        </div>
      </div>

      {/* Peptide Products Section */}
      <div style={{ background: "linear-gradient(180deg, #fdf0f5, #f8e8ef)", padding: "48px 24px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#C9A96E", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Member Perks</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 400, color: "#2d2d2d", margin: 0 }}>
              Peptide Skincare, <span style={{ fontWeight: 700, fontStyle: "italic", color: "#D4548A" }}>Discounted</span>
            </h2>
            <p style={{ fontSize: 14, color: "#6a5a60", lineHeight: 1.6, marginTop: 12 }}>Members save 10–15% on our entire professional peptide skincare line — the same products we use in your treatments.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { name: "GHK-Cu Peptide Serum", price: "$95", icon: "💧", desc: "Copper peptide for collagen & radiance" },
              { name: "Peptide Eye Complex", price: "$75", icon: "👁️", desc: "Dark circles, puffiness & fine lines" },
              { name: "Barrier Repair Moisturizer", price: "$62", icon: "🧴", desc: "Peptide-infused hydration" },
              { name: "Hair & Scalp Serum", price: "$85", icon: "💇‍♀️", desc: "GHK-Cu for thinning hair" },
            ].map((p, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 16, padding: "20px 16px", textAlign: "center",
                border: "1px solid #f0e4ea",
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#2d2d2d", marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "#8a7a80", marginBottom: 8, lineHeight: 1.4 }}>{p.desc}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#D4548A" }}>{p.price}</div>
                <div style={{ fontSize: 11, color: "#C9A96E", marginTop: 2 }}>Members save 10–15%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div style={{ padding: "48px 24px", background: "#fffbfd" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 400, color: "#2d2d2d", margin: 0 }}>
              Why <span style={{ fontWeight: 700, fontStyle: "italic", color: "#D4548A" }}>Membership</span> Wins
            </h2>
          </div>

          <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #f0e4ea" }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", borderBottom: "1px solid #f0e4ea" }}>
              <div style={{ padding: "14px 16px" }}></div>
              <div style={{ padding: "14px 12px", textAlign: "center", fontSize: 12, fontWeight: 700, color: "#8a7a80", textTransform: "uppercase", letterSpacing: 1, borderLeft: "1px solid #f0e4ea" }}>Pay Per Visit</div>
              <div style={{ padding: "14px 12px", textAlign: "center", fontSize: 12, fontWeight: 700, color: "#D4548A", textTransform: "uppercase", letterSpacing: 1, borderLeft: "1px solid #f0e4ea", background: "#fdf0f5" }}>Member</div>
            </div>
            {[
              { feature: "Monthly facial", payper: "$125–$165", member: "Included ✓" },
              { feature: "Retail discount", payper: "Full price", member: "10–15% off" },
              { feature: "Peptide samples", payper: "—", member: "Every visit (VIP)" },
              { feature: "Priority injectable booking", payper: "—", member: "Yes (VIP)" },
              { feature: "Birthday perk", payper: "—", member: "Included ✓" },
              { feature: "Skin analysis", payper: "$75 value", member: "Free at enrollment" },
            ].map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", borderBottom: i < 5 ? "1px solid #f5eff2" : "none" }}>
                <div style={{ padding: "12px 16px", fontSize: 13, color: "#2d2d2d", fontWeight: 500 }}>{row.feature}</div>
                <div style={{ padding: "12px", textAlign: "center", fontSize: 13, color: "#8a7a80", borderLeft: "1px solid #f0e4ea" }}>{row.payper}</div>
                <div style={{ padding: "12px", textAlign: "center", fontSize: 13, color: "#D4548A", fontWeight: 600, borderLeft: "1px solid #f0e4ea", background: "#fdf8fc" }}>{row.member}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: "#fdf0f5", padding: "48px 24px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#C9A96E", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Questions</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 400, color: "#2d2d2d", margin: 0 }}>
              Frequently <span style={{ fontWeight: 700, fontStyle: "italic", color: "#D4548A" }}>Asked</span>
            </h2>
          </div>
          {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} />)}
        </div>
      </div>

      {/* Final CTA */}
      <div style={{ padding: "48px 24px 32px", background: "#fffbfd" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(135deg, #D4548A, #c44a7e)", borderRadius: 24, padding: "36px 28px", textAlign: "center",
            boxShadow: "0 12px 40px rgba(212,84,138,0.3)",
          }}>
            <div style={{ fontSize: 28, fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#fff", fontWeight: 600, marginBottom: 8, lineHeight: 1.2 }}>Your skin deserves consistency.</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: 24 }}>
              Stop guessing. Start glowing. Pick the membership that fits your life and let us take care of the rest.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="https://bestiebeautybar.myaestheticrecord.com/online-booking" target="_blank" rel="noopener noreferrer" style={{
                display: "block", background: "#fff", color: "#D4548A", borderRadius: 50, padding: "16px 32px",
                fontSize: 16, fontWeight: 700, textDecoration: "none", letterSpacing: 0.5,
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}>
                Join Now — Book Your First Facial
              </a>
              <a href="https://bestieskinanalysis.netlify.app" target="_blank" rel="noopener noreferrer" style={{
                display: "block", color: "rgba(255,255,255,0.9)", fontSize: 14, textDecoration: "underline",
              }}>
                Not sure yet? Take our free Skin Analysis first
              </a>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: "#C9A96E", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Bestie Beauty Bar</div>
            <div style={{ fontSize: 13, color: "#8a7a80" }}>3467 Merrick Road, Suite 206, Wantagh, NY 11793</div>
            <div style={{ fontSize: 13, color: "#8a7a80", marginTop: 4 }}>@yourbotoxbestie</div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, padding: "12px 20px",
        background: "rgba(255,251,253,0.95)", backdropFilter: "blur(10px)",
        borderTop: "1px solid #f0e4ea", zIndex: 100,
        transform: showSticky ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s ease",
      }}>
        <div style={{ maxWidth: 520, margin: "0 auto", display: "flex", gap: 8 }}>
          <a href="https://bestiebeautybar.myaestheticrecord.com/online-booking" target="_blank" rel="noopener noreferrer" style={{
            flex: 1, display: "block", background: "linear-gradient(135deg, #D4548A, #c44a7e)", color: "#fff",
            borderRadius: 50, padding: "14px 16px", fontSize: 14, fontWeight: 700, textAlign: "center",
            textDecoration: "none", letterSpacing: 0.5,
          }}>
            Join a Membership
          </a>
          <a href="https://bestieskinanalysis.netlify.app" target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "#fff", color: "#D4548A", border: "2px solid #D4548A",
            borderRadius: 50, padding: "14px 20px", fontSize: 14, fontWeight: 700,
            textDecoration: "none", whiteSpace: "nowrap",
          }}>
            Free Quiz
          </a>
        </div>
      </div>
    </div>
  );
}
