import { Reviews } from "../../interfaces/review_interface"
import RenderStars from "../stars/Render_Stars";

import moment from 'moment';

type CardProps = {
    comment: Reviews;
}



const Comment_Card: React.FC<CardProps> = ({ comment }) => {

    const postedDate = moment(comment.createdAt).format('MMMM D, YYYY');

    return (
        <div
            key={comment.id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col h-50 overflow-ellipsis"
        >
            <div className="flex items-center mb-4">

                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 flex items-center justify-center">
                    {comment.user_id.charAt(0)}
                </div>

                <div className="flex flex-col">
                    <h3 className="font-semibold">{comment.user_id}</h3>
                    <div className="flex space-x-1">
                        {<RenderStars rating={comment.rating} />}
                    </div>
                </div>
            </div>
            <p className="text-gray-600 flex-grow">{comment.comment}</p>
            <span className="text-gray-600">Post on {postedDate}</span>
        </div>
    )
}

export default Comment_Card;