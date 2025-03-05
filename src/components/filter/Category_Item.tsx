import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export type CategoryItemProps = {
    id: string;
    name: string;
    checked: boolean;
    checkHandler: (id: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ id, name, checked, checkHandler }) => {

    let classes = "text-gray-600 capitalize";
    if (checked) {
        classes += " font-bold";
    }

    return (
        <div className="flex flex-row items-center hover:cursor-pointer justify-between" onClick={checkHandler.bind(null, id)}>
            <p className={classes}>{name}</p>
            <FontAwesomeIcon icon={faChevronRight} className={checked ? "text-gray-800" : "text-gray-600"} />
        </div>
    )
}

export default CategoryItem;
