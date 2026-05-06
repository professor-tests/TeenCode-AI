import { useState, useEffect, useRef, useMemo } from "react";
import { Play, RefreshCw, Save, Eye, Code2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// CodeMirror
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { html as langHtml } from "@codemirror/lang-html";
import { css as langCss } from "@codemirror/lang-css";
import { javascript as langJs } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

// ─── المحتوى الافتراضي ───────────────────────────────────────────────────────

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

// ─── الثيم المخصص لـ CodeMirror ──────────────────────────────────────────────

const customTheme = EditorView.theme({
    "&": {
        height: "100%",
        fontSize: "13px",
        background: "#0a0a12",
    },
    ".cm-editor": {
        height: "100%",
    },
    ".cm-editor.cm-focused": {
        outline: "none",
    },
    ".cm-scroller": {
        overflow: "auto",
        fontFamily: "'Fira Code', 'Fira Mono', monospace",
        lineHeight: "1.25rem",
    },
    ".cm-gutters": {
        background: "rgba(255,255,255,0.02)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        color: "rgba(255,255,255,0.2)",
    },
    ".cm-activeLineGutter": {
        background: "rgba(139,92,246,0.12)",
    },
    ".cm-activeLine": {
        background: "rgba(139,92,246,0.06)",
    },
    ".cm-selectionBackground": {
        background: "rgba(139,92,246,0.3) !important",
    },
    ".cm-cursor": {
        borderLeftColor: "#c084fc",
    },
});

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "html" | "css" | "js";

// ─── Component ────────────────────────────────────────────────────────────────

export default function Playground() {
    const [tab, setTab] = useState<Tab>("html");
    const [html, setHtml] = useState(initialHTML);
    const [css, setCss] = useState(initialCSS);
    const [js, setJs] = useState(initialJS);
    const [autoRun, setAutoRun] = useState(true);
    const [srcDoc, setSrcDoc] = useState("");
    const [saved, setSaved] = useState(false);

    // refs لتجنب stale closures داخل CodeMirror
    const htmlRef = useRef(initialHTML);
    const cssRef = useRef(initialCSS);
    const jsRef = useRef(initialJS);
    const tabRef = useRef<Tab>("html");

    htmlRef.current = html;
    cssRef.current = css;
    jsRef.current = js;
    tabRef.current = tab;

    const editorContainerRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);

    // ── عدد الأسطر للتاب الحالي ──
    const lineCount = (tab === "html" ? html : tab === "css" ? css : js).split("\n").length;

    // ── تجميع HTML + CSS + JS للـ preview ──
    const compose = useMemo(() => {
        const scriptTag = "<" + "script>" + js + "<" + "/script>";
        return html.replace(/<\/body>/i, `<style>${css}</style>${scriptTag}</body>`);
    }, [html, css, js]);

    // ── التشغيل التلقائي ──
    useEffect(() => {
        if (!autoRun) return;
        const timer = setTimeout(() => setSrcDoc(compose), 400);
        return () => clearTimeout(timer);
    }, [compose, autoRun]);

    // ── إنشاء/إعادة إنشاء محرر CodeMirror عند تغيير التاب ──
    useEffect(() => {
        const container = editorContainerRef.current;
        if (!container) return;

        // تدمير المحرر القديم
        viewRef.current?.destroy();
        viewRef.current = null;

        const langExtension =
            tab === "html" ? langHtml() :
            tab === "css"  ? langCss()  :
                             langJs();

        const initialDoc =
            tab === "html" ? htmlRef.current :
            tab === "css"  ? cssRef.current  :
                             jsRef.current;

        const view = new EditorView({
            state: EditorState.create({
                doc: initialDoc,
                extensions: [
                    basicSetup,
                    langExtension,
                    oneDark,
                    customTheme,
                    EditorView.updateListener.of((update) => {
                        if (!update.docChanged) return;
                        const value = update.state.doc.toString();
                        const currentTab = tabRef.current;
                        if (currentTab === "html") setHtml(value);
                        else if (currentTab === "css") setCss(value);
                        else setJs(value);
                    }),
                ],
            }),
            parent: container,
        });

        viewRef.current = view;

        return () => {
            view.destroy();
            viewRef.current = null;
        };
    }, [tab]);

    // ── إعادة تعيين المحرر عند الضغط على إعادة (للتاب الحالي) ──
    const dispatchReset = (resetValue: string) => {
        const view = viewRef.current;
        if (!view) return;
        view.dispatch({
            changes: {
                from: 0,
                to: view.state.doc.length,
                insert: resetValue,
            },
        });
    };

    // ── الدوال ──
    const run = () => setSrcDoc(compose);

    const reset = () => {
        setHtml(initialHTML);
        setCss(initialCSS);
        setJs(initialJS);
        // تحديث المحرر المفتوح حالياً مباشرةً
        const resetValue =
            tab === "html" ? initialHTML :
            tab === "css"  ? initialCSS  :
                             initialJS;
        dispatchReset(resetValue);
    };

    const save = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    // ─────────────────────────────────────────────────────────────────────────
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
                            <input
                                type="checkbox"
                                checked={autoRun}
                                onChange={(e) => setAutoRun(e.target.checked)}
                                className="accent-violet-500"
                            />
                            تشغيل تلقائي
                        </label>
                        <Button
                            onClick={run}
                            size="sm"
                            variant="outline"
                            className="!bg-transparent !hover:bg-white/5 border-white/10 rounded-xl"
                        >
                            <Play className="w-3.5 h-3.5 ml-1.5" />
                            تشغيل
                        </Button>
                        <Button
                            onClick={reset}
                            size="sm"
                            variant="outline"
                            className="!bg-transparent !hover:bg-white/5 border-white/10 rounded-xl"
                        >
                            <RefreshCw className="w-3.5 h-3.5 ml-1.5" />
                            إعادة
                        </Button>
                        <Button
                            onClick={save}
                            size="sm"
                            className="gradient-primary hover:opacity-90 rounded-xl"
                        >
                            <Save className="w-3.5 h-3.5 ml-1.5" />
                            {saved ? "تم الحفظ ✓" : "حفظ"}
                        </Button>
                    </div>
                </div>

                {/* Editor + Preview */}
                <div className="flex-1 grid lg:grid-cols-2 gap-4 min-h-0">

                    {/* Editor */}
                    <div className="glass-strong rounded-2xl overflow-hidden flex flex-col">

                        {/* Tab bar */}
                        <div className="flex items-center justify-between border-b border-white/5 px-3 py-2 bg-white/[0.02] flex-shrink-0">
                            <div className="flex items-center gap-1">
                                {(["html", "css", "js"] as Tab[]).map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTab(t)}
                                        className={cn(
                                            "px-3 py-1.5 text-xs font-mono font-semibold rounded-lg transition-all uppercase",
                                            tab === t
                                                ? "bg-violet-500/20 text-violet-300"
                                                : "text-muted-foreground hover:text-white"
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

                        {/* CodeMirror container — direction ltr دائماً للكود */}
                        <div
                            ref={editorContainerRef}
                            className="flex-1 overflow-hidden"
                            style={{ direction: "ltr" }}
                        />
                    </div>

                    {/* Preview */}
                    <div className="glass-strong rounded-2xl overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between border-b border-white/5 px-3 py-2 bg-white/[0.02] flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                                </div>
                                <span className="text-[10px] text-muted-foreground font-mono mr-2">
                                    preview.html
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
