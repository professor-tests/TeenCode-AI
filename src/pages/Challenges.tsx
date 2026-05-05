import { useState, useMemo, useEffect } from "react";
import { Target, Sparkles, CheckCircle2, XCircle, Lightbulb, RefreshCw, Trophy } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Challenge {
    id: string;
    title: string;
    description: string;
    difficulty: "سهل" | "متوسط" | "متقدم";
    xp: number;
    initialCode: string;
    check: (code: string) => boolean;
    hint: string;
}

const challenges: Challenge[] = [
    {
        id: "c1",
        title: "غيّر لون الزر إلى الأزرق",
        description: "عدّل الكود بحيث يصبح لون خلفية الزر أزرق (blue)",
        difficulty: "سهل",
        xp: 50,
        initialCode: `<button style="background: red; color: white; padding: 10px 20px;">اضغط هنا</button>`,
        check: (code) => /background\s*:\s*blue/i.test(code) || /background\s*:\s*#0000ff/i.test(code) || /background\s*:\s*#[0-9a-f]*(?=[0-9a-f]{2}ff)/i.test(code),
        hint: "ابحث عن كلمة 'red' وغيّرها إلى 'blue'",
    },
    {
        id: "c2",
        title: "صلّح الخطأ في الكود",
        description: "يوجد خطأ في وسم الإغلاق. أصلحه ليظهر النص بشكل صحيح",
        difficulty: "سهل",
        xp: 60,
        initialCode: `<h1>مرحباً بك</h2>
<p>هذا نص تجريبي</p>`,
        check: (code) => /<h1>[\s\S]*<\/h1>/.test(code) && !/<\/h2>/.test(code),
        hint: "وسم &lt;h1&gt; يجب أن يُغلق بـ &lt;/h1&gt;",
    },
    {
        id: "c3",
        title: "أضف زر بعنوان 'تسجيل'",
        description: "أضف زر جديد نصه 'تسجيل' بعد العنوان",
        difficulty: "متوسط",
        xp: 80,
        initialCode: `<h1>صفحة التسجيل</h1>
<!-- أضف الزر هنا -->`,
        check: (code) => /<button[^>]*>\s*تسجيل\s*<\/button>/.test(code),
        hint: "استخدم &lt;button&gt;تسجيل&lt;/button&gt;",
    },
    {
        id: "c4",
        title: "اجعل العنوان يظهر في الوسط",
        description: "استخدم CSS لمحاذاة النص في المنتصف",
        difficulty: "متوسط",
        xp: 100,
        initialCode: `<h1 style="color: purple;">عنواني المميز</h1>`,
        check: (code) => /text-align\s*:\s*center/i.test(code),
        hint: "أضف text-align: center إلى خصائص الـ style",
    },
    {
        id: "c5",
        title: "أنشئ زرين بجانب بعض",
        description: "أنشئ زرين 'موافق' و'إلغاء' داخل div بخاصية flexbox",
        difficulty: "متقدم",
        xp: 150,
        initialCode: `<div style="">
  <!-- ضع الزرين هنا -->
</div>`,
        check: (code) =>
            /display\s*:\s*flex/i.test(code) &&
            /<button[^>]*>\s*موافق\s*<\/button>/.test(code) &&
            /<button[^>]*>\s*إلغاء\s*<\/button>/.test(code),
        hint: "استخدم display: flex في الـ div، وأضف زرين داخله",
    },
];

const diffColors: Record<Challenge["difficulty"], string> = {
    "سهل": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "متوسط": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "متقدم": "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

export default function Challenges() {
    const [activeId, setActiveId] = useState(challenges[0].id);
    const [codes, setCodes] = useState<Record<string, string>>(
        Object.fromEntries(challenges.map((c) => [c.id, c.initialCode]))
    );
    const [completed, setCompleted] = useState<Set<string>>(new Set());
    const [showHint, setShowHint] = useState(false);
    const [feedback, setFeedback] = useState<"success" | "fail" | null>(null);

    const active = challenges.find((c) => c.id === activeId)!;
    const code = codes[activeId];

    useEffect(() => {
        setShowHint(false);
        setFeedback(null);
    }, [activeId]);

    const preview = useMemo(() => {
        return `<html><head><style>body{font-family:Cairo,sans-serif;padding:20px;}</style></head><body>${code}</body></html>`;
    }, [code]);

    const checkAnswer = () => {
        if (active.check(code)) {
            setFeedback("success");
            setCompleted((s) => new Set([...s, activeId]));
        } else {
            setFeedback("fail");
            setTimeout(() => setFeedback(null), 2000);
        }
    };

    const resetCode = () => {
        setCodes((c) => ({ ...c, [activeId]: active.initialCode }));
        setFeedback(null);
    };

    const totalXP = Array.from(completed).reduce((sum, id) => sum + (challenges.find((c) => c.id === id)?.xp || 0), 0);

    return (
        <AppLayout>
            <div className="p-4 lg:p-6 h-screen flex flex-col">
                <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black flex items-center gap-3">
                            <Target className="w-7 h-7 text-rose-400" />
                            <span className="gradient-text">تحديات برمجية</span>
                        </h1>
                        <p className="text-xs text-muted-foreground mt-1">حل التحديات واكسب نقاط XP</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span className="text-sm font-bold">{totalXP} XP</span>
                        </div>
                        <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-violet-400" />
                            <span className="text-sm font-bold">{completed.size} / {challenges.length}</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 grid lg:grid-cols-[300px_1fr] gap-4 min-h-0">
                    {/* Challenge list */}
                    <div className="glass rounded-2xl p-3 overflow-auto scrollbar-thin space-y-2">
                        {challenges.map((c, i) => {
                            const done = completed.has(c.id);
                            const active = activeId === c.id;
                            return (
                                <button
                                    key={c.id}
                                    onClick={() => setActiveId(c.id)}
                                    className={cn(
                                        "w-full text-right p-3 rounded-xl transition-all border",
                                        active ? "bg-violet-500/10 border-violet-500/30" : "border-transparent hover:bg-white/5"
                                    )}
                                >
                                    <div className="flex items-start gap-2">
                                        <div className={cn(
                                            "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold",
                                            done ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-muted-foreground"
                                        )}>
                                            {done ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-semibold mb-1 truncate">{c.title}</div>
                                            <div className="flex items-center gap-2 text-[10px]">
                                                <span className={cn("px-1.5 py-0.5 rounded-full border", diffColors[c.difficulty])}>
                                                    {c.difficulty}
                                                </span>
                                                <span className="text-amber-400 flex items-center gap-0.5">
                                                    <Sparkles className="w-2.5 h-2.5" />
                                                    {c.xp}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active challenge */}
                    <div className="flex flex-col gap-4 min-h-0">
                        <div className="glass rounded-2xl p-5">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div>
                                    <h2 className="text-xl font-bold mb-1">{active.title}</h2>
                                    <p className="text-sm text-muted-foreground">{active.description}</p>
                                </div>
                                <span className={cn("px-2.5 py-1 rounded-full text-[11px] border whitespace-nowrap", diffColors[active.difficulty])}>
                                    {active.difficulty}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <Button
                                    size="sm"
                                    onClick={() => setShowHint(!showHint)}
                                    variant="outline"
                                    className="!bg-transparent !hover:bg-white/5 border-white/10 rounded-xl"
                                >
                                    <Lightbulb className="w-3.5 h-3.5 ml-1.5" />
                                    {showHint ? "إخفاء التلميح" : "تلميح"}
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={resetCode}
                                    variant="outline"
                                    className="!bg-transparent !hover:bg-white/5 border-white/10 rounded-xl"
                                >
                                    <RefreshCw className="w-3.5 h-3.5 ml-1.5" />
                                    إعادة
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={checkAnswer}
                                    className="gradient-primary hover:opacity-90 rounded-xl mr-auto"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5 ml-1.5" />
                                    تحقّق من الحل
                                </Button>
                            </div>
                            {showHint && (
                                <div
                                    className="mt-3 glass rounded-xl p-3 text-xs text-amber-300 border border-amber-500/30 animate-fade-in"
                                    dangerouslySetInnerHTML={{ __html: "💡 " + active.hint }}
                                />
                            )}
                            {feedback === "success" && (
                                <div className="mt-3 glass rounded-xl p-3 text-sm text-emerald-300 border border-emerald-500/30 flex items-center gap-2 animate-fade-in">
                                    <CheckCircle2 className="w-4 h-4" />
                                    أحسنت! الحل صحيح ✨ لقد كسبت {active.xp} XP
                                </div>
                            )}
                            {feedback === "fail" && (
                                <div className="mt-3 glass rounded-xl p-3 text-sm text-rose-300 border border-rose-500/30 flex items-center gap-2 animate-fade-in">
                                    <XCircle className="w-4 h-4" />
                                    ليس بعد! جرّب مرة أخرى، أو اضغط "تلميح" للمساعدة
                                </div>
                            )}
                        </div>

                        {/* Editor + preview */}
                        <div className="grid md:grid-cols-2 gap-4 flex-1 min-h-0">
                            <div className="glass-strong rounded-2xl overflow-hidden flex flex-col">
                                <div className="px-3 py-2 text-[11px] font-mono text-muted-foreground border-b border-white/5 bg-white/[0.02]">
                                    code.html
                                </div>
                                <textarea
                                    value={code}
                                    onChange={(e) => setCodes((c) => ({ ...c, [activeId]: e.target.value }))}
                                    spellCheck={false}
                                    dir="ltr"
                                    className="flex-1 bg-[#0a0a12] text-white font-mono text-[13px] p-4 outline-none resize-none scrollbar-thin leading-5"
                                />
                            </div>
                            <div className="glass-strong rounded-2xl overflow-hidden flex flex-col">
                                <div className="px-3 py-2 text-[11px] font-mono text-muted-foreground border-b border-white/5 bg-white/[0.02]">
                                    preview
                                </div>
                                <iframe
                                    srcDoc={preview}
                                    title="challenge-preview"
                                    sandbox="allow-scripts"
                                    className="flex-1 bg-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}