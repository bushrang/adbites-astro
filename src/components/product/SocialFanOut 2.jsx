import { motion } from "framer-motion";

export default function SocialFanOut({ data }) {
    if (!data) return null;

    const { headline, subline, centerPhoneImage, fanCards = [] } = data;

    // Split cards into left and right automatically
    const half = Math.ceil(fanCards.length / 2);
    const leftCards = fanCards.slice(0, half);
    const rightCards = fanCards.slice(half);

    return (
        <section className="py-32 bg-transparent overflow-hidden relative flex flex-col justify-center">
            
            {/* Header */}
            {(headline || subline) && (
                <div className="max-w-3xl mx-auto px-4 text-center relative z-20 mb-20">
                    {headline && <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-2xl" dangerouslySetInnerHTML={{ __html: headline.replace(/\n/g, "<br/>") }} />}
                    {subline && <p className="text-xl text-slate-300 leading-relaxed font-light">{subline}</p>}
                </div>
            )}

            {/* Animation Container */}
            <div className="relative max-w-7xl mx-auto w-full flex justify-center items-center h-[500px] md:h-[600px] z-10 px-4 mt-8">
                
                {/* Left Cards */}
                {leftCards.map((imageUrl, i) => {
                    // Cards fan out further to the left the higher the index
                    const angle = -8 - (i * 8); // Reduced base and increment
                    const xOffset = -120 - (i * 140);
                    const yOffset = i * -15;
                    
                    return (
                        <motion.div
                            key={`left-${i}`}
                            initial={{ x: 0, y: 0, rotate: 0, opacity: 0, scale: 0.8 }}
                            whileInView={{ x: xOffset, y: yOffset, rotate: angle, opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 45, damping: 14, delay: i * 0.1 }}
                            className="absolute z-0 w-[240px] md:w-[280px] h-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-4 flex flex-col hidden sm:flex pb-6"
                            style={{ transformOrigin: "bottom center" }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-white/20 shrink-0" />
                                <div className="flex-1 h-3 bg-white/10 rounded-full" />
                            </div>
                            
                            {/* 1:1 Aspect Square for uploaded image */}
                            <div className="w-full aspect-square bg-black/40 rounded-xl mb-5 overflow-hidden relative shadow-inner border border-white/5">
                                {imageUrl && <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover object-center opacity-90" />}
                            </div>
                            
                            <div className="space-y-2 mt-auto">
                                <div className="w-3/4 h-2 bg-white/20 rounded-full" />
                                <div className="w-1/2 h-2 bg-white/20 rounded-full" />
                            </div>
                        </motion.div>
                    );
                })}

                {/* Right Cards */}
                {rightCards.map((imageUrl, i) => {
                    const angle = 8 + (i * 8); // Reduced rotation
                    const xOffset = 120 + (i * 140);
                    const yOffset = i * -15;
                    
                    return (
                        <motion.div
                            key={`right-${i}`}
                            initial={{ x: 0, y: 0, rotate: 0, opacity: 0, scale: 0.8 }}
                            whileInView={{ x: xOffset, y: yOffset, rotate: angle, opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 45, damping: 14, delay: i * 0.1 }}
                            className="absolute z-0 w-[240px] md:w-[280px] h-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-4 flex flex-col hidden sm:flex pb-6"
                            style={{ transformOrigin: "bottom center" }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-white/20 shrink-0" />
                                <div className="flex-1 h-3 bg-white/10 rounded-full" />
                            </div>
                            
                            {/* 1:1 Aspect Square for uploaded image */}
                            <div className="w-full aspect-square bg-black/40 rounded-xl mb-5 overflow-hidden relative shadow-inner border border-white/5">
                                {imageUrl && <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover object-center opacity-90" />}
                            </div>
                            
                            <div className="space-y-2 mt-auto">
                                <div className="w-3/4 h-2 bg-white/20 rounded-full" />
                                <div className="w-1/2 h-2 bg-white/20 rounded-full" />
                            </div>
                        </motion.div>
                    );
                })}

                {/* Center Phone */}
                <motion.div 
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 50, damping: 18, delay: 0.3 }}
                    className="relative z-10 w-[280px] md:w-[320px] aspect-[9/16] bg-black rounded-[45px] md:rounded-[55px] border-[6px] md:border-[8px] border-zinc-900 shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col justify-start items-center overflow-hidden ring-1 ring-white/20"
                >
                    {/* Dynamic Island */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 md:w-28 h-6 md:h-7 bg-black rounded-full z-20 border border-white/5" />
                    
                    {/* Screen content area */}
                    <div className="absolute inset-0 z-0 bg-[#0d0101]">
                        {centerPhoneImage ? (
                            <img src={centerPhoneImage} alt="Full Screen Display" className="w-full h-full object-cover object-center" />
                        ) : (
                            <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-400 font-medium">
                                [Center Image]
                            </div>
                        )}
                    </div>
                </motion.div>

            </div>

            {/* Mobile Swipe Container for Extra Formats */}
            {fanCards && fanCards.length > 0 && (
                <div 
                    className="w-full flex sm:hidden overflow-x-auto snap-x snap-mandatory gap-5 px-8 pb-12 pt-4 mt-8"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {fanCards.map((imageUrl, i) => (
                        <div 
                            key={`mobile-card-${i}`}
                            className="shrink-0 snap-center w-[280px] h-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-5 flex flex-col pb-6"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-white/20 shrink-0" />
                                <div className="flex-1 h-3 bg-white/10 rounded-full" />
                            </div>
                            
                            <div className="w-full aspect-square bg-black/40 rounded-xl mb-5 overflow-hidden relative shadow-inner border border-white/5">
                                {imageUrl && <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover object-center opacity-90" />}
                            </div>
                            
                            <div className="space-y-2 mt-auto">
                                <div className="w-3/4 h-2 bg-white/20 rounded-full" />
                                <div className="w-1/2 h-2 bg-white/20 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
