import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function VideoGalleryCarousel({ data }) {
    const [activeIndex, setActiveIndex] = useState(1); // initialSlide is 1
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const swiperRef = useRef(null);
    const videoRefs = useRef({});

    const videos = data?.videos || [];

    if (videos.length === 0) return null;

    // Get the video element for the currently active slide
    const getActiveVideo = () => videoRefs.current[activeIndex];

    // Handle mute toggle — must use DOM API because React can't control `muted` attribute
    const handleMuteToggle = (e) => {
        e.stopPropagation();
        const vid = getActiveVideo();
        if (vid) {
            vid.muted = !vid.muted;
            setIsMuted(!isMuted);
        }
    };

    // Handle play/pause toggle
    const handlePlayPause = (e) => {
        e.stopPropagation();
        const vid = getActiveVideo();
        if (vid) {
            if (isPlaying) {
                vid.pause();
            } else {
                vid.play().catch(() => {});
            }
            setIsPlaying(!isPlaying);
        }
    };

    // When active index changes, pause old videos and play the new active one
    useEffect(() => {
        Object.entries(videoRefs.current).forEach(([idx, vid]) => {
            if (vid && Number(idx) !== activeIndex) {
                vid.pause();
                vid.currentTime = 0;
            }
        });
        const activeVid = videoRefs.current[activeIndex];
        if (activeVid) {
            activeVid.muted = true;
            setIsMuted(true);
            setIsPlaying(true);
            activeVid.play().catch(() => {});
        }
    }, [activeIndex]);

    return (
        <section className="py-24 bg-transparent relative z-10 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/5 via-[#0d0101] to-[#0d0101] pointer-events-none -z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-16">
                {data?.headline && (
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-[1.1]" dangerouslySetInnerHTML={{ __html: data.headline }}></h2>
                )}
                {data?.subline && (
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">{data.subline}</p>
                )}
            </div>

            <div className="video-gallery-carousel w-full relative px-4 md:px-12">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    initialSlide={1}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 250,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    navigation={true}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Navigation, Pagination]}
                    onSlideChange={(swiper) => {
                        setActiveIndex(swiper.realIndex);
                    }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                        setActiveIndex(swiper.realIndex);
                    }}
                    className="w-full max-w-7xl mx-auto py-12 px-4"
                >
                    {videos.map((video, index) => (
                        <SwiperSlide key={index} style={{ width: 'auto' }} className="flex justify-center">
                            {({ isActive }) => (
                                <div 
                                    className={`relative w-[280px] md:w-[360px] aspect-[9/16] bg-slate-900 rounded-[32px] border border-white/10 overflow-hidden transition-all duration-500 shadow-2xl
                                    ${isActive ? 'scale-100 opacity-100 z-20' : 'scale-90 opacity-40 blur-[2px] grayscale hover:grayscale-[50%] hover:blur-0 hover:opacity-70 cursor-pointer z-10'}`} 
                                    onClick={() => { if (!isActive && swiperRef.current) swiperRef.current.slideTo(index); }}
                                >
                                    
                                    {video.videoFile ? (
                                        <video 
                                            ref={(el) => {
                                                if (el) videoRefs.current[index] = el;
                                            }}
                                            src={video.videoFile} 
                                            poster={video.posterImage}
                                            autoPlay={isActive}
                                            loop 
                                            muted
                                            playsInline
                                            className="absolute inset-0 w-full h-full object-cover bg-slate-800"
                                        />
                                    ) : (
                                        <img 
                                            src={video.posterImage || '/placeholder-vertical.jpg'} 
                                            className="absolute inset-0 w-full h-full object-cover bg-slate-800"
                                            alt={video.title || "Video"}
                                        />
                                    )}

                                    {/* Overlay Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-80'}`}></div>

                                    {/* Mute Toggle Button */}
                                    {isActive && video.videoFile && (
                                        <button 
                                            onClick={handleMuteToggle}
                                            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                                            aria-label={isMuted ? "Unmute" : "Mute"}
                                        >
                                            {isMuted ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                                                    <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 4.5 4.5 0 0 1 0 6.364.75.75 0 0 1-1.06-1.06 3 3 0 0 0 0-4.243.75.75 0 0 1 0-1.061Z" />
                                                </svg>
                                            )}
                                        </button>
                                    )}

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10 text-left">
                                        <div className="flex items-center gap-4 mb-3">
                                            {isActive && (
                                                <button 
                                                    onClick={handlePlayPause}
                                                    className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center shadow-[0_0_20px_rgba(255,107,0,0.4)] shrink-0 hover:scale-110 transition-transform cursor-pointer"
                                                    aria-label={isPlaying ? "Pause" : "Play"}
                                                >
                                                    {isPlaying ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                                                            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white ml-1">
                                                            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </button>
                                            )}
                                            <div>
                                                {video.title && (
                                                    <h3 className="text-white font-bold text-2xl drop-shadow-md leading-tight">{video.title}</h3>
                                                )}
                                                {video.subtitle && (
                                                    <p className="text-brand-primary font-medium text-sm drop-shadow">{video.subtitle}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                .video-gallery-carousel .swiper-button-next,
                .video-gallery-carousel .swiper-button-prev {
                    color: white;
                    background: rgba(255, 255, 255, 0.08);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                    transition: all 0.3s ease;
                    z-index: 30;
                }
                .video-gallery-carousel .swiper-button-next:hover,
                .video-gallery-carousel .swiper-button-prev:hover {
                    background: rgba(255, 255, 255, 0.15);
                    border-color: rgba(255, 255, 255, 0.4);
                    transform: scale(1.1);
                }
                .video-gallery-carousel .swiper-button-next:after,
                .video-gallery-carousel .swiper-button-prev:after {
                    font-size: 16px;
                    font-weight: bold;
                }
                .video-gallery-carousel .swiper-pagination {
                    bottom: -10px !important;
                    z-index: 30;
                }
                .video-gallery-carousel .swiper-pagination-bullet {
                    background: rgba(255, 255, 255, 0.3);
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                .video-gallery-carousel .swiper-pagination-bullet-active {
                    background: rgba(255, 107, 0, 1);
                    width: 32px;
                    border-radius: 8px;
                }
                .video-gallery-carousel .swiper-slide {
                    width: auto;
                }
                @media (min-width: 768px) {
                    .video-gallery-carousel .swiper-button-next { right: 40px; }
                    .video-gallery-carousel .swiper-button-prev { left: 40px; }
                }
            `}} />
        </section>
    );
}
