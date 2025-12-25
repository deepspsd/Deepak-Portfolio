import { Laptop } from "lucide-react";

const MobileBlocker = () => {
    return (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background px-6 text-center overflow-hidden">
            {/* Noise Texture - Matching the main site */}
            <div className="noise-overlay !absolute !z-0 opacity-[0.05] mix-blend-overlay pointer-events-none" />

            {/* Background elements to make it look premium even on the blocker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6 max-w-md">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(195,228,29,0.2)]">
                    <Laptop className="h-8 w-8 text-accent" />
                </div>

                <h1 className="font-syne text-3xl font-bold text-white tracking-tight">
                    Desktop Experience Required
                </h1>

                <p className="font-space text-neutral-400 leading-relaxed">
                    This portfolio features immersive 3D interactions and heavy animations designed specifically for larger screens.
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 w-full mt-4 backdrop-blur-sm">
                    <p className="text-sm font-syne uppercase tracking-wider text-accent font-bold">
                        Please open on a Laptop or Desktop
                    </p>
                    <p className="text-xs font-space text-neutral-500 mt-2">
                        Optimized for 1024px+
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MobileBlocker;
