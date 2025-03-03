import { Reviews } from "../../interfaces/review_interface"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

type CardProps = {
    comment: Reviews;
}

const Comment_Card: React.FC<CardProps> = ({ comment }) => {

    // Render stars based on rating
    const renderStars = (rating: number) => {
        return Array(5).fill(0).map((_, i) => (
            <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={i < rating ? "text-yellow-400" : "text-gray-300"}
            />
        ));
    };

    return (
        <div
            key={comment.id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col"
        >
            <div className="flex items-center mb-4">

                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 flex items-center justify-center">
                    {comment.user_id.charAt(0)}
                </div>

                <div>
                    <h3 className="font-semibold">{comment.user_id}</h3>
                    <div className="flex space-x-1">
                        {renderStars(comment.rating)}
                    </div>
                </div>
            </div>
            <p className="text-gray-600 flex-grow">{comment.comment}</p>
        </div>
    )
}

export default Comment_Card;