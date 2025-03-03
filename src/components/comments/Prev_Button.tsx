import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

type PrevButtonProps = {
    prevSlide: () => void;
}

const Prev_Button: React.FC<PrevButtonProps> = ({ prevSlide }) => {
    return (
        <button
            onClick={prevSlide}
            className="hover:cursor-pointer absolute top-1/2 left-0 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
            aria-label="Previous"
        >
            <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
        </button>
    )
}

export default Prev_Button;