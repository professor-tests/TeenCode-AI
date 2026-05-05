import { Link } from "react-router-dom";
import { Code2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-30" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-500/20 blur-[120px] animate-float" />
            <div className="relative text-center">
                <div className="text-[120px] md:text-[180px] font-black gradient-text leading-none mb-4">404</div>
                <h1 className="text-3xl md:text-4xl font-black mb-4">الصفحة غير موجودة</h1>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    يبدو أنك وصلت إلى مكان غير موجود في الكود. لنعيدك إلى صفحة آمنة!
                </p>
                <Link to="/">
                    <Button className="gradient-primary hover:opacity-90 h-12 px-8 rounded-xl">
                        <ArrowLeft className="w-4 h-4 ml-2" />
                        العودة للرئيسية
                    </Button>
                </Link>
            </div>
        </div>
    );
}