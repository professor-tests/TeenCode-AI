import { useState } from "react";
import { Inspect, ChevronRight, ChevronDown, Layers, Palette, CheckCircle2 } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Element {
    id: string;
    tag: string;
    text?: string;
    styles: Record<string, string>;
    children?: Element[];
}

const initialTree: Element = {
    id: "body",
    tag: "body",
    styles: { background: "#f5f5f7", padding: "40px", fontFamily: "Cairo" },
    children: [
        {
            id: "header",
            tag: "header",
            styles: { background: "#8B5CF6", padding: "20px", "border-radius": "16px", color: "#ffffff" },
            children: [
                { id: "title", tag: "h1", text: "متجر الألعاب الإلكتروني", styles: { "font-size": "28px", margin: "0" } },
            ],
        },
        {
            id: "hero",
            tag: "section",
            styles: { background: "#ffffff", padding: "32px", "border-radius": "16px", "margin-top": "20px", "text-align": "center" },
            children: [
                { id: "heading", tag: "h2", text: "أفضل الألعاب بأسعار مميزة", styles: { color: "#1f2937", "font-size": "24px", margin: "0 0 12px 0" } },
                { id: "desc", tag: "p", text: "اكتشف مجموعتنا الحصرية من الألعاب", styles: { color: "#6b7280", margin: "0 0 20px 0" } },
                { id: "cta", tag: "button", text: "تسوّق الآن", styles: { background: "#06B6D4", color: "#ffffff", padding: "12px 28px", "border-radius": "12px", border: "none", "font-size": "16px", cursor: "pointer" } },
            ],
        },
    ],
};

function findAndUpdate(tree: Element, id: string, updater: (el: Element) => Element): Element {
    if (tree.id === id) return updater(tree);
    return {
        ...tree,
        children: tree.children?.map((c) => findAndUpdate(c, id, updater)),
    };
}

function findElement(tree: Element, id: string): Element | null {
    if (tree.id === id) return tree;
    for (const c of tree.children ?? []) {
        const f = findElement(c, id);
        if (f) return f;
    }
    return null;
}

function renderElement(el: Element, selectedId: string | null, onSelect: (id: string) => void): JSX.Element {
    const styleObj = Object.fromEntries(
        Object.entries(el.styles).map(([k, v]) => [k.replace(/-([a-z])/g, (_, c) => c.toUpperCase()), v])
    );
    const isSelected = selectedId === el.id;
    const wrapperStyle = {
        ...styleObj,
        outline: isSelected ? "2px dashed #06B6D4" : "none",
        outlineOffset: "2px",
        cursor: "pointer",
    };

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelect(el.id);
    };

    if (el.children && el.children.length > 0) {
        const Tag = el.tag as keyof JSX.IntrinsicElements;
        return (
            <Tag key={el.id} style={wrapperStyle} onClick={handleClick}>
                {el.children.map((c) => renderElement(c, selectedId, onSelect))}
            </Tag>
        );
    }

    const Tag = el.tag as keyof JSX.IntrinsicElements;
    return (
        <Tag key={el.id} style={wrapperStyle} onClick={handleClick}>
            {el.text}
        </Tag>
    );
}

function DOMNode({ el, selectedId, onSelect, depth = 0 }: { el: Element; selectedId: string | null; onSelect: (id: string) => void; depth?: number }) {
    const [open, setOpen] = useState(true);
    const hasChildren = el.children && el.children.length > 0;
    const isSelected = selectedId === el.id;

    return (
        <div>
            <div
                onClick={() => onSelect(el.id)}
                className={cn(
                    "flex items-center gap-1 py-1 px-1.5 rounded cursor-pointer text-[11px] font-mono",
                    isSelected ? "bg-cyan-500/20 text-cyan-300" : "hover:bg-white/5 text-muted-foreground"
                )}
                style={{ paddingRight: `${depth * 12 + 6}px` }}
            >
                {hasChildren ? (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(!open);
                        }}
                        className="flex-shrink-0"
                    >
                        {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                    </button>
                ) : (
                    <span className="w-3" />
                )}
                <span className="text-violet-400">&lt;</span>
                <span className="text-pink-400">{el.tag}</span>
                {el.text && <span className="text-amber-300 truncate max-w-[100px]">"{el.text.slice(0, 15)}..."</span>}
                <span className="text-violet-400">&gt;</span>
            </div>
            {hasChildren && open && (
                <div>
                    {el.children!.map((c) => (
                        <DOMNode key={c.id} el={c} selectedId={selectedId} onSelect={onSelect} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function InspectSimulator() {
    const [tree, setTree] = useState<Element>(initialTree);
    const [selectedId, setSelectedId] = useState<string | null>("heading");
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);

    const selected = selectedId ? findElement(tree, selectedId) : null;

    const updateStyle = (key: string, value: string) => {
        if (!selectedId) return;
        setTree((t) =>
            findAndUpdate(t, selectedId, (el) => ({
                ...el,
                styles: { ...el.styles, [key]: value },
            }))
        );
    };

    const updateText = (value: string) => {
        if (!selectedId) return;
        setTree((t) => findAndUpdate(t, selectedId, (el) => ({ ...el, text: value })));
    };

    // Tasks
    const tasks = [
        { id: "color", label: "غيّر لون الزر إلى أخضر", check: () => findElement(tree, "cta")?.styles.background?.toLowerCase().includes("10b981") || findElement(tree, "cta")?.styles.background?.toLowerCase().includes("green") },
        { id: "text", label: "غيّر نص العنوان الرئيسي", check: () => findElement(tree, "heading")?.text !== "أفضل الألعاب بأسعار مميزة" },
        { id: "bg", label: "غيّر خلفية الـ header إلى وردي", check: () => findElement(tree, "header")?.styles.background?.toLowerCase().includes("ec4899") || findElement(tree, "header")?.styles.background?.toLowerCase().includes("pink") },
    ];

    const checkedTasks = tasks.map((t) => ({ ...t, done: t.check() }));
    const doneCount = checkedTasks.filter((t) => t.done).length;

    return (
        <AppLayout>
            <div className="p-4 lg:p-6 h-screen flex flex-col">
                <div className="mb-4">
                    <h1 className="text-2xl md:text-3xl font-black flex items-center gap-3">
                        <Inspect className="w-7 h-7 text-cyan-400" />
                        <span className="gradient-text">Inspect Simulator</span>
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        اضغط على أي عنصر في الموقع لتعديل خصائصه — مثل Chrome DevTools تماماً!
                    </p>
                </div>

                {/* Tasks banner */}
                <div className="glass rounded-2xl p-4 mb-4 flex items-center gap-4 overflow-x-auto">
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                            <span className="text-sm font-black">{doneCount}/3</span>
                        </div>
                        <div className="text-xs">
                            <div className="font-semibold">مهامك</div>
                            <div className="text-muted-foreground text-[10px]">أكملها لتكسب 150 XP</div>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-1">
                        {checkedTasks.map((t) => (
                            <div
                                key={t.id}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-xl text-xs whitespace-nowrap border",
                                    t.done
                                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                                        : "glass border-white/10"
                                )}
                            >
                                {t.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border border-white/30" />}
                                {t.label}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Browser simulator */}
                <div className="flex-1 grid lg:grid-cols-[1fr_320px] gap-4 min-h-0">
                    {/* Fake browser */}
                    <div className="glass-strong rounded-2xl overflow-hidden flex flex-col">
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                            </div>
                            <div className="flex-1 glass rounded-lg px-3 py-1 text-xs font-mono text-muted-foreground text-center">
                                🔒 https://demo-shop.teencode.ai
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto bg-white text-black" dir="rtl">
                            {renderElement(tree, selectedId, setSelectedId)}
                        </div>
                    </div>

                    {/* DevTools panel */}
                    <div className="glass-strong rounded-2xl overflow-hidden flex flex-col">
                        <div className="flex border-b border-white/5 bg-white/[0.02]">
                            <div className="flex-1 px-4 py-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 border-violet-500">
                                <Layers className="w-3.5 h-3.5" />
                                Elements
                            </div>
                            <div className="flex-1 px-4 py-2.5 text-xs text-muted-foreground flex items-center gap-2">
                                <Palette className="w-3.5 h-3.5" />
                                Styles
                            </div>
                        </div>

                        {/* DOM tree */}
                        <div className="border-b border-white/5 max-h-48 overflow-auto scrollbar-thin p-2">
                            <DOMNode el={tree} selectedId={selectedId} onSelect={setSelectedId} />
                        </div>

                        {/* Style editor */}
                        <div className="flex-1 overflow-auto scrollbar-thin p-4">
                            {selected ? (
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-[10px] uppercase text-muted-foreground mb-1 font-mono">Selected</div>
                                        <div className="font-mono text-sm text-cyan-300">&lt;{selected.tag}&gt;</div>
                                    </div>

                                    {selected.text !== undefined && (
                                        <div>
                                            <label className="text-[10px] uppercase text-muted-foreground mb-1 block font-mono">Text</label>
                                            <input
                                                value={selected.text}
                                                onChange={(e) => updateText(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-violet-500/50"
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <div className="text-[10px] uppercase text-muted-foreground font-mono">Styles</div>
                                        {Object.entries(selected.styles).map(([k, v]) => {
                                            const isColor = k.includes("background") || k.includes("color") || k === "color";
                                            return (
                                                <div key={k} className="flex items-center gap-2">
                                                    <span className="text-[11px] font-mono text-cyan-400 flex-shrink-0 w-28 truncate">{k}:</span>
                                                    {isColor ? (
                                                        <div className="flex items-center gap-2 flex-1">
                                                            <input
                                                                type="color"
                                                                value={/^#[0-9a-f]{6}$/i.test(v) ? v : "#000000"}
                                                                onChange={(e) => updateStyle(k, e.target.value)}
                                                                className="w-7 h-7 rounded cursor-pointer bg-transparent border border-white/10"
                                                            />
                                                            <input
                                                                value={v}
                                                                onChange={(e) => updateStyle(k, e.target.value)}
                                                                className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-[11px] font-mono outline-none focus:border-violet-500/50"
                                                                dir="ltr"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <input
                                                            value={v}
                                                            onChange={(e) => updateStyle(k, e.target.value)}
                                                            className="flex-1 bg-white/5 border border-white/10 rounded px-2 py-1 text-[11px] font-mono outline-none focus:border-violet-500/50"
                                                            dir="ltr"
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="pt-3 border-t border-white/5">
                                        <div className="text-[10px] uppercase text-muted-foreground mb-2 font-mono">Quick Colors</div>
                                        <div className="grid grid-cols-6 gap-1.5">
                                            {["#8B5CF6", "#EC4899", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"].map((c) => (
                                                <button
                                                    key={c}
                                                    onClick={() => {
                                                        const key = selected.styles.background !== undefined ? "background" : "color";
                                                        updateStyle(key, c);
                                                    }}
                                                    className="aspect-square rounded-md border border-white/10 hover:scale-110 transition-transform"
                                                    style={{ background: c }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-xs text-muted-foreground text-center py-8">
                                    اضغط على أي عنصر في الصفحة
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}