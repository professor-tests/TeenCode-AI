import { Link } from "react-router-dom";
import { TrendingUp, Sparkles, Trophy, Target, Flame, Clock, ArrowLeft, Code2, CheckCircle2, Lock, Play } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";

const stats = [
    { label: "نقاط الخبرة", value: "2,450", sub: "+120 اليوم", icon: Sparkles, color: "from-amber-500 to-orange-500" },
    { label: "المستوى الحالي", value: "7", sub: "68% للمستوى 8", icon: TrendingUp, color: "from-violet-500 to-pink-500" },
    { label: "الدروس المكتملة", value: "34", sub: "من أصل 200", icon: CheckCircle2, color: "from-emerald-500 to-teal-500" },
    { label: "سلسلة الأيام", value: "12", sub: "🔥 متتالية", icon: Flame, color: "from-rose-500 to-red-500" },
];

const recentLessons = [
    { title: "CSS Flexbox - المحاذاة", progress: 100, level: "متوسط", xp: 80, done: true },
    { title: "JavaScript - Events & Listeners", progress: 65, level: "متوسط", xp: 120, done: false },
    { title: "HTML Forms - التحقق من البيانات", progress: 100, level: "مبتدئ", xp: 60, done: true },
    { title: "CSS Animations - الحركات", progress: 40, level: "متقدم", xp: 150, done: false },
];

const badges = [
    { name: "المبرمج الأول", icon: "🏆", earned: true, color: "from-amber-500 to-orange-500" },
    { name: "نجم HTML", icon: "⭐", earned: true, color: "from-violet-500 to-pink-500" },
    { name: "سيد CSS", icon: "🎨", earned: true, color: "from-cyan-500 to-blue-500" },
    { name: "محارب JS", icon: "⚡", earned: false, color: "from-yellow-500 to-amber-500" },
    { name: "بطل الأسبوع", icon: "👑", earned: false, color: "from-pink-500 to-rose-500" },
    { name: "محترف المشاريع", icon: "🚀", earned: false, color: "from-emerald-500 to-teal-500" },
];

const challenges = [
    { title: "غيّر لون الزر إلى الأزرق", xp: 50, difficulty: "سهل", color: "emerald" },
    { title: "صلّح الخطأ في دالة JavaScript", xp: 100, difficulty: "متوسط", color: "amber" },
    { title: "ابنِ صفحة تسجيل دخول كاملة", xp: 200, difficulty: "متقدم", color: "rose" },
];

export default function Dashboard() {
    return (
        <AppLayout>
            <div className="p-6 lg:p-10 max-w-7xl">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black mb-2">
                                مرحباً، <span className="gradient-text">سمير</span> 👋
                            </h1>
                            <p className="text-muted-foreground">لنواصل رحلة التعلّم اليوم — أنت تبلي بلاءً رائعاً!</p>
                        </div>
                        <Link to="/playground">
                            <Button className="gradient-primary hover:opacity-90 rounded-xl h-11 px-6">
                                <Play className="w-4 h-4 ml-2" />
                                افتح Playground
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((s, i) => (
                        <div key={s.label} className="glass rounded-2xl p-5 animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                                <s.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-2xl font-black mb-1">{s.value}</div>
                            <div className="text-xs text-muted-foreground">{s.label}</div>
                            <div className="text-[10px] text-emerald-400 mt-1">{s.sub}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Progress card */}
                        <div className="relative glass-strong rounded-3xl p-6 overflow-hidden">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-violet-500/20 blur-3xl rounded-full" />
                            <div className="relative">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <div className="text-xs text-muted-foreground mb-1">مسار التعلّم</div>
                                        <div className="text-xl font-bold">مطوّر الواجهات الأمامية</div>
                                    </div>
                                    <div className="text-left">
                                        <div className="text-3xl font-black gradient-text">34%</div>
                                        <div className="text-xs text-muted-foreground">مكتمل</div>
                                    </div>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-4">
                                    <div className="h-full w-[34%] gradient-primary rounded-full shimmer" />
                                </div>
                                <div className="grid grid-cols-3 gap-3 mt-6">
                                    {[
                                        { label: "HTML", done: 100, color: "violet" },
                                        { label: "CSS", done: 60, color: "cyan" },
                                        { label: "JavaScript", done: 20, color: "amber" },
                                    ].map((m) => (
                                        <div key={m.label} className="glass rounded-xl p-3">
                                            <div className="flex justify-between text-xs mb-2">
                                                <span className="font-semibold">{m.label}</span>
                                                <span className="text-muted-foreground">{m.done}%</span>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full bg-gradient-to-l from-${m.color}-500 to-${m.color}-400 rounded-full`} style={{ width: `${m.done}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Recent lessons */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold">دروسك الحالية</h2>
                                <Link to="/lessons" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                                    عرض الكل <ArrowLeft className="w-3 h-3" />
                                </Link>
                            </div>
                            <div className="space-y-3">
                                {recentLessons.map((l) => (
                                    <div key={l.title} className="glass rounded-2xl p-4 flex items-center gap-4 hover:bg-white/[0.04] transition-colors group cursor-pointer">
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${l.done ? "bg-emerald-500/20" : "gradient-primary"}`}>
                                            {l.done ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Code2 className="w-5 h-5 text-white" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-sm mb-1 truncate">{l.title}</div>
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                                <span>{l.level}</span>
                                                <span className="flex items-center gap-1 text-amber-400">
                                                    <Sparkles className="w-3 h-3" />
                                                    {l.xp} XP
                                                </span>
                                            </div>
                                        </div>
                                        <div className="hidden md:block w-32">
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full gradient-primary rounded-full" style={{ width: `${l.progress}%` }} />
                                            </div>
                                            <div className="text-[10px] text-muted-foreground mt-1 text-left">{l.progress}%</div>
                                        </div>
                                        <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-white group-hover:-translate-x-1 transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-6">
                        {/* Badges */}
                        <div className="glass rounded-3xl p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-bold flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-amber-400" />
                                    الشارات
                                </h3>
                                <span className="text-xs text-muted-foreground">3 / 6</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {badges.map((b) => (
                                    <div
                                        key={b.name}
                                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all ${b.earned
                                                ? `bg-gradient-to-br ${b.color} text-white`
                                                : "glass opacity-40"
                                            }`}
                                    >
                                        <div className="text-2xl mb-1">{b.earned ? b.icon : "🔒"}</div>
                                        <div className="text-[9px] font-semibold leading-tight">{b.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Challenges */}
                        <div className="glass rounded-3xl p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-bold flex items-center gap-2">
                                    <Target className="w-4 h-4 text-rose-400" />
                                    تحديات اليوم
                                </h3>
                                <Link to="/challenges" className="text-xs text-violet-400 hover:text-violet-300">الكل</Link>
                            </div>
                            <div className="space-y-2">
                                {challenges.map((c) => (
                                    <Link key={c.title} to="/challenges" className="block glass rounded-xl p-3 hover:bg-white/[0.04] transition-colors">
                                        <div className="text-sm font-medium mb-1.5">{c.title}</div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className={`px-2 py-0.5 rounded-full bg-${c.color}-500/20 text-${c.color}-400`}>{c.difficulty}</span>
                                            <span className="flex items-center gap-1 text-amber-400">
                                                <Sparkles className="w-3 h-3" />
                                                {c.xp} XP
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Time card */}
                        <div className="relative glass rounded-3xl p-6 overflow-hidden">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-cyan-500/30 blur-2xl rounded-full" />
                            <div className="relative">
                                <Clock className="w-8 h-8 text-cyan-400 mb-3" />
                                <div className="text-3xl font-black">12س 45د</div>
                                <div className="text-xs text-muted-foreground mt-1">وقت التعلّم هذا الأسبوع</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}