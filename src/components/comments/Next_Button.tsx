import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

type NextButtonProps = {
    nextSlide: () => void;
}

const Next_Button: React.FC<NextButtonProps> = ({ nextSlide }) => {
    return (
        <button
            onClick={nextSlide}
            className="hover:cursor-pointer absolute top-1/2 right-0 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg z-10 hover:bg-gray-100"
            aria-label="Next"
        >
            <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
        </button>
    )
}

export default Next_Button;