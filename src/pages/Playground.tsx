import { useState, useEffect, useMemo } from "react";
import { Play, RefreshCw, Save, Download, Code2, Eye } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const initialHTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>مشروعي الأول</title>
</head>
<body>
  <div class="card">
    <h1>مرحباً بك في TeenCode! 🚀</h1>
    <p>جرّب تعديل الكود وشاهد النتيجة فوراً.</p>
    <button id="btn">اضغط هنا</button>
    <p id="counter">عدد النقرات: 0</p>
  </div>
</body>
</html>`;

const initialCSS = `body {
  font-family: 'Cairo', sans-serif;
  background: linear-gradient(135deg, #8B5CF6, #06B6D4);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 20px;
}

.card {
  background: white;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  text-align: center;
  max-width: 500px;
}

h1 {
  color: #8B5CF6;
  font-size: 28px;
  margin: 0 0 16px 0;
}

p {
  color: #555;
  line-height: 1.6;
}

button {
  background: linear-gradient(135deg, #8B5CF6, #EC4899);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: transform 0.2s;
}

button:hover {
  transform: translateY(-2px);
}`;

const initialJS = `let count = 0;
const btn = document.getElementById('btn');
const counter = document.getElementById('counter');

btn.addEventListener('click', () => {
  count++;
  counter.textContent = 'عدد النقرات: ' + count;
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    btn.style.transform = 'scale(1)';
  }, 150);
});`;

type Tab = "html" | "css" | "js";

function escapeHtml(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightCode(code: string, lang: Tab): string {
    let escaped = escapeHtml(code);

    if (lang === "html") {
        escaped = escaped
            .replace(/(&lt;\/?)([\w-]+)/g, '$1<span style="color:#c084fc">$2</span>')
            .replace(/([\w-]+)=(&quot;|")([^"&]*)(&quot;|")/g, '<span style="color:#22d3ee">$1</span>=<span style="color:#fbbf24">$2$3$4</span>');
    } else if (lang === "css") {
        escaped = escaped
            .replace(/([.#][\w-]+)(?=\s*\{)/g, '<span style="color:#f472b6">$1</span>')
            .replace(/\b([\w-]+)(\s*:)/g, '<span style="color:#22d3ee">$1</span>$2');
    } else {
        escaped = escaped
            .replace(/\b(const|let|var|function|return|if|else|for|while|document|getElementById|addEventListener|setTimeout)\b/g, '<span style="color:#c084fc">$1</span>')
            .replace(/('[^']*')/g, '<span style="color:#fbbf24">$1</span>')
            .replace(/(\/\/[^\n]*)/g, '<span style="color:#64748b">$1</span>');
    }

    return escaped;
}

export default function Playground() {
    const [tab, setTab] = useState<Tab>("html");
    const [html, setHtml] = useState(initialHTML);
    const [css, setCss] = useState(initialCSS);
    const [js, setJs] = useState(initialJS);
    const [autoRun, setAutoRun] = useState(true);
    const [srcDoc, setSrcDoc] = useState("");
    const [saved, setSaved] = useState(false);

    const currentValue = tab === "html" ? html : tab === "css" ? css : js;
    const setCurrent = tab === "html" ? setHtml : tab === "css" ? setCss : setJs;

    // كل tab يعرض محتواه فقط - ما نخلطهم تلقائياً
    const getPreviewContent = useMemo(() => {
        if (tab === "html") {
            return html;
        } else if (tab === "css") {
            return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>CSS Preview</title></head>
<body style="background:#0a0a12; color:#e2e8f0; font-family:'Cairo',monospace; padding:20px; margin:0; white-space:pre-wrap; line-height:1.6; font-size:14px;">${escapeHtml(css)}</body>
</html>`;
        } else {
            return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8"><title>JS Preview</title></head>
<body style="background:#0a0a12; color:#e2e8f0; font-family:'Cairo',monospace; padding:20px; margin:0; white-space:pre-wrap; line-height:1.6; font-size:14px;">${escapeHtml(js)}</body>
</html>`;
        }
    }, [html, css, js, tab]);

    // تحديث srcDoc عند فتح الصفحة أول مرة وعند كل تغيير
    useEffect(() => {
        if (!autoRun) return;
        const t = setTimeout(() => setSrcDoc(getPreviewContent), 400);
        return () => clearTimeout(t);
    }, [getPreviewContent, autoRun]);

    // تشغيل يدوي
    const run = () => setSrcDoc(getPreviewContent);

    const reset = () => {
        setHtml(initialHTML);
        setCss(initialCSS);
        setJs(initialJS);
    };

    const save = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const highlighted = highlightCode(currentValue, tab);
    const lineCount = currentValue.split("\n").length;

    return (
        <AppLayout>
            <div className="p-4 lg:p-6 h-screen flex flex-col">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 flex-shrink-0">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black">
                            Code <span className="gradient-text">Playground</span>
                        </h1>
                        <p className="text-xs text-muted-foreground mt-1">اكتب الكود وشاهد النتيجة فوراً</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <label className="flex items-center gap-2 text-xs text-muted-foreground glass rounded-xl px-3 py-2 cursor-pointer">
                            <input type="checkbox" checked={autoRun} onChange={(e) => setAutoRun(e.target.checked)} className="accent-violet-500" />
                            تشغيل تلقائي
                        </label>
                        <Button onClick={run} size="sm" variant="outline" className="!bg-transparent !hover:bg-white/5 border-white/10 rounded-xl">
                            <Play className="w-3.5 h-3.5 ml-1.5" />
                            تشغيل
                        </Button>
                        <Button onClick={reset} size="sm" variant="outline" className="!bg-transparent !hover:bg-white/5 border-white/10 rounded-xl">
                            <RefreshCw className="w-3.5 h-3.5 ml-1.5" />
                            إعادة
                        </Button>
                        <Button onClick={save} size="sm" className="gradient-primary hover:opacity-90 rounded-xl">
                            <Save className="w-3.5 h-3.5 ml-1.5" />
                            {saved ? "تم الحفظ ✓" : "حفظ"}
                        </Button>
                    </div>
                </div>

                {/* Editor + Preview */}
                <div className="flex-1 grid lg:grid-cols-2 gap-4 min-h-0">
                    {/* Editor */}
                    <div className="glass-strong rounded-2xl overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between border-b border-white/5 px-3 py-2 bg-white/[0.02]">
                            <div className="flex items-center gap-1">
                                {(["html", "css", "js"] as Tab[]).map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTab(t)}
                                        className={cn(
                                            "px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition-all uppercase",
                                            tab === t ? "bg-violet-500/20 text-violet-300" : "text-muted-foreground hover:text-white"
                                        )}
                                    >
                                        {t === "js" ? "JavaScript" : t.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                                <Code2 className="w-3 h-3" />
                                {lineCount} lines
                            </div>
                        </div>
                        <div className="flex-1 relative bg-[#0a0a12] overflow-hidden">
                            <div className="absolute inset-0 flex overflow-hidden" dir="ltr">
                                {/* Line numbers */}
                                <div className="w-10 flex-shrink-0 bg-white/[0.02] text-[11px] font-mono text-muted-foreground/40 text-center py-4 select-none overflow-hidden">
                                    {Array.from({ length: lineCount }).map((_, i) => (
                                        <div key={i} className="leading-5">{i + 1}</div>
                                    ))}
                                </div>
                                {/* Code area - مطابقة تامة بين textarea و pre */}
                                <div className="flex-1 relative">
                                    <pre
                                        className="absolute inset-0 p-4 text-[13px] font-mono leading-5 whitespace-pre-wrap break-words pointer-events-none overflow-auto text-white"
                                        style={{ 
                                            fontFamily: "monospace",
                                            fontSize: "13px",
                                            lineHeight: "20px",
                                            padding: "16px",
                                            whiteSpace: "pre-wrap",
                                            wordWrap: "break-word",
                                            overflow: "auto"
                                        }}
                                        dangerouslySetInnerHTML={{ __html: highlighted + "\n" }}
                                    />
                                    <textarea
                                        value={currentValue}
                                        onChange={(e) => setCurrent(e.target.value)}
                                        spellCheck={false}
                                        className="absolute inset-0 p-4 text-[13px] font-mono leading-5 bg-transparent outline-none resize-none text-transparent caret-white scrollbar-thin"
                                        style={{ 
                                            WebkitTextFillColor: "transparent",
                                            fontFamily: "monospace",
                                            fontSize: "13px",
                                            lineHeight: "20px",
                                            padding: "16px",
                                            whiteSpace: "pre-wrap",
                                            wordWrap: "break-word",
                                            overflow: "auto"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="glass-strong rounded-2xl overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between border-b border-white/5 px-3 py-2 bg-white/[0.02]">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                                </div>
                                <span className="text-[10px] text-muted-foreground font-mono mr-2">
                                    preview.{tab === "js" ? "js" : tab === "css" ? "css" : "html"}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                                <Eye className="w-3 h-3" />
                                Live
                            </div>
                        </div>
                        <iframe
                            srcDoc={srcDoc}
                            title="preview"
                            sandbox="allow-scripts"
                            className="flex-1 bg-white"
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
