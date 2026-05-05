import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const suggestedQuestions = [
    "ما الفرق بين HTML و CSS؟",
    "اشرح لي الـ Flexbox",
    "كيف أضيف زر في HTML؟",
    "ما هو الـ JavaScript؟",
    "من هو مطور الموقع Professor؟",
];

const aiResponses: Record<string, string> = {
    "html": "HTML هي لغة ترميز تستخدم لبناء هيكل صفحات الويب. تخيلها كالعظام في الجسم — تحدد شكل الصفحة: العناوين، الفقرات، الصور، والأزرار. مثال بسيط:\n\n<h1>عنوان</h1>\n<p>فقرة نصية</p>",
    "css": "CSS هي لغة التصميم التي تجعل صفحاتك جميلة! تتحكم في الألوان، الخطوط، المسافات، والتحريك. مثال:\n\nbutton {\n  background: blue;\n  color: white;\n}",
    "flexbox": "Flexbox نظام محاذاة قوي في CSS يساعدك على ترتيب العناصر بسهولة في صف أو عمود. استخدم display: flex على العنصر الأب، ثم justify-content و align-items للتحكم في التوزيع.",
    "javascript": "JavaScript هي لغة البرمجة التي تُحيي موقعك! تجعل الأزرار تعمل، النماذج تتحقق من البيانات، والصفحة تتفاعل مع المستخدم. مثال:\n\nbutton.addEventListener('click', () => {\n  alert('مرحباً!');\n});",
    "button": "لإضافة زر في HTML، استخدم:\n\n<button>اضغط هنا</button>\n\nويمكنك تنسيقه بـ CSS ليبدو جميلاً، ثم إضافة حدث click بالـ JavaScript.",
    "default": "سؤال رائع! أنا هنا لمساعدتك في رحلة تعلم البرمجة. يمكنك سؤالي عن أي مفهوم مثل HTML، CSS، JavaScript، أو كيفية بناء مشاريع صغيرة. جرّب طرح سؤال محدد وسأشرحه لك بطريقة بسيطة! ✨",
    "professor":"الموقع طور بواسطة سمير ,مطور شغوف يؤمن بأن كل مراهق يستحق ان يتعلم البرمجة ويصنع مستقبله بيده",
    "samir":"سير تا نعيطو عليك شباعي تعرف عليا ههههه",
};

function getAIResponse(question: string): string {
    const lower = question.toLowerCase();
    for (const [key, response] of Object.entries(aiResponses)) {
        if (key !== "default" && lower.includes(key)) return response;
    }
    return aiResponses.default;
}

export default function AIAssistant() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "مرحباً! أنا مساعدك الذكي 🤖 اسألني أي شيء عن البرمجة وسأشرحه لك بطريقة بسيطة." },
    ]);
    const [typing, setTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, typing]);

    const send = (text: string) => {
        const q = text.trim();
        if (!q) return;
        setMessages((m) => [...m, { role: "user", content: q }]);
        setInput("");
        setTyping(true);
        setTimeout(() => {
            setMessages((m) => [...m, { role: "assistant", content: getAIResponse(q) }]);
            setTyping(false);
        }, 900);
    };

    return (
        <>
            {/* Toggle button */}
            <button
                onClick={() => setOpen(!open)}
                className={cn(
                    "fixed bottom-6 left-6 z-50 w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-2xl animate-pulse-glow transition-transform hover:scale-110",
                    open && "scale-95"
                )}
            >
                {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
                {!open && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 border-2 border-background animate-pulse" />
                )}
            </button>

            {/* Chat window */}
            <div
                className={cn(
                    "fixed bottom-24 left-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[560px] max-h-[calc(100vh-8rem)] glass-strong rounded-3xl overflow-hidden flex flex-col transition-all duration-300 origin-bottom-left",
                    open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"
                )}
            >
                {/* Header */}
                <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-gradient-to-l from-violet-500/10 to-cyan-500/10">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <div className="font-bold text-sm flex items-center gap-2">
                            المساعد الذكي
                            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                متصل
                            </span>
                        </div>
                        <div className="text-[11px] text-muted-foreground">مدعوم بالذكاء الاصطناعي</div>
                    </div>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex gap-2 animate-fade-in",
                                msg.role === "user" ? "flex-row-reverse" : ""
                            )}
                        >
                            {msg.role === "assistant" && (
                                <div className="w-7 h-7 rounded-lg gradient-primary flex-shrink-0 flex items-center justify-center">
                                    <Sparkles className="w-4 h-4 text-white" />
                                </div>
                            )}
                            <div
                                className={cn(
                                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap",
                                    msg.role === "user"
                                        ? "gradient-primary text-white"
                                        : "bg-white/5 border border-white/10"
                                )}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {typing && (
                        <div className="flex gap-2 animate-fade-in">
                            <div className="w-7 h-7 rounded-lg gradient-primary flex-shrink-0 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex gap-1">
                                <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Suggested */}
                {messages.length <= 2 && (
                    <div className="px-4 pb-2 flex flex-wrap gap-2">
                        {suggestedQuestions.map((q) => (
                            <button
                                key={q}
                                onClick={() => send(q)}
                                className="text-[11px] px-3 py-1.5 rounded-full glass hover:bg-violet-500/10 hover:border-violet-500/30 transition-colors"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        send(input);
                    }}
                    className="p-3 border-t border-white/5 flex gap-2"
                >
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="اكتب سؤالك..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-violet-500/50 transition-colors"
                    />
                    <Button type="submit" size="icon" className="gradient-primary rounded-xl hover:opacity-90">
                        <Send className="w-4 h-4 rotate-180" />
                    </Button>
                </form>
            </div>
        </>
    );
}
