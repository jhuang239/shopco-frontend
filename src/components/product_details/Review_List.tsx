import { Reviews } from "../../interfaces/review_interface";
import Comment_Card from "../comments/Comment_Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";


type ReviewListProps = {
    reviews: Reviews[];
};

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {

    const [reviewSorted, setReviewSorted] = useState<boolean>(false);
    const [reviewList, setReviewList] = useState<Reviews[]>([]);

    const handleReviewSort = () => {
        setReviewSorted(!reviewSorted);

    }

    useEffect(() => {
        if (reviewSorted) {
            setReviewList([...reviews].sort((a, b) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }));
        } else {
            setReviewList(reviews);
        }
    }, [reviewSorted, reviews]);

    return (
        <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center">
                    <h1 className="capitalize text-black text-2xl font-bold">all reviews</h1>
                    <span className="text-gray-600 ml-2 text-lg">{`(${reviews.length})`}</span>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <button className="bg-gray-200 hover:bg-gray-400 h-10 w-10 rounded-full cursor-pointer">
                        <FontAwesomeIcon icon={faSliders} className="text-black" />
                    </button>
                    <button onClick={handleReviewSort} className="bg-gray-200 hover:bg-gray-400 cursor-pointer py-2 px-6 rounded-3xl flex items-center gap-4">
                        <span className="text-gray-600 capitalize">latest</span>
                        <FontAwesomeIcon icon={reviewSorted ? faChevronUp : faChevronDown} className="text-black" />
                    </button>
                    <button className="bg-black text-white py-2 px-6 rounded-3xl cursor-pointer hover:bg-gray-600">
                        Write a Review
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {reviewList.map((review, index) => (
                    <div key={review.id} className={`md:col-span-1 col-span-2 ${index >= 3 ? "md:block hidden" : "block"}`}>
                        <Comment_Card key={review.id} comment={review} />
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center gap-4">
                <button className="py-2 px-6 rounded-3xl capitalize border-1 border-gray-300 hover:bg-gray-200 cursor-pointer">
                    load more reviews
                </button>
            </div>
        </div>
    );
};

export default ReviewList;