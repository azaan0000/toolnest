import { useState, useRef } from "react";

const C = {
  bg: "#0A0A0F",
  surface: "#12121A",
  card: "#1A1A26",
  border: "#2A2A3E",
  accent: "#6C63FF",
  accentHover: "#8B85FF",
  accentSoft: "#6C63FF22",
  teal: "#00D4AA",
  tealSoft: "#00D4AA18",
  text: "#F0EFFF",
  muted: "#8B8AAA",
  danger: "#FF6B6B",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${C.bg}; color: ${C.text}; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${C.surface}; }
  ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }

  .nav {
    position: sticky; top: 0; z-index: 100;
    background: ${C.bg}ee; backdrop-filter: blur(16px);
    border-bottom: 1px solid ${C.border};
    padding: 0 24px; height: 60px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo {
    font-size: 20px; font-weight: 800; letter-spacing: -0.5px;
    background: linear-gradient(135deg, ${C.accent}, ${C.teal});
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    cursor: pointer;
  }
  .nav-badge {
    font-size: 10px; font-weight: 600; color: ${C.teal};
    border: 1px solid ${C.teal}44; border-radius: 4px;
    padding: 2px 8px; letter-spacing: 1px; text-transform: uppercase;
  }

  .hero {
    text-align: center; padding: 72px 24px 56px;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 600px; height: 300px;
    background: radial-gradient(ellipse at center, ${C.accent}18 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px; font-weight: 600; letter-spacing: 1.5px;
    text-transform: uppercase; color: ${C.teal};
    background: ${C.tealSoft}; border: 1px solid ${C.teal}33;
    border-radius: 20px; padding: 5px 14px; margin-bottom: 24px;
  }
  .hero-title {
    font-size: clamp(32px, 6vw, 56px);
    font-weight: 800; line-height: 1.1; letter-spacing: -1.5px; margin-bottom: 16px;
  }
  .hero-title span {
    background: linear-gradient(135deg, ${C.accent}, ${C.teal});
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hero-sub { font-size: 16px; color: ${C.muted}; max-width: 480px; margin: 0 auto 32px; line-height: 1.6; }
  .hero-stats { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; }
  .stat { text-align: center; }
  .stat-n { font-size: 28px; font-weight: 800; color: ${C.text}; letter-spacing: -1px; }
  .stat-l { font-size: 12px; color: ${C.muted}; margin-top: 2px; }

  .tools-section { padding: 0 24px 32px; max-width: 1100px; margin: 0 auto; }
  .section-label {
    font-size: 11px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: ${C.muted};
    margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid ${C.border};
  }
  .tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
  .tool-card {
    background: ${C.card}; border: 1px solid ${C.border};
    border-radius: 14px; padding: 20px 16px; cursor: pointer;
    transition: all 0.2s ease; position: relative; overflow: hidden;
  }
  .tool-card:hover { border-color: ${C.accent}66; background: ${C.accentSoft}; transform: translateY(-2px); }
  .tool-card.active { border-color: ${C.accent}; background: ${C.accentSoft}; }
  .tool-card-icon { font-size: 28px; margin-bottom: 10px; }
  .tool-card-name { font-size: 13px; font-weight: 600; color: ${C.text}; line-height: 1.3; }
  .tool-card-desc { font-size: 11px; color: ${C.muted}; margin-top: 4px; line-height: 1.4; }
  .tool-card-badge {
    position: absolute; top: 10px; right: 10px;
    font-size: 9px; font-weight: 700; letter-spacing: 0.5px;
    padding: 2px 6px; border-radius: 4px;
    background: ${C.teal}22; color: ${C.teal}; border: 1px solid ${C.teal}33;
  }

  .workspace { max-width: 860px; margin: 0 auto 60px; padding: 0 24px; }
  .workspace-header {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid ${C.border};
  }
  .workspace-icon { font-size: 32px; }
  .workspace-title { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
  .workspace-sub { font-size: 13px; color: ${C.muted}; margin-top: 3px; }

  textarea, input[type=text], input[type=url] {
    width: 100%; background: ${C.surface}; border: 1px solid ${C.border};
    border-radius: 10px; color: ${C.text}; font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px; padding: 14px 16px; outline: none; resize: vertical;
    transition: border-color 0.2s; line-height: 1.6;
  }
  textarea:focus, input:focus { border-color: ${C.accent}88; }
  textarea::placeholder, input::placeholder { color: ${C.muted}; }
  .label {
    font-size: 12px; font-weight: 600; color: ${C.muted};
    text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px; display: block;
  }

  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 24px; border-radius: 10px; border: none; cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 600;
    transition: all 0.2s;
  }
  .btn-primary { background: ${C.accent}; color: #fff; }
  .btn-primary:hover { background: ${C.accentHover}; transform: translateY(-1px); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .btn-ghost { background: ${C.surface}; color: ${C.text}; border: 1px solid ${C.border}; }
  .btn-ghost:hover { border-color: ${C.accent}66; }
  .btn-teal { background: ${C.teal}22; color: ${C.teal}; border: 1px solid ${C.teal}44; }
  .btn-teal:hover { background: ${C.teal}33; }

  .output-box {
    background: ${C.surface}; border: 1px solid ${C.border};
    border-radius: 10px; padding: 20px; min-height: 160px;
    white-space: pre-wrap; font-size: 14px; line-height: 1.7; color: ${C.text};
  }

  .stats-bar { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px; }
  .stat-chip {
    background: ${C.card}; border: 1px solid ${C.border};
    border-radius: 8px; padding: 8px 14px; font-size: 13px;
  }
  .stat-chip span { color: ${C.accent}; font-weight: 700; }

  .loading-dots { display: inline-flex; gap: 4px; align-items: center; }
  .loading-dots span {
    width: 6px; height: 6px; border-radius: 50%; background: #fff;
    animation: dot 1.2s infinite ease-in-out;
  }
  .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes dot { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }

  .toast {
    position: fixed; bottom: 24px; right: 24px; z-index: 999;
    background: ${C.card}; border: 1px solid ${C.teal}44;
    color: ${C.teal}; border-radius: 10px; padding: 12px 20px;
    font-size: 14px; font-weight: 600; animation: slideUp 0.3s ease;
  }
  @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

  .yt-thumbs { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-top: 16px; }
  .yt-thumb-card { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 10px; overflow: hidden; }
  .yt-thumb-card img { width: 100%; display: block; }
  .thumb-label { padding: 10px 12px; font-size: 12px; color: ${C.muted}; font-weight: 600; display: flex; justify-content: space-between; align-items: center; }

  .drop-zone {
    border: 2px dashed ${C.border}; border-radius: 12px; padding: 40px 24px;
    text-align: center; cursor: pointer; transition: all 0.2s; color: ${C.muted};
  }
  .drop-zone:hover, .drop-zone.drag-over { border-color: ${C.accent}; color: ${C.text}; }
  .drop-zone-icon { font-size: 36px; margin-bottom: 10px; }

  .case-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-top: 16px; }
  .case-item { background: ${C.card}; border: 1px solid ${C.border}; border-radius: 10px; padding: 14px; cursor: pointer; transition: border-color 0.2s; }
  .case-item:hover { border-color: ${C.accent}66; }
  .case-item-label { font-size: 11px; font-weight: 700; color: ${C.muted}; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
  .case-item-text { font-size: 13px; color: ${C.text}; word-break: break-word; }

  .ad-slot {
    background: ${C.surface}; border: 1px dashed ${C.border};
    border-radius: 10px; padding: 20px; text-align: center;
    color: ${C.muted}; font-size: 12px; margin: 24px 0;
  }

  .footer {
    border-top: 1px solid ${C.border}; padding: 32px 24px;
    text-align: center; color: ${C.muted}; font-size: 13px;
  }
  .footer strong { color: ${C.text}; }

  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  @media (max-width: 600px) {
    .hero { padding: 48px 16px 40px; }
    .tools-grid { grid-template-columns: repeat(2, 1fr); }
    .hero-stats { gap: 24px; }
    .workspace { padding: 0 16px; }
    .row2 { grid-template-columns: 1fr; }
  }
`;

const TOOLS = [
  { id: "cover-letter", icon: "✉️", name: "AI Cover Letter", desc: "Job-ready letters in seconds", badge: "AI" },
  { id: "paraphraser",  icon: "🔄", name: "AI Paraphraser",  desc: "Rewrite any text instantly",  badge: "AI" },
  { id: "word-counter", icon: "📊", name: "Word Counter",    desc: "Words, chars & reading time", badge: "FREE" },
  { id: "yt-thumbnail", icon: "🎬", name: "YT Thumbnail",   desc: "Download any thumbnail",      badge: "FREE" },
  { id: "case-converter",icon:"🔡", name: "Case Converter", desc: "UPPER, lower, Title & more",  badge: "FREE" },
  { id: "image-compress",icon:"🗜️", name: "Image Compressor",desc:"Shrink images, keep quality", badge: "FREE" },
];

async function callClaude(prompt, system = "") {
  const body = {
    model: "claude-sonnet-4-6",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }],
  };
  if (system) body.system = system;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.content.map(b => b.text || "").join("");
}

function copyText(t) { navigator.clipboard.writeText(t).catch(() => {}); }
function getYTId(url) {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

/* ── WORD COUNTER ── */
function WordCounter() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSp = text.replace(/\s/g,"").length;
  const sentences = text.split(/[.!?]+/).filter(s=>s.trim()).length;
  const readTime = Math.max(1, Math.ceil(words/200));
  const paras = text.split(/\n\n+/).filter(p=>p.trim()).length;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div>
        <label className="label">Paste or type your text</label>
        <textarea rows={10} value={text} onChange={e=>setText(e.target.value)} placeholder="Start typing or paste text here..." />
      </div>
      <div className="stats-bar">
        {[["Words",words],["Characters",chars],["No Spaces",charsNoSp],["Sentences",sentences],["Paragraphs",paras],["Read Time",`${readTime} min`]].map(([l,v])=>(
          <div className="stat-chip" key={l}>{l}: <span>{v}</span></div>
        ))}
      </div>
    </div>
  );
}

/* ── CASE CONVERTER ── */
function CaseConverter() {
  const [text, setText] = useState("");
  const [toast, setToast] = useState("");
  const toTitle = s => s.toLowerCase().replace(/\b\w/g,c=>c.toUpperCase());
  const toSlug  = s => s.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");
  const toAlt   = s => s.split("").map((c,i)=>i%2===0?c.toLowerCase():c.toUpperCase()).join("");
  const toInv   = s => s.split("").map(c=>c===c.toUpperCase()?c.toLowerCase():c.toUpperCase()).join("");
  const cases = [
    {label:"UPPERCASE",val:text.toUpperCase()},
    {label:"lowercase",val:text.toLowerCase()},
    {label:"Title Case",val:toTitle(text)},
    {label:"Sentence case",val:text.charAt(0).toUpperCase()+text.slice(1).toLowerCase()},
    {label:"slug-case",val:toSlug(text)},
    {label:"aLtErNaTiNg",val:toAlt(text)},
    {label:"iNVERSE cASE",val:toInv(text)},
    {label:"CONSTANT_CASE",val:text.toUpperCase().replace(/\s+/g,"_")},
  ];
  const show = msg => { setToast(msg); setTimeout(()=>setToast(""),2000); };
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div>
        <label className="label">Enter your text</label>
        <textarea rows={4} value={text} onChange={e=>setText(e.target.value)} placeholder="Type something to convert..." />
      </div>
      {text && (
        <div className="case-grid">
          {cases.map(({label,val})=>(
            <div className="case-item" key={label} onClick={()=>{copyText(val);show(`Copied: ${label}`);}}>
              <div className="case-item-label">{label}</div>
              <div className="case-item-text">{val||"—"}</div>
            </div>
          ))}
        </div>
      )}
      {!text && <p style={{color:C.muted,fontSize:13}}>👆 Type above to see all case conversions. Click any card to copy.</p>}
      {toast && <div className="toast">✅ {toast}</div>}
    </div>
  );
}

/* ── YT THUMBNAIL ── */
function YTThumbnail() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [error, setError] = useState("");
  const handleGet = () => {
    const id = getYTId(url.trim());
    if (!id) { setError("Invalid YouTube URL. Paste a valid video link."); setVideoId(null); return; }
    setError(""); setVideoId(id);
  };
  const qualities = [
    {label:"Max Quality (1280×720)",key:"maxresdefault"},
    {label:"High Quality (480×360)",key:"hqdefault"},
    {label:"Medium (320×180)",key:"mqdefault"},
    {label:"Standard (120×90)",key:"default"},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div>
        <label className="label">YouTube Video URL</label>
        <div style={{display:"flex",gap:10}}>
          <input type="url" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." onKeyDown={e=>e.key==="Enter"&&handleGet()} />
          <button className="btn btn-primary" onClick={handleGet} style={{whiteSpace:"nowrap"}}>Get Thumbnails</button>
        </div>
        {error && <p style={{color:C.danger,fontSize:13,marginTop:8}}>{error}</p>}
      </div>
      {videoId && (
        <div className="yt-thumbs">
          {qualities.map(({label,key})=>{
            const src=`https://img.youtube.com/vi/${videoId}/${key}.jpg`;
            return (
              <div className="yt-thumb-card" key={key}>
                <img src={src} alt={label} />
                <div className="thumb-label">
                  <span>{label}</span>
                  <a href={src} download={`thumb-${key}.jpg`} target="_blank" rel="noreferrer" style={{color:C.accent,textDecoration:"none",fontWeight:700}}>⬇ Save</a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── IMAGE COMPRESSOR ── */
function ImageCompressor() {
  const [original, setOriginal] = useState(null);
  const [compressed, setCompressed] = useState(null);
  const [quality, setQuality] = useState(70);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const compress = (src, name, q) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width; canvas.height = img.height;
      canvas.getContext("2d").drawImage(img,0,0);
      const out = canvas.toDataURL("image/jpeg", q/100);
      const bytes = Math.round((out.length*3)/4);
      setCompressed({src:out,size:bytes,name:name.replace(/\.[^.]+$/,".jpg")});
    };
    img.src = src;
  };

  const processFile = file => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = e => {
      const src = e.target.result;
      setOriginal({src,size:file.size,name:file.name});
      compress(src,file.name,quality);
    };
    reader.readAsDataURL(file);
  };

  const fmt = b => b>1048576?`${(b/1048576).toFixed(1)} MB`:`${Math.round(b/1024)} KB`;
  const saving = original&&compressed ? Math.round((1-compressed.size/original.size)*100) : 0;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:20}}>
      <div
        className={`drop-zone${dragging?" drag-over":""}`}
        onClick={()=>inputRef.current.click()}
        onDragOver={e=>{e.preventDefault();setDragging(true);}}
        onDragLeave={()=>setDragging(false)}
        onDrop={e=>{e.preventDefault();setDragging(false);processFile(e.dataTransfer.files[0]);}}
      >
        <div className="drop-zone-icon">🖼️</div>
        <p style={{fontWeight:600}}>Drop image here or click to upload</p>
        <p style={{fontSize:12,marginTop:4}}>PNG, JPG, WEBP supported</p>
        <input ref={inputRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>processFile(e.target.files[0])} />
      </div>
      {original && (
        <>
          <div>
            <label className="label">Quality: {quality}%</label>
            <input type="range" min={10} max={100} value={quality}
              onChange={e=>{const q=+e.target.value;setQuality(q);compress(original.src,original.name,q);}}
              style={{width:"100%",accentColor:C.accent}} />
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
            <div>
              <div className="label">Original — {fmt(original.size)}</div>
              <img src={original.src} style={{width:"100%",borderRadius:8}} alt="original" />
            </div>
            {compressed && (
              <div>
                <div className="label">Compressed — {fmt(compressed.size)} ({saving>0?`−${saving}%`:"same"})</div>
                <img src={compressed.src} style={{width:"100%",borderRadius:8}} alt="compressed" />
              </div>
            )}
          </div>
          {compressed && (
            <a href={compressed.src} download={compressed.name}
              className="btn btn-primary" style={{textDecoration:"none",width:"fit-content"}}>
              ⬇ Download Compressed
            </a>
          )}
        </>
      )}
    </div>
  );
}

/* ── AI COVER LETTER ── */
function CoverLetter() {
  const [form, setForm] = useState({jobTitle:"",company:"",skills:"",tone:"Professional"});
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const generate = async () => {
    if (!form.jobTitle||!form.company) return;
    setLoading(true); setOutput("");
    try {
      const res = await callClaude(
        `Write a compelling cover letter for:\nJob Title: ${form.jobTitle}\nCompany: ${form.company}\nMy Skills/Experience: ${form.skills||"Not specified"}\nTone: ${form.tone}\n\nWrite a complete, ready-to-send cover letter. 3 paragraphs. No placeholders.`,
        "You are an expert career coach. Write professional, human-sounding cover letters. Never use [brackets] or placeholder text."
      );
      setOutput(res);
    } catch(e) { setOutput("⚠️ Error: "+e.message); }
    setLoading(false);
  };

  const copy = () => { copyText(output); setToast("Copied!"); setTimeout(()=>setToast(""),2000); };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div className="row2">
        <div>
          <label className="label">Job Title *</label>
          <input type="text" value={form.jobTitle} onChange={e=>setForm({...form,jobTitle:e.target.value})} placeholder="e.g. Software Engineer" />
        </div>
        <div>
          <label className="label">Company Name *</label>
          <input type="text" value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder="e.g. Google" />
        </div>
      </div>
      <div>
        <label className="label">Your Skills & Experience</label>
        <textarea rows={3} value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})} placeholder="e.g. 3 years React experience, led team of 5..." />
      </div>
      <div>
        <label className="label">Tone</label>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {["Professional","Enthusiastic","Formal","Conversational"].map(t=>(
            <button key={t} className={`btn ${form.tone===t?"btn-primary":"btn-ghost"}`}
              style={{padding:"8px 16px",fontSize:13}} onClick={()=>setForm({...form,tone:t})}>{t}</button>
          ))}
        </div>
      </div>
      <button className="btn btn-primary" onClick={generate} disabled={loading||!form.jobTitle||!form.company}>
        {loading?<><span className="loading-dots"><span/><span/><span/></span> Generating...</>:"✨ Generate Cover Letter"}
      </button>
      {output && (
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <label className="label" style={{margin:0}}>Your Cover Letter</label>
            <button className="btn btn-teal" style={{padding:"6px 14px",fontSize:12}} onClick={copy}>Copy ✓</button>
          </div>
          <div className="output-box">{output}</div>
        </div>
      )}
      {toast && <div className="toast">✅ {toast}</div>}
    </div>
  );
}

/* ── AI PARAPHRASER ── */
function Paraphraser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("Standard");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const modes = ["Standard","Fluent","Formal","Creative","Shorten","Expand"];

  const paraphrase = async () => {
    if (!input.trim()) return;
    setLoading(true); setOutput("");
    try {
      const res = await callClaude(
        `Paraphrase the following text in ${mode} style. Keep the meaning. Only return the rewritten text, nothing else.\n\n"${input}"`,
        "You are a professional writing assistant. Rewrite text as instructed. Return only the rewritten text without quotes or explanation."
      );
      setOutput(res);
    } catch(e) { setOutput("⚠️ Error: "+e.message); }
    setLoading(false);
  };

  const copy = () => { copyText(output); setToast("Copied!"); setTimeout(()=>setToast(""),2000); };

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div>
        <label className="label">Original Text</label>
        <textarea rows={6} value={input} onChange={e=>setInput(e.target.value)} placeholder="Paste the text you want to paraphrase..." />
        <div style={{textAlign:"right",fontSize:12,color:C.muted,marginTop:4}}>
          {input.trim()?input.trim().split(/\s+/).length:0} words
        </div>
      </div>
      <div>
        <label className="label">Style</label>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {modes.map(m=>(
            <button key={m} className={`btn ${mode===m?"btn-primary":"btn-ghost"}`}
              style={{padding:"8px 16px",fontSize:13}} onClick={()=>setMode(m)}>{m}</button>
          ))}
        </div>
      </div>
      <button className="btn btn-primary" onClick={paraphrase} disabled={loading||!input.trim()}>
        {loading?<><span className="loading-dots"><span/><span/><span/></span> Rewriting...</>:"🔄 Paraphrase"}
      </button>
      {output && (
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <label className="label" style={{margin:0}}>Rewritten Text</label>
            <button className="btn btn-teal" style={{padding:"6px 14px",fontSize:12}} onClick={copy}>Copy ✓</button>
          </div>
          <div className="output-box">{output}</div>
        </div>
      )}
      {toast && <div className="toast">✅ {toast}</div>}
    </div>
  );
}

/* ── MAIN APP ── */
export default function ToolNest() {
  const [activeTool, setActiveTool] = useState(null);
  const activeData = TOOLS.find(t=>t.id===activeTool);

  const renderTool = () => {
    switch(activeTool) {
      case "word-counter":   return <WordCounter />;
      case "case-converter": return <CaseConverter />;
      case "yt-thumbnail":   return <YTThumbnail />;
      case "image-compress": return <ImageCompressor />;
      case "cover-letter":   return <CoverLetter />;
      case "paraphraser":    return <Paraphraser />;
      default: return null;
    }
  };

  return (
    <>
      <style>{css}</style>

      <nav className="nav">
        <div className="nav-logo" onClick={()=>setActiveTool(null)}>ToolNest</div>
        <div className="nav-badge">6 Free Tools</div>
      </nav>

      {!activeTool && (
        <>
          <section className="hero">
            <div className="hero-eyebrow">⚡ Free Online Tools</div>
            <h1 className="hero-title">Every tool you need,<br /><span>one place.</span></h1>
            <p className="hero-sub">AI-powered writing tools, file utilities, and everyday helpers — completely free, no signup required.</p>
            <div className="hero-stats">
              <div className="stat"><div className="stat-n">6</div><div className="stat-l">Free Tools</div></div>
              <div className="stat"><div className="stat-n">AI</div><div className="stat-l">Powered</div></div>
              <div className="stat"><div className="stat-n">0</div><div className="stat-l">Signup Needed</div></div>
              <div className="stat"><div className="stat-n">∞</div><div className="stat-l">Free Uses</div></div>
            </div>
          </section>
          <div className="tools-section">
            <div className="section-label">All Tools</div>
            <div className="tools-grid">
              {TOOLS.map(tool=>(
                <div key={tool.id} className="tool-card" onClick={()=>setActiveTool(tool.id)}>
                  {tool.badge && <div className="tool-card-badge">{tool.badge}</div>}
                  <div className="tool-card-icon">{tool.icon}</div>
                  <div className="tool-card-name">{tool.name}</div>
                  <div className="tool-card-desc">{tool.desc}</div>
                </div>
              ))}
            </div>
            <div className="ad-slot">📢 Advertisement — Your AdSense code goes here</div>
          </div>
        </>
      )}

      {activeTool && (
        <div className="workspace">
          <div style={{marginBottom:20}}>
            <button className="btn btn-ghost" style={{padding:"6px 14px",fontSize:13}} onClick={()=>setActiveTool(null)}>
              ← Back to all tools
            </button>
          </div>
          <div className="workspace-header">
            <div className="workspace-icon">{activeData?.icon}</div>
            <div>
              <div className="workspace-title">{activeData?.name}</div>
              <div className="workspace-sub">{activeData?.desc}</div>
            </div>
          </div>
          <div className="ad-slot">📢 Advertisement — Your AdSense code goes here</div>
          {renderTool()}
          <div className="ad-slot" style={{marginTop:32}}>📢 Advertisement — Your AdSense code goes here</div>
          <div style={{marginTop:32}}>
            <div className="section-label">Try Other Tools</div>
            <div className="tools-grid">
              {TOOLS.filter(t=>t.id!==activeTool).map(tool=>(
                <div key={tool.id} className="tool-card" onClick={()=>setActiveTool(tool.id)}>
                  {tool.badge && <div className="tool-card-badge">{tool.badge}</div>}
                  <div className="tool-card-icon">{tool.icon}</div>
                  <div className="tool-card-name">{tool.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <strong>ToolNest</strong> — Free online tools for everyone<br />
        <span style={{fontSize:12,marginTop:6,display:"block"}}>No signup • No spam • Just tools that work</span>
      </footer>
    </>
  );
}
