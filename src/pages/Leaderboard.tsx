import { useState } from "react";
import { Trophy, Medal, Crown, Sparkles, TrendingUp, Flame } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { cn } from "@/lib/utils";

const leaderboard = [
    { rank: 1, name: " اميرة الكويتة", xp: 12450, level: 18, streak: 45, badges: 12, avatar: "س", gradient: "from-amber-500 to-orange-500", change: 0 },
    { rank: 2, name: "يوسف الشكشب", xp: 11200, level: 17, streak: 32, badges: 11, avatar: "ي", gradient: "from-violet-500 to-pink-500", change: 1 },
    { rank: 3, name: "احمد محسن ", xp: 10850, level: 16, streak: 28, badges: 10, avatar: "ل", gradient: "from-cyan-500 to-blue-500", change: -1 },
    { rank: 4, name: "عمر دلالي", xp: 9820, level: 15, streak: 22, badges: 9, avatar: "ع", gradient: "from-emerald-500 to-teal-500", change: 2 },
    { rank: 5, name: "نور الدين", xp: 9200, level: 14, streak: 19, badges: 8, avatar: "ن", gradient: "from-pink-500 to-rose-500", change: 0 },
    { rank: 6, name: "فاطمة ", xp: 8640, level: 13, streak: 15, badges: 7, avatar: "ف", gradient: "from-indigo-500 to-purple-500", change: -1 },
    { rank: 7, name: "محمد ", xp: 7980, level: 12, streak: 14, badges: 7, avatar: "م", gradient: "from-teal-500 to-cyan-500", change: 3 },
    { rank: 8, name: " خليل", xp: 7320, level: 11, streak: 12, badges: 6, avatar: "ر", gradient: "from-fuchsia-500 to-pink-500", change: 0 },
    { rank: 9, name: "كريم ", xp: 6890, level: 11, streak: 10, badges: 6, avatar: "ك", gradient: "from-orange-500 to-red-500", change: -2 },
    { rank: 10, name: " إبراهيم", xp: 6420, level: 10, streak: 9, badges: 5, avatar: "ه", gradient: "from-sky-500 to-blue-500", change: 1 },
    { rank: 11, name: "سمير", xp: 2450, level: 7, streak: 12, badges: 3, avatar: "أ", gradient: "from-violet-500 to-pink-500", change: 4, isMe: true },
];

const filters = [
    { id: "all", label: "كل الأوقات" },
    { id: "month", label: "هذا الشهر" },
    { id: "week", label: "هذا الأسبوع" },
];

export default function Leaderboard() {
    const [filter, setFilter] = useState("all");
    const top3 = leaderboard.slice(0, 3);
    const rest = leaderboard.slice(3);

    return (
        <AppLayout>
            <div className="p-6 lg:p-10 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-black flex items-center gap-3 mb-2">
                        <Trophy className="w-8 h-8 text-amber-400" />
                        <span className="gradient-text">قائمة المتصدرين</span>
                    </h1>
                    <p className="text-muted-foreground">أفضل المتعلمين في منصة TeenCode AI — تنافس واربح!</p>
                </div>

                {/* Filters */}
                <div className="glass rounded-2xl p-1 inline-flex mb-8">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={cn(
                                "px-5 py-2 rounded-xl text-sm font-semibold transition-all",
                                filter === f.id ? "gradient-primary text-white" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Podium */}
                <div className="grid md:grid-cols-3 gap-4 mb-8 items-end">
                    {/* 2nd */}
                    <div className="md:order-1 relative glass-strong rounded-3xl p-6 text-center border border-slate-400/20 md:mt-8">
                        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-400/20 flex items-center justify-center text-slate-300 font-black text-sm">
                            2
                        </div>
                        <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${top3[1].gradient} flex items-center justify-center text-white text-2xl font-black mb-3`}>
                            {top3[1].avatar}
                        </div>
                        <Medal className="w-6 h-6 mx-auto text-slate-300 mb-2" />
                        <div className="font-bold">{top3[1].name}</div>
                        <div className="text-xs text-muted-foreground mb-3">المستوى {top3[1].level}</div>
                        <div className="flex items-center justify-center gap-1 text-amber-400 font-bold">
                            <Sparkles className="w-4 h-4" />
                            {top3[1].xp.toLocaleString()}
                        </div>
                    </div>

                    {/* 1st */}
                    <div className="md:order-2 relative glass-strong rounded-3xl p-6 text-center border border-amber-500/30 glow-primary animate-pulse-glow">
                        <Crown className="absolute -top-4 right-1/2 translate-x-1/2 w-10 h-10 text-amber-400 fill-amber-400" />
                        <div className="absolute top-4 left-4 w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-black text-sm">
                            1
                        </div>
                        <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${top3[0].gradient} flex items-center justify-center text-white text-3xl font-black mb-3 ring-4 ring-amber-400/30`}>
                            {top3[0].avatar}
                        </div>
                        <div className="font-bold text-lg">{top3[0].name}</div>
                        <div className="text-xs text-muted-foreground mb-3">المستوى {top3[0].level}</div>
                        <div className="flex items-center justify-center gap-1 text-amber-400 font-black text-lg">
                            <Sparkles className="w-5 h-5" />
                            {top3[0].xp.toLocaleString()}
                        </div>
                    </div>

                    {/* 3rd */}
                    <div className="md:order-3 relative glass-strong rounded-3xl p-6 text-center border border-orange-500/20 md:mt-12">
                        <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-black text-sm">
                            3
                        </div>
                        <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${top3[2].gradient} flex items-center justify-center text-white text-2xl font-black mb-3`}>
                            {top3[2].avatar}
                        </div>
                        <Medal className="w-6 h-6 mx-auto text-orange-400 mb-2" />
                        <div className="font-bold">{top3[2].name}</div>
                        <div className="text-xs text-muted-foreground mb-3">المستوى {top3[2].level}</div>
                        <div className="flex items-center justify-center gap-1 text-amber-400 font-bold">
                            <Sparkles className="w-4 h-4" />
                            {top3[2].xp.toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Rest of the leaderboard */}
                <div className="glass rounded-3xl overflow-hidden">
                    <div className="grid grid-cols-[40px_1fr_80px_60px_100px] md:grid-cols-[60px_1fr_80px_100px_80px_120px] gap-3 px-5 py-3 border-b border-white/5 text-[10px] uppercase text-muted-foreground font-semibold">
                        <div>#</div>
                        <div>الطالب</div>
                        <div className="hidden md:block text-center">المستوى</div>
                        <div className="text-center">🔥</div>
                        <div className="hidden md:block text-center">شارات</div>
                        <div className="text-left">XP</div>
                    </div>
                    {rest.map((u, i) => (
                        <div
                            key={u.rank}
                            className={cn(
                                "grid grid-cols-[40px_1fr_80px_60px_100px] md:grid-cols-[60px_1fr_80px_100px_80px_120px] gap-3 px-5 py-3 items-center transition-all border-b border-white/5 last:border-0",
                                u.isMe ? "bg-violet-500/10 border-violet-500/20" : "hover:bg-white/[0.03]"
                            )}
                        >
                            <div className="flex items-center gap-1 font-bold text-muted-foreground">
                                #{u.rank}
                                {u.change > 0 && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                                {u.change < 0 && <TrendingUp className="w-3 h-3 text-rose-400 rotate-180" />}
                            </div>
                            <div className="flex items-center gap-3 min-w-0">
                                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${u.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                                    {u.avatar}
                                </div>
                                <div className="min-w-0">
                                    <div className="font-semibold text-sm truncate">
                                        {u.name}
                                        {u.isMe && <span className="mr-2 text-[10px] px-2 py-0.5 rounded-full gradient-primary text-white">أنت</span>}
                                    </div>
                                    <div className="text-[10px] text-muted-foreground">المستوى {u.level}</div>
                                </div>
                            </div>
                            <div className="hidden md:flex justify-center">
                                <div className="text-xs glass rounded-full px-2 py-1">Lv {u.level}</div>
                            </div>
                            <div className="flex items-center justify-center gap-1 text-xs text-orange-400 font-semibold">
                                <Flame className="w-3.5 h-3.5" />
                                {u.streak}
                            </div>
                            <div className="hidden md:flex justify-center text-xs text-muted-foreground">
                                {u.badges} 🏆
                            </div>
                            <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                                <Sparkles className="w-3.5 h-3.5" />
                                {u.xp.toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}