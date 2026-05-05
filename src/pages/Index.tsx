import { Link } from "react-router-dom";
import { Code2, Sparkles, Zap, Trophy, Target, Inspect, Play, ArrowLeft, Star, Users, BookOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
    {
        icon: Code2,
        title: "Code Playground",
        desc: "محرر كود احترافي مع معاينة لحظية لنتائج HTML و CSS و JavaScript",
        gradient: "from-violet-500 to-purple-500",
    },
    {
        icon: Inspect,
        title: "Inspect Simulator",
        desc: "تعلّم فحص وتعديل المواقع مثل المحترفين باستخدام محاكي DevTools",
        gradient: "from-cyan-500 to-blue-500",
    },
    {
        icon: Target,
        title: "تحديات تفاعلية",
        desc: "حل تحديات برمجية ممتعة مثل 'صلّح الخطأ' و 'غير لون الزر'",
        gradient: "from-pink-500 to-rose-500",
    },
    {
        icon: Trophy,
        title: "نظام XP وشارات",
        desc: "اكسب نقاط خبرة، ارتقِ بالمستويات، واجمع شارات الإنجاز",
        gradient: "from-amber-500 to-orange-500",
    },
    {
        icon: Sparkles,
        title: "مساعد ذكي",
        desc: "مساعد AI يشرح لك المفاهيم البرمجية باللغة العربية البسيطة",
        gradient: "from-emerald-500 to-teal-500",
    },
    {
        icon: Zap,
        title: "نتائج فورية",
        desc: "شاهد تأثير كل سطر كود على الفور — تعلّم بالتجربة المباشرة",
        gradient: "from-fuchsia-500 to-pink-500",
    },
];

const stats = [
    { value: "50K+", label: "طالب نشط" },
    { value: "200+", label: "درس تفاعلي" },
    { value: "4.9", label: "تقييم المستخدمين" },
    { value: "95%", label: "نسبة الإكمال" },
];

const testimonials = [
    {
        name: " عدنان البوخريصي",
        age: "14 سنة",
        avatar: "ي",
        text: "كنت أظن أن البرمجة صعبة، لكن مع TeenCode بنيت أول موقع لي في أسبوع! الـ Inspect Simulator خيالي.",
        gradient: "from-violet-500 to-pink-500",
    },
    {
        name: " اميرة الكويتي",
        age: "16 سنة",
        avatar: "س",
        text: "أحب نظام XP والشارات. كل يوم أحاول أحل تحديات جديدة. تعلمت HTML و CSS و JavaScript من الصفر.",
        gradient: "from-cyan-500 to-violet-500",
    },
    {
        name: "يونس الشكشب",
        age: "13 سنة",
        avatar: "ع",
        text: "المنصة مصممة بشكل رائع. المساعد الذكي يجاوبني على أي سؤال، والمشاريع ممتعة جداً!",
        gradient: "from-amber-500 to-pink-500",
    },
];

const pricingTiers = [
    {
        name: "مجاني",
        price: "0",
        desc: "ابدأ رحلتك بدون أي تكلفة",
        features: ["أول 20 درس", "Playground أساسي", "شارات إنجاز", "متابعة التقدم"],
        cta: "ابدأ مجاناً",
        highlight: false,
    },
    {
        name: "احترافي",
        price: "49",
        desc: "الأكثر شعبية بين الطلاب",
        features: ["جميع الدروس (+200)", "تحديات حصرية", "Inspect Simulator كامل", "مساعد AI غير محدود", "مشاريع متقدمة", "شهادات إتمام"],
        cta: "اشترك الآن",
        highlight: true,
    },
    {
        name: "فريق",
        price: "99",
        desc: "للمدارس والمعلمين",
        features: ["كل مميزات الاحترافي", "حتى 30 طالب", "لوحة تحكم للمعلم", "تقارير شاملة", "دعم مخصص"],
        cta: "تواصل معنا",
        highlight: false,
    },
];

export default function Index() {
    return (
        <div className="min-h-screen overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 inset-x-0 z-50 glass-strong border-b border-white/5">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center animate-pulse-glow">
                            <Code2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="font-bold text-lg gradient-text">TeenCode AI</div>
                            <div className="text-[10px] text-muted-foreground">تعلم البرمجة بذكاء</div>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm">
                        <a href="#features" className="text-muted-foreground hover:text-white transition-colors">المميزات</a>
                        <a href="#how" className="text-muted-foreground hover:text-white transition-colors">كيف يعمل</a>
                        <a href="#pricing" className="text-muted-foreground hover:text-white transition-colors">الاشتراكات</a>
                        <a href="#reviews" className="text-muted-foreground hover:text-white transition-colors">الآراء</a>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link to="/auth">
                            <Button variant="ghost" size="sm" className="text-sm">تسجيل الدخول</Button>
                        </Link>
                        <Link to="/dashboard">
                            <Button size="sm" className="gradient-primary hover:opacity-90 text-sm">ابدأ الآن</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative pt-36 pb-24 px-4">
                <div className="absolute inset-0 grid-pattern opacity-30" />
                <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-500/20 blur-[120px] animate-float" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/20 blur-[120px] animate-float" style={{ animationDelay: "2s" }} />

                <div className="container mx-auto relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 animate-fade-in">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span className="text-xs">منصة البرمجة رقم ١ للمراهقين العرب</span>
                            <span className="text-xs text-muted-foreground">· 2026</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-balance animate-slide-up">
                            تعلّم البرمجة{" "}
                            <span className="gradient-text">بطريقة ممتعة</span>
                            <br />
                            <span className="gradient-text">وشاهد نتائجك</span> فوراً
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "100ms" }}>
                            منصة تفاعلية للمراهقين (12-17 سنة) لتعلّم HTML و CSS و JavaScript من خلال دروس مباشرة،
                            تحديات ممتعة، ومشاريع حقيقية — كل هذا مع مساعد ذكي يشرح لك باللغة العربية.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: "200ms" }}>
                            <Link to="/dashboard">
                                <Button size="lg" className="gradient-primary hover:opacity-90 text-base px-8 h-14 rounded-2xl glow-primary">
                                    ابدأ التعلّم مجاناً
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                </Button>
                            </Link>
                            <Link to="/playground">
                                <Button size="lg" variant="outline" className="!bg-transparent !hover:bg-white/5 text-base px-8 h-14 rounded-2xl border-white/10">
                                    <Play className="w-4 h-4 ml-2" />
                                    جرب Playground
                                </Button>
                            </Link>
                        </div>

                        {/* Hero preview card */}
                        <div className="relative max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: "300ms" }}>
                            <div className="absolute -inset-4 gradient-primary opacity-20 blur-3xl rounded-3xl" />
                            <div className="relative glass-strong rounded-3xl overflow-hidden border border-white/10">
                                {/* Browser chrome */}
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                    </div>
                                    <div className="flex-1 text-center text-xs text-muted-foreground font-mono">teencode.ai/playground</div>
                                </div>
                                <div className="grid md:grid-cols-2 min-h-[320px]">
                                    {/* Code side */}
                                    <div className="p-6 font-mono text-xs md:text-sm text-right border-l border-white/5 bg-[#0a0a12]">
                                        <div className="space-y-1" dir="ltr">
                                            <div><span className="text-violet-400">&lt;button</span> <span className="text-cyan-400">class</span>=<span className="text-amber-300">"btn"</span><span className="text-violet-400">&gt;</span></div>
                                            <div className="pr-4">اضغط هنا 🚀</div>
                                            <div><span className="text-violet-400">&lt;/button&gt;</span></div>
                                            <div className="mt-3"><span className="text-pink-400">.btn</span> {"{"}</div>
                                            <div className="pr-4"><span className="text-cyan-400">background</span>: <span className="text-amber-300">linear-gradient</span>(...);</div>
                                            <div className="pr-4"><span className="text-cyan-400">padding</span>: <span className="text-emerald-400">16px 32px</span>;</div>
                                            <div className="pr-4"><span className="text-cyan-400">border-radius</span>: <span className="text-emerald-400">16px</span>;</div>
                                            <div className="pr-4"><span className="text-cyan-400">color</span>: <span className="text-amber-300">white</span>;</div>
                                            <div>{"}"}</div>
                                        </div>
                                    </div>
                                    {/* Preview side */}
                                    <div className="p-6 flex items-center justify-center bg-gradient-to-br from-violet-500/5 to-cyan-500/5">
                                        <button className="gradient-primary text-white px-8 py-4 rounded-2xl font-semibold animate-pulse-glow">
                                            اضغط هنا 🚀
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 px-4 border-y border-white/5">
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="text-4xl md:text-5xl font-black gradient-text mb-2">{s.value}</div>
                                <div className="text-sm text-muted-foreground">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-24 px-4">
                <div className="container mx-auto">
                    <div className="max-w-2xl mx-auto text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
                            <Zap className="w-4 h-4 text-violet-400" />
                            <span className="text-xs">المميزات</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-4 text-balance">
                            كل ما تحتاجه <span className="gradient-text">لتصبح مطوراً</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            أدوات احترافية مصممة خصيصاً للمراهقين — تجمع بين المتعة والتعلّم الفعّال
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f) => (
                            <div key={f.title} className="group relative glass rounded-3xl p-6 hover:bg-white/[0.04] transition-all hover:-translate-y-1">
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <f.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how" className="py-24 px-4 relative">
                <div className="container mx-auto">
                    <div className="max-w-2xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            كيف يعمل <span className="gradient-text">TeenCode AI؟</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">3 خطوات بسيطة لتبدأ رحلتك البرمجية</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            { n: "01", title: "سجّل حسابك", desc: "أنشئ حسابك المجاني خلال ثوانٍ وابدأ رحلتك فوراً", icon: Users },
                            { n: "02", title: "اختر مسارك", desc: "اختر المسار المناسب: HTML، CSS، JavaScript، أو مشاريع كاملة", icon: BookOpen },
                            { n: "03", title: "اكتب وشاهد", desc: "اكتب الكود وشاهد النتيجة مباشرة — بدون تثبيت أي شيء", icon: Code2 },
                        ].map((step, i) => (
                            <div key={step.n} className="relative">
                                <div className="glass rounded-3xl p-8 h-full relative overflow-hidden">
                                    <div className="absolute top-4 left-4 text-6xl font-black text-white/[0.04]">{step.n}</div>
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6">
                                            <step.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                                    </div>
                                </div>
                                {i < 2 && (
                                    <div className="hidden md:block absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full gradient-primary z-10" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="reviews" className="py-24 px-4">
                <div className="container mx-auto">
                    <div className="max-w-2xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            طلابنا <span className="gradient-text">يحبوننا</span> ❤️
                        </h2>
                        <p className="text-muted-foreground text-lg">آراء حقيقية من طلاب غيّروا حياتهم بالبرمجة</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t) => (
                            <div key={t.name} className="glass rounded-3xl p-6 hover:bg-white/[0.04] transition-all">
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="text-sm leading-relaxed mb-6 text-muted-foreground">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold`}>
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{t.name}</div>
                                        <div className="text-xs text-muted-foreground">{t.age}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-24 px-4">
                <div className="container mx-auto">
                    <div className="max-w-2xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">
                            خطط بسيطة <span className="gradient-text">وشفافة</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">ابدأ مجاناً، ارتقِ حين تحتاج</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {pricingTiers.map((tier) => (
                            <div
                                key={tier.name}
                                className={`relative rounded-3xl p-8 ${tier.highlight
                                    ? "gradient-border glow-primary bg-gradient-to-br from-violet-500/10 to-cyan-500/5"
                                    : "glass"
                                    }`}
                            >
                                {tier.highlight && (
                                    <div className="absolute -top-3 right-1/2 translate-x-1/2 gradient-primary text-white text-xs px-4 py-1 rounded-full font-semibold">
                                        الأكثر شعبية ⭐
                                    </div>
                                )}
                                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                <p className="text-xs text-muted-foreground mb-4">{tier.desc}</p>
                                <div className="mb-6">
                                    <span className="text-5xl font-black">{tier.price}</span>
                                    <span className="text-muted-foreground text-sm"> ر.س / شهر</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm">
                                            <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3 h-3 text-violet-400" />
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/auth">
                                    <Button
                                        className={`w-full h-12 rounded-xl ${tier.highlight ? "gradient-primary hover:opacity-90" : "bg-white/5 hover:bg-white/10 border border-white/10"
                                            }`}
                                    >
                                        {tier.cta}
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-4">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden glass-strong p-12 md:p-16 text-center">
                        <div className="absolute inset-0 animated-bg opacity-10" />
                        <div className="relative">
                            <h2 className="text-4xl md:text-6xl font-black mb-6 text-balance">
                                جاهز لتصبح <span className="gradient-text">مطوراً حقيقياً؟</span>
                            </h2>
                            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                                انضم لآلاف الطلاب الذين يبنون مواقعهم وتطبيقاتهم الأولى. ابدأ مجاناً اليوم — لا تحتاج بطاقة ائتمان.
                            </p>
                            <Link to="/dashboard">
                                <Button size="lg" className="gradient-primary hover:opacity-90 text-base px-10 h-14 rounded-2xl glow-primary">
                                    ابدأ رحلتك الآن
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 border-t border-white/5">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                                <Code2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <div className="font-bold gradient-text">TeenCode AI</div>
                                <div className="text-[10px] text-muted-foreground">© 2026 جميع الحقوق محفوظة</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <a href="#" className="hover:text-white transition-colors">الخصوصية</a>
                            <a href="#" className="hover:text-white transition-colors">الشروط</a>
                            <a href="https://wa.me/+212632924153" className="hover:text-white transition-colors">اتصل بنا</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}