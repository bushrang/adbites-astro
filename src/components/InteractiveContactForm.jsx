import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
    {
        id: "name",
        type: "text",
        question: "Hi! Wie heißt du?",
        placeholder: "Vorname",
    },
    {
        id: "company",
        type: "text",
        question: "Freut mich, {name}! Für welche Firma arbeitest du?",
        placeholder: "Firmenname oder Website",
    },
    {
        id: "service",
        type: "choice",
        question: "Wobei können wir euch am besten unterstützen?",
        options: [
            "Meta Ads Kampagnen",
            "KI Fotoshootings",
            "Local SEO / Listings",
            "Individuelle Beratung"
        ]
    },
    {
        id: "budget",
        type: "choice",
        question: "Wie hoch ist euer geplantes Media-Budget im Monat?",
        options: [
            "Unter 1.000 €",
            "1.000 € - 3.000 €",
            "3.000 € - 10.000 €",
            "10.000 € +"
        ]
    },
    {
        id: "email",
        type: "email",
        question: "Klasse! Unter welcher E-Mail-Adresse können wir dich erreichen?",
        placeholder: "hallo@firma.de",
    }
];

export default function InteractiveContactForm() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [status, setStatus] = useState("idle"); // idle, submitting, success
    const inputRef = useRef(null);

    const currentQ = questions[step];

    useEffect(() => {
        // Auto-focus input when step changes
        if (inputRef.current) {
            inputRef.current.focus();
        }
        
        // Setup keyboard listener for choices
        const handleKeyPress = (e) => {
            if (status !== "idle" || !currentQ) return;
            
            if (currentQ.type === "choice") {
                // Number keys 1-9
                const num = parseInt(e.key);
                if (num > 0 && num <= currentQ.options.length) {
                    handleChoice(currentQ.options[num - 1]);
                }
            } else {
                // Enter key for text inputs
                if (e.key === "Enter") {
                    const val = answers[currentQ.id];
                    if (val && val.trim() !== '') {
                        handleNext();
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [step, answers, status, currentQ]);

    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            submitForm();
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleChoice = (opt) => {
        setAnswers({ ...answers, [currentQ.id]: opt });
        setTimeout(() => handleNext(), 400); // Visual delay
    };

    const submitForm = () => {
        setStatus("submitting");
        // Simulate API Request
        setTimeout(() => {
            setStatus("success");
        }, 1500);
    };

    // Calculate progress progress
    const progress = Math.round(((step) / questions.length) * 100);

    return (
        <div className="relative w-full max-w-4xl mx-auto p-6 md:p-12 min-h-[60vh] flex flex-col justify-center z-10">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

            <AnimatePresence mode="wait">
                {status === "idle" && currentQ && (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40, filter: "blur(4px)" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 w-full"
                    >
                        <div className="flex gap-4 md:gap-8">
                            {/* Step Number + Arrow */}
                            <div className="text-brand-primary font-mono text-2xl md:text-3xl mt-1 flex items-center gap-2">
                                <span>{step + 1}</span>
                                <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>

                            {/* Question Content */}
                            <div className="flex-1 max-w-2xl">
                                <h1 className="text-3xl md:text-5xl lg:text-[56px] font-bold text-white mb-10 leading-[1.1] md:leading-[1.1]">
                                    {currentQ.question.replace("{name}", answers.name || "")}
                                </h1>

                                {/* Text/Email Input */}
                                {(currentQ.type === "text" || currentQ.type === "email") && (
                                    <div className="relative group">
                                        <input
                                            ref={inputRef}
                                            type={currentQ.type}
                                            className="w-full bg-transparent border-b-2 border-white/20 focus:border-brand-primary text-3xl md:text-4xl text-brand-primary pb-4 focus:outline-none transition-colors placeholder-white/10"
                                            placeholder={currentQ.placeholder}
                                            value={answers[currentQ.id] || ""}
                                            onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
                                        />
                                        
                                        {/* OK Button */}
                                        <AnimatePresence>
                                            {answers[currentQ.id] && answers[currentQ.id].trim() !== "" && (
                                                <motion.button
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    onClick={handleNext}
                                                    className="mt-8 flex items-center gap-3 bg-brand-primary text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-brand-accent transition-colors active:scale-95"
                                                >
                                                    OK 
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </motion.button>
                                            )}
                                        </AnimatePresence>
                                        <div className="mt-4 text-slate-500 font-mono text-sm opacity-50">Drücke Enter ↵</div>
                                    </div>
                                )}

                                {/* Choice Input */}
                                {currentQ.type === "choice" && (
                                    <div className="flex flex-col gap-3 md:gap-4">
                                        {currentQ.options.map((opt, idx) => {
                                            const isSelected = answers[currentQ.id] === opt;
                                            return (
                                                <button
                                                    key={opt}
                                                    onClick={() => handleChoice(opt)}
                                                    className={`group w-full text-left p-4 md:p-5 rounded-xl border transition-all flex items-center gap-4 md:gap-6 ${
                                                        isSelected 
                                                        ? 'border-brand-primary bg-brand-primary/20 scale-[1.02]' 
                                                        : 'border-white/10 bg-white/5 hover:border-brand-primary/50 hover:bg-white/10'
                                                    }`}
                                                >
                                                    <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-md font-mono text-sm transition-colors ${
                                                        isSelected ? 'bg-brand-primary text-white' : 'bg-white/10 text-brand-primary group-hover:bg-brand-primary/30'
                                                    }`}>
                                                        {idx + 1}
                                                    </span>
                                                    <span className={`text-xl md:text-2xl transition-colors ${
                                                        isSelected ? 'text-white font-medium' : 'text-slate-300 group-hover:text-white'
                                                    }`}>
                                                        {opt}
                                                    </span>
                                                </button>
                                            )
                                        })}
                                        <div className="mt-2 text-slate-500 font-mono text-sm opacity-50">Drücke eine Zahl (1-{currentQ.options.length})</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Loading State */}
                {status === "submitting" && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center min-h-[400px] z-10 w-full"
                    >
                        <div className="w-16 h-16 border-4 border-white/10 border-t-brand-primary rounded-full animate-spin mb-8"></div>
                        <h3 className="text-2xl text-white font-medium animate-pulse">Botschaft wird versendet...</h3>
                    </motion.div>
                )}

                {/* Success State */}
                {status === "success" && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center min-h-[400px] z-10 w-full text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, rotate: [0, -10, 0] }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                            className="w-24 h-24 bg-gradient-to-tr from-brand-primary to-brand-accent rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(255,107,0,0.5)]"
                        >
                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                            </svg>
                        </motion.div>
                        <h3 className="text-4xl md:text-5xl text-white font-bold mb-6">Perfekt, {answers.name}!</h3>
                        <p className="text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
                            Deine Anfrage ist bei uns gelandet. Wir schauen uns <strong>{answers.company}</strong> genau an und melden uns in Kürze unter <strong>{answers.email}</strong>.
                        </p>
                        <button onClick={() => window.location.href = '/'} className="mt-12 text-brand-primary font-bold hover:text-brand-accent">
                            ← Zurück zur Startseite
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation Controls (Bottom Bar) */}
            {status === "idle" && (
                <div className="fixed bottom-0 left-0 w-full border-t border-white/10 bg-transparent/80 backdrop-blur-xl z-50">
                    <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Progress bar */}
                            <div className="hidden sm:flex items-center gap-2">
                                <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-brand-primary transition-all duration-500 ease-out" 
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs text-slate-500 font-mono w-10">{progress}%</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button 
                                onClick={handleBack}
                                disabled={step === 0}
                                className={`p-2 rounded-md transition-colors ${step === 0 ? 'text-white/20 cursor-not-allowed' : 'text-white hover:bg-white/10'}`}
                                aria-label="Zurück"
                            >
                                <svg className="w-6 h-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button 
                                onClick={handleNext}
                                disabled={!answers[currentQ.id] || answers[currentQ.id].trim() === ''}
                                className={`p-2 rounded-md transition-colors ${(!answers[currentQ.id] || answers[currentQ.id].trim() === '') ? 'text-white/20 cursor-not-allowed' : 'text-white hover:bg-white/10'}`}
                                aria-label="Weiter"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
