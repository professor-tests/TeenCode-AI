import { Link, useLocation } from "react-router-dom";
import { Code2, LayoutDashboard, BookOpen, Trophy, Target, Inspect, Sparkles, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
    children: React.ReactNode;
}

const navItems = [
    { to: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
    { to: "/lessons", label: "الدروس", icon: BookOpen },
    { to: "/playground", label: "Playground", icon: Code2 },
    { to: "/inspect", label: "Inspect Simulator", icon: Inspect },
    { to: "/challenges", label: "التحديات", icon: Target },
    { to: "/leaderboard", label: "المتصدرين", icon: Trophy },
];

export default function AppLayout({ children }: AppLayoutProps) {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed lg:sticky top-0 right-0 h-screen w-72 z-40 transition-transform duration-300",
                    "glass-strong border-l border-white/5",
                    mobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
                )}
            >
                <div className="flex flex-col h-full p-6">
                    <Link to="/" className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center animate-pulse-glow">
                            <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="font-bold text-lg gradient-text">TeenCode AI</div>
                            <div className="text-[10px] text-muted-foreground">تعلم البرمجة بذكاء</div>
                        </div>
                    </Link>

                    {/* User card */}
                    <div className="glass rounded-2xl p-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                                أ
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm truncate"> سمير</div>
                                <div className="flex items-center gap-1 text-xs text-amber-400">
                                    <Sparkles className="w-3 h-3" />
                                    <span>2,450 XP</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                                <span>المستوى 7</span>
                                <span>المستوى 8</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full w-[68%] gradient-primary rounded-full shimmer" />
                            </div>
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 space-y-1">
                        {navItems.map((item) => {
                            const active = location.pathname === item.to;
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all",
                                        active
                                            ? "bg-gradient-to-l from-violet-500/20 to-cyan-500/10 text-white border border-violet-500/20"
                                            : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                    {active && <div className="mr-auto w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />}
                                </Link>
                            );
                        })}
                    </nav>

                    <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted-foreground hover:bg-white/5 hover:text-white transition-all">
                        <LogOut className="w-5 h-5" />
                        <span>تسجيل الخروج</span>
                    </Link>
                </div>
            </aside>

            {/* Mobile toggle */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl glass-strong flex items-center justify-center"
            >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 z-30"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Main content */}
            <main className="flex-1 min-w-0">
                {children}
            </main>
        </div>
    );
}