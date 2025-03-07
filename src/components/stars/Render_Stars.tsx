import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

type RenderStarsProps = {
    rating: number;
    size?: SizeProp;
};

const RenderStars: React.FC<RenderStarsProps> = ({ rating, size }) => {
    return Array(5).fill(0).map((_, i) => (
        <FontAwesomeIcon
            key={i}
            icon={faStar}
            size={size || "lg"}
            className={i < rating ? "text-yellow-400" : "text-gray-300"}
        />
    ));
};

export default RenderStars;