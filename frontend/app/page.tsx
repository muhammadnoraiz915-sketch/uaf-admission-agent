"use client";
import { useState, useRef, useEffect } from "react";

const quickQuestions = [
  "UAF mein kaunse programs hain?",
  "BS CS eligibility kya hai?",
  "DVM ke liye kya chahiye?",
  "Admission kab hota hai?",
  "Engineering programs kaunse hain?",
  "UAF campuses kahan hain?",
  "BBA ke liye eligibility?",
  "Pharm.D mein admission?",
];

type Message = { role: "user" | "agent"; text: string; time: string };

function getTime() {
  return new Date().toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" });
}

function useTypewriter(text: string, speed = 14) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${(i * 5.1) % 100}%`,
    delay: `${(i * 0.4) % 8}s`,
    duration: `${7 + (i % 5)}s`,
    size: `${2 + (i % 3)}px`,
    opacity: 0.15 + (i % 4) * 0.07,
  }));
  return (
    <div className="particles">
      {particles.map((p) => (
        <div key={p.id} className="particle" style={{
          left: p.left, animationDelay: p.delay,
          animationDuration: p.duration,
          width: p.size, height: p.size, opacity: p.opacity,
        }} />
      ))}
    </div>
  );
}

function AgentMessage({ text, time, animate }: { text: string; time: string; animate: boolean }) {
  const displayed = useTypewriter(animate ? text : "");
  const shown = animate ? displayed : text;
  return (
    <div className="msg-row agent">
      <div className="msg-avatar">🎓</div>
      <div className="msg-bubble-wrap">
        <div className="msg-bubble agent-bubble">
          {shown.split("\n").map((line, j) => <span key={j}>{line}<br /></span>)}
          {animate && displayed.length < text.length && <span className="cursor-blink">|</span>}
        </div>
        <div className="msg-time">{time}</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([{
    role: "agent",
    text: "Assalam o Alaikum! 👋 Main UAF ka AI Admission Assistant hoon.\n\nMujhse poochh sakte hain:\n• Available programs & faculties\n• Eligibility criteria\n• Entry test streams\n• Campus locations\n• Admission dates & portal\n\nKuch bhi poochein — main haazir hoon! 🎓",
    time: getTime(),
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [lastAgentIndex, setLastAgentIndex] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => {
    if (!showLanding) return;
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, [showLanding]);
  // Backend ko jaaga rakho
useEffect(() => {
  const keepAlive = setInterval(() => {
    fetch("https://muhammadnoraiz915-uaf-admission-backend.hf.space/")
      .catch(() => {});
  }, 240000); // har 4 minute mein
  
  // Pehle bhi ek baar ping karo
  fetch("https://muhammadnoraiz915-uaf-admission-backend.hf.space/")
    .catch(() => {});
    
  return () => clearInterval(keepAlive);
}, []);

  const sendMessage = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", text: msg, time: getTime() }]);
    setInput(""); setLoading(true);
    try {
      const res = await fetch("https://muhammadnoraiz915-uaf-admission-backend.hf.space/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setMessages((prev) => { setLastAgentIndex(prev.length); return [...prev, { role: "agent", text: data.response, time: getTime() }]; });
    } catch {
      setMessages((prev) => [...prev, { role: "agent", text: "Backend se connection nahi ho raha. Server check karein.", time: getTime() }]);
    }
    setLoading(false);
  };

  if (showLanding) return (
    <>
      <div className="landing">
        <Particles />
        <div className="glow-orb orb1" /><div className="glow-orb orb2" />
        <div className={`landing-inner ${heroVisible ? "visible" : ""}`}>
          <div className="badge"><span className="badge-dot" />🤖 AI Powered Assistant</div>
          <h1 className="hero-title">
            <span className="line1">UAF</span>
            <span className="line2"><em>Admission</em></span>
            <span className="line3">Assistant</span>
          </h1>
          <p className="hero-sub">University of Agriculture Faisalabad ka smart AI assistant — programs, eligibility, aur admission ke baare mein <strong>fori jawab</strong> paayein.</p>
          <div className="stats-row">
            <div className="stat"><span className="stat-num">20+</span><p>Programs</p></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">5</span><p>Campuses</p></div>
            <div className="stat-divider" />
            <div className="stat"><span className="stat-num">24/7</span><p>Available</p></div>
          </div>
          <div className="features-row">
            {["Programs & Faculties", "Eligibility Criteria", "Entry Test Info", "Admission Portal"].map((f, i) => (
              <div key={i} className="feature-chip">✓ {f}</div>
            ))}
          </div>
          <button className="cta-btn" onClick={() => setShowLanding(false)}>
            <span>Baat Karna Shuru Karein</span><span className="arrow">→</span>
          </button>
          <p className="built-with">Built with <span>FastAPI</span> · <span>MongoDB</span> · <span>Groq AI</span> · <span>Next.js</span></p>
        </div>
      </div>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}body{background:#050f05}
        .landing{min-height:100vh;background:radial-gradient(ellipse at 20% 50%,#0d2a0d 0%,#050f05 60%);display:flex;align-items:center;justify-content:center;font-family:'Georgia',serif;position:relative;overflow:hidden}
        .particles{position:fixed;inset:0;pointer-events:none;z-index:0}
        .particle{position:absolute;bottom:-10px;background:#4ade80;border-radius:50%;animation:floatUp linear infinite}
        @keyframes floatUp{0%{transform:translateY(0) scale(1);opacity:0}10%{opacity:1}90%{opacity:.5}100%{transform:translateY(-100vh) scale(.3);opacity:0}}
        .glow-orb{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;animation:orbFloat 8s ease-in-out infinite alternate}
        .orb1{width:400px;height:400px;background:rgba(34,197,94,.08);top:-100px;left:-100px}
        .orb2{width:300px;height:300px;background:rgba(34,197,94,.06);bottom:-80px;right:-80px;animation-delay:3s}
        @keyframes orbFloat{from{transform:translate(0,0) scale(1)}to{transform:translate(30px,20px) scale(1.1)}}
        .landing-inner{position:relative;z-index:1;text-align:center;padding:2rem;max-width:650px;width:100%;opacity:0;transform:translateY(40px);transition:opacity .9s ease,transform .9s ease}
        .landing-inner.visible{opacity:1;transform:translateY(0)}
        .badge{display:inline-flex;align-items:center;gap:.5rem;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.25);color:#4ade80;padding:.45rem 1.1rem;border-radius:999px;font-size:.78rem;letter-spacing:.04em;margin-bottom:2rem;font-family:monospace;animation:badgePulse 3s ease-in-out infinite}
        .badge-dot{width:7px;height:7px;background:#4ade80;border-radius:50%;animation:pulse 2s infinite}
        @keyframes badgePulse{0%,100%{box-shadow:0 0 0 0 rgba(74,222,128,0)}50%{box-shadow:0 0 0 6px rgba(74,222,128,.08)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        .hero-title{display:flex;flex-direction:column;align-items:center;gap:0;margin-bottom:1.3rem}
        .line1{font-size:clamp(3.5rem,10vw,6.5rem);color:#f0fdf4;font-weight:900;letter-spacing:-.03em;line-height:1;animation:slideIn .7s .2s both}
        .line2{font-size:clamp(3rem,9vw,5.5rem);color:#4ade80;font-style:italic;font-weight:900;line-height:1.05;animation:slideIn .7s .35s both}
        .line3{font-size:clamp(3.5rem,10vw,6.5rem);color:#f0fdf4;font-weight:900;letter-spacing:-.03em;line-height:1;animation:slideIn .7s .5s both}
        @keyframes slideIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .hero-sub{color:#86efac;font-size:1rem;line-height:1.75;margin-bottom:2.2rem;opacity:.85;font-family:system-ui,sans-serif;animation:slideIn .7s .65s both}
        .hero-sub strong{color:#4ade80}
        .stats-row{display:flex;align-items:center;justify-content:center;gap:1.5rem;margin-bottom:1.8rem;animation:slideIn .7s .8s both}
        .stat-num{display:block;font-size:2.2rem;font-weight:900;color:#4ade80;font-family:'Georgia',serif}
        .stat p{font-size:.68rem;color:#86efac;opacity:.6;font-family:monospace;letter-spacing:.12em;text-transform:uppercase}
        .stat-divider{width:1px;height:40px;background:rgba(74,222,128,.2)}
        .features-row{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;margin-bottom:2.2rem;animation:slideIn .7s .95s both}
        .feature-chip{background:rgba(74,222,128,.07);border:1px solid rgba(74,222,128,.18);color:#86efac;padding:.35rem .85rem;border-radius:999px;font-size:.75rem;font-family:system-ui,sans-serif}
        .cta-btn{display:inline-flex;align-items:center;gap:.75rem;background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;border:none;padding:1.1rem 2.8rem;font-size:1.05rem;border-radius:999px;cursor:pointer;font-family:system-ui,sans-serif;font-weight:700;transition:all .3s;box-shadow:0 0 50px rgba(34,197,94,.35),0 4px 20px rgba(0,0,0,.3);animation:slideIn .7s 1.1s both;position:relative;overflow:hidden}
        .cta-btn:hover{transform:translateY(-3px);box-shadow:0 0 70px rgba(34,197,94,.5),0 8px 30px rgba(0,0,0,.4)}
        .arrow{font-size:1.2rem;transition:transform .3s}
        .cta-btn:hover .arrow{transform:translateX(4px)}
        .built-with{margin-top:1.8rem;font-size:.7rem;color:#4ade80;opacity:.35;font-family:monospace;letter-spacing:.1em;animation:slideIn .7s 1.25s both}
        .built-with span{opacity:.8}
      `}</style>
    </>
  );

  return (
    <>
      <div className="chat-root">
        <Particles />
        <div className="glow-orb orb1" />
        <header className="chat-header">
          <button className="back-btn" onClick={() => setShowLanding(true)}>←</button>
          <div className="header-info">
            <div className="avatar-wrap">
              <div className="avatar">🎓</div>
              <span className="avatar-ring" />
            </div>
            <div>
              <h2>UAF Admission Assistant</h2>
              <div className="online-row"><span className="online-dot" /><small>Online · AI Powered by Groq</small></div>
            </div>
          </div>
          <div className="header-tag"><span className="tag-dot" />Live</div>
        </header>
        <main className="chat-messages">
          {messages.map((msg, i) =>
            msg.role === "agent"
              ? <AgentMessage key={i} text={msg.text} time={msg.time} animate={i === lastAgentIndex && i > 0} />
              : <div key={i} className="msg-row user">
                  <div className="msg-bubble-wrap">
                    <div className="msg-bubble user-bubble">{msg.text}</div>
                    <div className="msg-time right">{msg.time}</div>
                  </div>
                </div>
          )}
          {loading && (
            <div className="msg-row agent">
              <div className="msg-avatar">🎓</div>
              <div className="msg-bubble agent-bubble typing"><span /><span /><span /></div>
            </div>
          )}
          <div ref={bottomRef} />
        </main>
        <div className="quick-wrap">
          <span className="quick-label">⚡ Quick:</span>
          {quickQuestions.map((q, i) => <button key={i} className="quick-btn" onClick={() => sendMessage(q)}>{q}</button>)}
        </div>
        <footer className="chat-input-bar">
          <input className="chat-input" placeholder="Kuch bhi poochein... (Enter se bhejein)" value={input}
            onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} disabled={loading} />
          <button className="send-btn" onClick={() => sendMessage()} disabled={loading || !input.trim()}>
            {loading ? <span className="spin">◌</span> : "↑"}
          </button>
        </footer>
      </div>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}body{background:#050f05}
        .chat-root{height:100vh;display:flex;flex-direction:column;background:radial-gradient(ellipse at 30% 20%,#0d2a0d 0%,#050f05 70%);font-family:system-ui,sans-serif;position:relative;overflow:hidden}
        .particles{position:fixed;inset:0;pointer-events:none;z-index:0}
        .particle{position:absolute;bottom:-10px;background:#4ade80;border-radius:50%;animation:floatUp linear infinite}
        @keyframes floatUp{0%{transform:translateY(0) scale(1);opacity:0}10%{opacity:.6}90%{opacity:.2}100%{transform:translateY(-100vh) scale(.3);opacity:0}}
        .glow-orb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none}
        .orb1{width:500px;height:500px;background:rgba(34,197,94,.05);top:-150px;right:-100px;animation:orbFloat 10s ease-in-out infinite alternate}
        @keyframes orbFloat{from{transform:translate(0,0)}to{transform:translate(-20px,30px)}}
        .chat-header{display:flex;align-items:center;gap:1rem;padding:.9rem 1.5rem;background:rgba(5,15,5,.92);border-bottom:1px solid rgba(74,222,128,.12);backdrop-filter:blur(20px);z-index:10;position:relative;animation:slideDown .5s ease}
        @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        .back-btn{background:rgba(74,222,128,.08);border:1px solid rgba(74,222,128,.18);color:#4ade80;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
        .back-btn:hover{background:rgba(74,222,128,.18);transform:scale(1.05)}
        .header-info{display:flex;align-items:center;gap:.85rem;flex:1}
        .avatar-wrap{position:relative;flex-shrink:0}
        .avatar{width:42px;height:42px;background:linear-gradient(135deg,#16a34a,#166534);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.25rem;box-shadow:0 0 25px rgba(34,197,94,.35)}
        .avatar-ring{position:absolute;inset:-3px;border-radius:50%;border:2px solid rgba(74,222,128,.3);animation:ringPulse 3s ease-in-out infinite}
        @keyframes ringPulse{0%,100%{transform:scale(1);opacity:.5}50%{transform:scale(1.12);opacity:.15}}
        .header-info h2{color:#f0fdf4;font-size:.92rem;font-weight:700}
        .online-row{display:flex;align-items:center;gap:.35rem;margin-top:2px}
        .online-dot{width:7px;height:7px;background:#4ade80;border-radius:50%;animation:pulse 2s infinite;box-shadow:0 0 6px #4ade80}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        .online-row small{color:#86efac;font-size:.7rem;opacity:.65}
        .header-tag{display:flex;align-items:center;gap:.4rem;background:rgba(74,222,128,.08);border:1px solid rgba(74,222,128,.2);color:#4ade80;padding:.3rem .8rem;border-radius:999px;font-size:.7rem;font-family:monospace;letter-spacing:.06em}
        .tag-dot{width:6px;height:6px;background:#4ade80;border-radius:50%;animation:pulse 1.5s infinite}
        .chat-messages{flex:1;overflow-y:auto;padding:1.5rem;display:flex;flex-direction:column;gap:1rem;position:relative;z-index:1}
        .chat-messages::-webkit-scrollbar{width:3px}
        .chat-messages::-webkit-scrollbar-thumb{background:rgba(74,222,128,.15);border-radius:2px}
        .msg-row{display:flex;gap:.65rem;animation:msgIn .35s ease}
        @keyframes msgIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .msg-row.user{flex-direction:row-reverse}
        .msg-avatar{width:34px;height:34px;background:linear-gradient(135deg,#16a34a,#166534);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.95rem;flex-shrink:0;margin-top:2px;box-shadow:0 0 12px rgba(34,197,94,.2)}
        .msg-bubble-wrap{display:flex;flex-direction:column;max-width:78%}
        .msg-row.user .msg-bubble-wrap{align-items:flex-end}
        .msg-bubble{padding:.8rem 1.1rem;border-radius:18px;font-size:.875rem;line-height:1.65}
        .agent-bubble{background:rgba(255,255,255,.05);border:1px solid rgba(74,222,128,.12);color:#d1fae5;border-top-left-radius:4px;backdrop-filter:blur(10px)}
        .user-bubble{background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;border-top-right-radius:4px;box-shadow:0 4px 20px rgba(34,197,94,.25)}
        .msg-time{font-size:.63rem;color:#4ade80;opacity:.35;margin-top:.3rem;padding:0 .3rem}
        .msg-time.right{text-align:right}
        .cursor-blink{display:inline-block;color:#4ade80;animation:blink .8s infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        .typing{display:flex!important;gap:5px;align-items:center;padding:1rem 1.1rem!important}
        .typing span{width:7px;height:7px;background:#4ade80;border-radius:50%;display:block;animation:bounce 1.2s infinite;box-shadow:0 0 6px rgba(74,222,128,.5)}
        .typing span:nth-child(2){animation-delay:.18s}
        .typing span:nth-child(3){animation-delay:.36s}
        @keyframes bounce{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-8px);opacity:1}}
        .quick-wrap{display:flex;align-items:center;gap:.5rem;padding:.65rem 1.5rem;overflow-x:auto;border-top:1px solid rgba(74,222,128,.08);position:relative;z-index:1;background:rgba(5,15,5,.5)}
        .quick-wrap::-webkit-scrollbar{display:none}
        .quick-label{font-size:.68rem;color:#4ade80;opacity:.5;white-space:nowrap;font-family:monospace;letter-spacing:.05em}
        .quick-btn{background:rgba(74,222,128,.06);border:1px solid rgba(74,222,128,.16);color:#86efac;padding:.38rem .9rem;border-radius:999px;font-size:.72rem;cursor:pointer;white-space:nowrap;transition:all .2s;font-family:system-ui,sans-serif}
        .quick-btn:hover{background:rgba(74,222,128,.14);color:#4ade80;border-color:rgba(74,222,128,.35);transform:translateY(-1px);box-shadow:0 4px 12px rgba(34,197,94,.15)}
        .chat-input-bar{display:flex;gap:.75rem;padding:.9rem 1.5rem 1.3rem;background:rgba(5,15,5,.92);border-top:1px solid rgba(74,222,128,.1);backdrop-filter:blur(20px);position:relative;z-index:10}
        .chat-input{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(74,222,128,.18);color:#f0fdf4;padding:.8rem 1.2rem;border-radius:999px;font-size:.875rem;outline:none;transition:all .2s;font-family:system-ui,sans-serif}
        .chat-input::placeholder{color:rgba(134,239,172,.3)}
        .chat-input:focus{border-color:rgba(74,222,128,.45);background:rgba(255,255,255,.06);box-shadow:0 0 20px rgba(34,197,94,.08)}
        .chat-input:disabled{opacity:.4}
        .send-btn{width:46px;height:46px;background:linear-gradient(135deg,#16a34a,#15803d);border:none;color:#fff;border-radius:50%;font-size:1.15rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .25s;flex-shrink:0;box-shadow:0 4px 20px rgba(34,197,94,.35)}
        .send-btn:hover:not(:disabled){transform:scale(1.1) translateY(-1px);box-shadow:0 8px 25px rgba(34,197,94,.45)}
        .send-btn:disabled{opacity:.35;cursor:not-allowed}
        .spin{animation:spin 1s linear infinite;display:block}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>
    </>
  );
}