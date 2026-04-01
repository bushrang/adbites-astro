import { motion } from "framer-motion";

export default function SocialFanOut({ data }) {
    if (!data) return null;

    const { headline, subline, centerPhoneImage, fanCards = [] } = data;

    // Split cards into left and right automatically
    const half = Math.ceil(fanCards.length / 2);
    const leftCards = fanCards.slice(0, half);
    const rightCards = fanCards.slice(half);

    return (
        <section className="py-32 bg-[#0d0101] overflow-hidden relative flex flex-col justify-center">
            
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
                    const angle = -15 - (i * 12);
                    const xOffset = -120 - (i * 140);
                    const yOffset = i * -15;
                    
                    return (
                        <motion.div
                            key={`left-${i}`}
                            initial={{ x: 0, y: 0, rotate: 0, opacity: 0, scale: 0.8 }}
                            whileInView={{ x: xOffset, y: yOffset, rotate: angle, opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 45, damping: 14, delay: i * 0.1 }}
                            className="absolute z-0 w-[240px] md:w-[280px] h-[340px] md:h-[400px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-4 flex flex-col hidden sm:flex"
                            style={{ transformOrigin: "bottom center" }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-white/20" />
                                <div className="flex-1 h-3 bg-white/10 rounded-full" />
                            </div>
                            
                            <div className="w-full flex-grow bg-black/40 rounded-xl mb-4 overflow-hidden relative shadow-inner border border-white/5">
                                {imageUrl && <img src={imageUrl} className="w-full h-full object-cover opacity-90" />}
                            </div>
                            
                            <div className="space-y-2 mt-auto pb-2">
                                <div className="w-3/4 h-2 bg-white/20 rounded-full" />
                                <div className="w-1/2 h-2 bg-white/20 rounded-full" />
                            </div>
                        </motion.div>
                    );
                })}

                {/* Right Cards */}
                {rightCards.map((imageUrl, i) => {
                    const angle = 15 + (i * 12);
                    const xOffset = 120 + (i * 140);
                    const yOffset = i * -15;
                    
                    return (
                        <motion.div
                            key={`right-${i}`}
                            initial={{ x: 0, y: 0, rotate: 0, opacity: 0, scale: 0.8 }}
                            whileInView={{ x: xOffset, y: yOffset, rotate: angle, opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 45, damping: 14, delay: i * 0.1 }}
                            className="absolute z-0 w-[240px] md:w-[280px] h-[340px] md:h-[400px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-4 flex flex-col hidden sm:flex"
                            style={{ transformOrigin: "bottom center" }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-white/20" />
                                <div className="flex-1 h-3 bg-white/10 rounded-full" />
                            </div>
                            
                            <div className="w-full flex-grow bg-black/40 rounded-xl mb-4 overflow-hidden relative shadow-inner border border-white/5">
                                {imageUrl && <img src={imageUrl} className="w-full h-full object-cover opacity-90" />}
                            </div>
                            
                            <div className="space-y-2 mt-auto pb-2">
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
                    className="relative z-10 w-[280px] md:w-[320px] h-[580px] md:h-[640px] bg-black rounded-[45px] md:rounded-[55px] border-[6px] md:border-[8px] border-zinc-900 shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col justify-start items-center overflow-hidden ring-1 ring-white/20"
                >
                    {/* Dynamic Island */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 md:w-28 h-6 md:h-7 bg-black rounded-full z-20 border border-white/5" />
                    
                    {/* Screen content area */}
                    <div className="w-full h-full bg-zinc-100 flex flex-col">
                        
                        {/* Inner photo scroll area */}
                        <div className="flex-1 p-3 flex flex-col gap-4 overflow-hidden pt-14">
                            {centerPhoneImage ? (
                                <img src={centerPhoneImage} alt="Post Review" className="w-full h-64 md:h-72 object-cover rounded-xl shadow-sm" />
                            ) : (
                                <div className="w-full h-64 md:h-72 bg-zinc-200 rounded-xl flex items-center justify-center text-zinc-400 font-medium">
                                    [Center Photo]
                                </div>
                            )}
                            
                            <div className="flex-1 bg-white rounded-xl shadow-sm p-5 border border-zinc-100 flex flex-col">
                                <div className="w-1/3 h-3 bg-zinc-200 rounded-full mb-4" />
                                <div className="w-full h-2 bg-zinc-100 rounded-full mb-3" />
                                <div className="w-5/6 h-2 bg-zinc-100 rounded-full mb-3" />
                                <div className="w-4/6 h-2 bg-zinc-100 rounded-full mb-3" />
                                <div className="w-1/2 h-2 bg-zinc-100 rounded-full mb-8" />
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
