import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code2, Mail, Lock, User, ArrowLeft, Github, Sparkles, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Auth() {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const e: Record<string, string> = {};
        if (mode === "signup" && form.name.trim().length < 2) e.name = "الاسم يجب أن يكون حرفين على الأقل";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "بريد إلكتروني غير صالح";
        if (form.password.length < 6) e.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
        }, 900);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - decoration */}
            <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 grid-pattern opacity-40" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-500/30 blur-[120px] animate-float" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/30 blur-[120px] animate-float" style={{ animationDelay: "2s" }} />

                <div className="relative max-w-md">
                    <Link to="/" className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center animate-pulse-glow">
                            <Code2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="font-bold text-xl gradient-text">TeenCode AI</div>
                            <div className="text-xs text-muted-foreground">تعلم البرمجة بذكاء</div>
                        </div>
                    </Link>

                    <h1 className="text-4xl font-black mb-4 leading-tight">
                        انضم لأكثر من <span className="gradient-text">50 ألف طالب</span> يتعلمون البرمجة كل يوم
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        ابدأ رحلتك في عالم البرمجة بأدوات احترافية ومساعد ذكي مخصص لك
                    </p>

                    {/* Feature cards */}
                    <div className="space-y-3">
                        {[
                            { icon: Sparkles, title: "مساعد AI شخصي", desc: "يشرح لك أي مفهوم بالعربية" },
                            { icon: Code2, title: "Playground احترافي", desc: "اكتب الكود وشاهد النتيجة فوراً" },
                        ].map((f) => (
                            <div key={f.title} className="glass rounded-2xl p-4 flex items-center gap-4">
                                <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                                    <f.icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="font-semibold text-sm">{f.title}</div>
                                    <div className="text-xs text-muted-foreground">{f.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right side - form */}
            <div className="flex-1 flex items-center justify-center p-6 relative">
                <Link to="/" className="absolute top-6 right-6 text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    العودة للصفحة الرئيسية
                </Link>

                <div className="w-full max-w-md">
                    <div className="lg:hidden flex justify-center mb-8">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                                <Code2 className="w-5 h-5 text-white" />
                            </div>
                            <div className="font-bold text-lg gradient-text">TeenCode AI</div>
                        </Link>
                    </div>

                    {/* Tab toggle */}
                    <div className="glass rounded-2xl p-1 flex mb-8">
                        <button
                            onClick={() => setMode("login")}
                            className={cn(
                                "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all",
                                mode === "login" ? "gradient-primary text-white" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            تسجيل الدخول
                        </button>
                        <button
                            onClick={() => setMode("signup")}
                            className={cn(
                                "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all",
                                mode === "signup" ? "gradient-primary text-white" : "text-muted-foreground hover:text-white"
                            )}
                        >
                            حساب جديد
                        </button>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-3xl font-black mb-2">
                            {mode === "login" ? "مرحباً بعودتك! 👋" : "ابدأ رحلتك الآن 🚀"}
                        </h2>
                        <p className="text-muted-foreground text-sm">
                            {mode === "login" ? "سجّل دخولك للمتابعة من حيث توقفت" : "أنشئ حسابك المجاني في أقل من دقيقة"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === "signup" && (
                            <div>
                                <label className="text-xs text-muted-foreground mb-2 block font-semibold">الاسم الكامل</label>
                                <div className="relative">
                                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="منير المحمدي"
                                        className={cn(
                                            "w-full bg-white/5 border rounded-xl pr-11 pl-4 py-3.5 text-sm outline-none transition-colors",
                                            errors.name ? "border-red-500/50" : "border-white/10 focus:border-violet-500/50"
                                        )}
                                    />
                                </div>
                                {errors.name && <div className="text-xs text-red-400 mt-1">{errors.name}</div>}
                            </div>
                        )}

                        <div>
                            <label className="text-xs text-muted-foreground mb-2 block font-semibold">البريد الإلكتروني</label>
                            <div className="relative">
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    placeholder="you@example.com"
                                    dir="ltr"
                                    className={cn(
                                        "w-full bg-white/5 border rounded-xl pr-11 pl-4 py-3.5 text-sm outline-none transition-colors text-left",
                                        errors.email ? "border-red-500/50" : "border-white/10 focus:border-violet-500/50"
                                    )}
                                />
                            </div>
                            {errors.email && <div className="text-xs text-red-400 mt-1">{errors.email}</div>}
                        </div>

                        <div>
                            <label className="text-xs text-muted-foreground mb-2 block font-semibold">كلمة المرور</label>
                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    placeholder="••••••••"
                                    className={cn(
                                        "w-full bg-white/5 border rounded-xl pr-11 pl-11 py-3.5 text-sm outline-none transition-colors",
                                        errors.password ? "border-red-500/50" : "border-white/10 focus:border-violet-500/50"
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && <div className="text-xs text-red-400 mt-1">{errors.password}</div>}
                        </div>

                        {mode === "login" && (
                            <div className="flex justify-between text-xs">
                                <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                                    <input type="checkbox" className="rounded" />
                                    تذكرني
                                </label>
                                <a href="#" className="text-violet-400 hover:text-violet-300">نسيت كلمة المرور؟</a>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full gradient-primary hover:opacity-90 h-12 rounded-xl font-semibold text-base glow-primary"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                    جاري المعالجة...
                                </span>
                            ) : mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
                        </Button>
                    </form>

                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-xs text-muted-foreground">أو</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="!bg-transparent !hover:bg-white/5 border-white/10 h-11 rounded-xl">
                            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /></svg>
                            Google
                        </Button>
                        <Button variant="outline" className="!bg-transparent !hover:bg-white/5 border-white/10 h-11 rounded-xl">
                            <Github className="w-4 h-4 ml-2" />
                            GitHub
                        </Button>
                    </div>

                    <p className="text-center text-xs text-muted-foreground mt-6">
                        {mode === "login" ? "ليس لديك حساب؟ " : "لديك حساب بالفعل؟ "}
                        <button
                            onClick={() => setMode(mode === "login" ? "signup" : "login")}
                            className="text-violet-400 hover:text-violet-300 font-semibold"
                        >
                            {mode === "login" ? "أنشئ حساباً" : "سجّل الدخول"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}