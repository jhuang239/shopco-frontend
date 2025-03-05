import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export type CategoryItemProps = {
    id: string;
    name: string;
    checked: boolean;
    checkHandler: (id: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ id, name, checked, checkHandler }) => {

    const [isChecked, setIsChecked] = useState<boolean>(checked);

    const itemCheckHandler = (id: string) => {
        setIsChecked(!isChecked);
        checkHandler(id);
    }

    let classes = "text-gray-600 capitalize";
    if (isChecked) {
        classes += " font-bold";
    }

    return (
        <div className="flex flex-row items-center hover:cursor-pointer justify-between" onClick={itemCheckHandler.bind(null, id)}>
            <p className={classes}>{name}</p>
            <FontAwesomeIcon icon={faChevronRight} className={isChecked ? "text-gray-800" : "text-gray-600"} />
        </div>
    )
}

export default CategoryItem;
