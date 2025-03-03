import { useState, useEffect } from 'react';
import { Reviews } from '../../interfaces/review_interface';
import Comment_Card from './Comment_Card';
import Prev_Button from './Prev_Button';
import Next_Button from './Next_Button';
import Indicator from './Indicator';

// Define the comment interface
type ReviewProps = {
    reviews: Reviews[];
}


const CommentCarousel: React.FC<ReviewProps> = ({ reviews }) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const maxIndex = Math.ceil(reviews.length / 3) - 1;

    // Auto-scroll functionality
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isTransitioning) {
                nextSlide();
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [activeIndex, isTransitioning]);

    const nextSlide = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setActiveIndex((prev) => (prev === maxIndex ? 0 : prev + 1));

        setTimeout(() => setIsTransitioning(false), 500);
    };

    const prevSlide = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setActiveIndex((prev) => (prev === 0 ? maxIndex : prev - 1));

        setTimeout(() => setIsTransitioning(false), 500);
    };



    return (
        <div className="w-full bg-white py-16">
            <div className="max-w-screen-xl mx-auto sm:px-0 px-4">
                <h2 className="relative text-3xl font-header uppercase text-left mb-12">our happy customers</h2>

                <div className="relative">
                    {/* Carousel Container */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {/* Group comments into sets of 3 */}
                            {Array(Math.ceil(reviews.length / 3)).fill(0).map((_, groupIndex) => (
                                <div key={groupIndex} className="flex-shrink-0 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {reviews.slice(groupIndex * 3, groupIndex * 3 + 3).map((comment) => (
                                        <Comment_Card key={comment.id} comment={comment} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <Prev_Button prevSlide={prevSlide} />
                    <Next_Button nextSlide={nextSlide} />

                    {/* Pagination indicators */}
                    <Indicator maxIndex={maxIndex} activeIndex={activeIndex} setActiveIndex={setActiveIndex} isTransitioning={isTransitioning} setIsTransitioning={setIsTransitioning} />
                </div>
            </div>
        </div>
    );
};

export default CommentCarousel;