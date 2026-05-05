import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, BookOpen, CheckCircle2, Lock, Clock, Sparkles, Filter } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { cn } from "@/lib/utils";

const categories = [
    { id: "all", label: "الكل", count: 48 },
    { id: "html", label: "HTML", count: 12, color: "violet" },
    { id: "css", label: "CSS", count: 15, color: "cyan" },
    { id: "js", label: "JavaScript", count: 18, color: "amber" },
    { id: "projects", label: "مشاريع", count: 3, color: "pink" },
];

const lessons = [
    { id: 1, title: "مقدمة إلى HTML", category: "html", level: "مبتدئ", duration: "10 د", xp: 40, progress: 100, locked: false, emoji: "📄" },
    { id: 2, title: "العناوين والفقرات", category: "html", level: "مبتدئ", duration: "15 د", xp: 50, progress: 100, locked: false, emoji: "📝" },
    { id: 3, title: "الصور والروابط", category: "html", level: "مبتدئ", duration: "12 د", xp: 45, progress: 100, locked: false, emoji: "🖼️" },
    { id: 4, title: "القوائم والجداول", category: "html", level: "مبتدئ", duration: "18 د", xp: 60, progress: 60, locked: false, emoji: "📋" },
    { id: 5, title: "النماذج والتحقق", category: "html", level: "متوسط", duration: "25 د", xp: 80, progress: 0, locked: false, emoji: "📋" },
    { id: 6, title: "مقدمة CSS", category: "css", level: "مبتدئ", duration: "12 د", xp: 50, progress: 100, locked: false, emoji: "🎨" },
    { id: 7, title: "الألوان والخطوط", category: "css", level: "مبتدئ", duration: "20 د", xp: 60, progress: 80, locked: false, emoji: "🌈" },
    { id: 8, title: "Flexbox - المحاذاة", category: "css", level: "متوسط", duration: "30 د", xp: 100, progress: 45, locked: false, emoji: "📐" },
    { id: 9, title: "CSS Grid", category: "css", level: "متوسط", duration: "35 د", xp: 120, progress: 0, locked: false, emoji: "🔲" },
    { id: 10, title: "التحريكات Animations", category: "css", level: "متقدم", duration: "40 د", xp: 150, progress: 0, locked: true, emoji: "✨" },
    { id: 11, title: "مقدمة JavaScript", category: "js", level: "مبتدئ", duration: "15 د", xp: 60, progress: 100, locked: false, emoji: "⚡" },
    { id: 12, title: "المتغيرات والأنواع", category: "js", level: "مبتدئ", duration: "20 د", xp: 70, progress: 75, locked: false, emoji: "📦" },
    { id: 13, title: "الدوال Functions", category: "js", level: "متوسط", duration: "30 د", xp: 100, progress: 0, locked: false, emoji: "🔧" },
    { id: 14, title: "DOM Manipulation", category: "js", level: "متوسط", duration: "35 د", xp: 120, progress: 0, locked: false, emoji: "🎯" },
    { id: 15, title: "Events & Listeners", category: "js", level: "متقدم", duration: "40 د", xp: 150, progress: 0, locked: true, emoji: "⚙️" },
    { id: 16, title: "مشروع: صفحة هبوط", category: "projects", level: "متوسط", duration: "60 د", xp: 250, progress: 0, locked: false, emoji: "🚀" },
    { id: 17, title: "مشروع: نظام تسجيل دخول", category: "projects", level: "متقدم", duration: "90 د", xp: 400, progress: 0, locked: true, emoji: "🔐" },
    { id: 18, title: "مشروع: تطبيق To-Do", category: "projects", level: "متقدم", duration: "120 د", xp: 500, progress: 0, locked: true, emoji: "✅" },
];

const levelColors: Record<string, string> = {
    "مبتدئ": "bg-emerald-500/20 text-emerald-400",
    "متوسط": "bg-amber-500/20 text-amber-400",
    "متقدم": "bg-rose-500/20 text-rose-400",
};

const categoryColors: Record<string, string> = {
    html: "from-violet-500 to-purple-500",
    css: "from-cyan-500 to-blue-500",
    js: "from-amber-500 to-orange-500",
    projects: "from-pink-500 to-rose-500",
};

export default function Lessons() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [search, setSearch] = useState("");

    const filtered = lessons.filter((l) => {
        const matchCat = activeCategory === "all" || l.category === activeCategory;
        const matchSearch = l.title.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <AppLayout>
            <div className="p-6 lg:p-10 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-black mb-2">
                        <span className="gradient-text">الدروس</span> التفاعلية
                    </h1>
                    <p className="text-muted-foreground">اختر درساً وابدأ التعلّم — كل درس يحتوي على شرح، أمثلة حية، وتمارين</p>
                </div>

                {/* Search + filter */}
                <div className="glass rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="ابحث عن درس..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pr-11 pl-4 py-2.5 text-sm outline-none focus:border-violet-500/50 transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Filter className="w-4 h-4" />
                        <span>{filtered.length} درس</span>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setActiveCategory(c.id)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2",
                                activeCategory === c.id
                                    ? "gradient-primary text-white glow-primary"
                                    : "glass hover:bg-white/[0.08]"
                            )}
                        >
                            {c.label}
                            <span className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded-full",
                                activeCategory === c.id ? "bg-white/20" : "bg-white/10"
                            )}>
                                {c.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Lessons grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((l, i) => (
                        <Link
                            key={l.id}
                            to={l.locked ? "#" : "/playground"}
                            className={cn(
                                "group relative glass rounded-3xl p-5 transition-all animate-fade-in",
                                l.locked ? "opacity-50 cursor-not-allowed" : "hover:bg-white/[0.04] hover:-translate-y-1"
                            )}
                            style={{ animationDelay: `${i * 30}ms` }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${categoryColors[l.category]} flex items-center justify-center text-2xl`}>
                                    {l.emoji}
                                </div>
                                {l.locked ? (
                                    <Lock className="w-4 h-4 text-muted-foreground" />
                                ) : l.progress === 100 ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                ) : null}
                            </div>

                            <h3 className="font-bold text-lg mb-2 leading-tight">{l.title}</h3>

                            <div className="flex items-center gap-2 mb-4 text-xs">
                                <span className={cn("px-2 py-0.5 rounded-full", levelColors[l.level])}>{l.level}</span>
                                <span className="text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {l.duration}
                                </span>
                                <span className="text-amber-400 flex items-center gap-1 mr-auto">
                                    <Sparkles className="w-3 h-3" />
                                    {l.xp}
                                </span>
                            </div>

                            {!l.locked && (
                                <div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-1">
                                        <div
                                            className={cn(
                                                "h-full rounded-full transition-all",
                                                l.progress === 100 ? "bg-emerald-500" : "gradient-primary"
                                            )}
                                            style={{ width: `${l.progress}%` }}
                                        />
                                    </div>
                                    <div className="text-[10px] text-muted-foreground text-left">{l.progress}%</div>
                                </div>
                            )}
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                        <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>لا توجد دروس مطابقة</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}