import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-white/10 last:border-none">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
            >
                <span className="text-lg md:text-xl font-medium text-white group-hover:text-brand-primary transition-colors pr-8">
                    {question}
                </span>
                <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                    <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: "anticipate" }}
                        className="absolute w-full h-[2px] bg-white group-hover:bg-brand-primary transition-colors"
                        style={{ originX: 0.5, originY: 0.5 }}
                    />
                    <motion.span
                        animate={{ rotate: isOpen ? 45 : 90 }}
                        transition={{ duration: 0.3, ease: "anticipate" }}
                        className="absolute w-full h-[2px] bg-white group-hover:bg-brand-primary transition-colors"
                        style={{ originX: 0.5, originY: 0.5 }}
                    />
                </div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 text-slate-400 leading-relaxed text-base max-w-2xl whitespace-pre-line">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function DynamicFaqAccordion({ questions = [] }) {
    const [openIndex, setOpenIndex] = useState(0);

    if (!questions || questions.length === 0) return null;

    const handleItemClick = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="w-full">
            {questions.map((item, index) => (
                <AccordionItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIndex === index}
                    onClick={() => handleItemClick(index)}
                />
            ))}
        </div>
    );
}
