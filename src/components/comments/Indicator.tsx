type IndicatorProps = {
    maxIndex: number;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    isTransitioning: boolean;
    setIsTransitioning: (isTransitioning: boolean) => void;
}


const Indicator: React.FC<IndicatorProps> = ({ maxIndex, activeIndex, setActiveIndex, isTransitioning, setIsTransitioning }) => {
    return (
        <div className="flex justify-center mt-8 space-x-2">
            {Array(maxIndex + 1).fill(0).map((_, i) => (
                <button
                    key={i}
                    onClick={() => {
                        if (!isTransitioning) {
                            setIsTransitioning(true);
                            setActiveIndex(i);
                            setTimeout(() => setIsTransitioning(false), 500);
                        }
                    }}
                    className={`hover:cursor-pointer w-2 h-2 rounded-full ${activeIndex === i ? 'bg-black' : 'bg-gray-300'
                        }`}
                    aria-label={`Go to slide ${i + 1}`}
                />
            ))}
        </div>
    )
}

export default Indicator;