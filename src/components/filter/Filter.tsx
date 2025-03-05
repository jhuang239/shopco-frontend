import { Category } from "../../interfaces/category_interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import CategoryItem from "./Category_Item";

type FilterProps = {
    categories: Category[];
}

type CategoryListProps = {
    id: string;
    name: string;
    checked: boolean;
}


const Filter: React.FC<FilterProps> = ({ categories }) => {
    console.log(categories);

    const [categoryList, setCategoryList] = useState<CategoryListProps[]>([]);
    const [filterConfig, setFilterConfig] = useState({
        price: {
            show: true,
            min: 50,
            max: 200
        },
        colors: {
            show: true,
            selected: []
        },
        sizes: {
            show: true,
            selected: []
        },
        dress_styles: {
            show: true,
            selected: []
        }
    })

    const categoryHandler = (id: string) => {
        setCategoryList(
            categoryList.map((category: CategoryListProps) => {
                if (category.id === id) {
                    return {
                        ...category,
                        checked: !category.checked
                    }
                }
                return category;
            })
        );
    }

    useEffect(() => {
        setCategoryList(
            categories?.map((category) => {
                return {
                    id: category.id,
                    name: category.name,
                    checked: false
                }
            }) || []
        )
    }, [categories])

    let categoryElement = null;

    if (categoryList && categoryList.length > 0) {
        categoryElement = categoryList.map((category: CategoryListProps) => {
            return (
                <CategoryItem key={category.id} id={category.id} name={category.name} checked={category.checked} checkHandler={categoryHandler} />
            )
        })
    } else {
        categoryElement = <p className="text-gray-600">No categories found</p>
    }

    return (
        <div className="flex flex-col gap-4 border-2 rounded-md border-gray-200 p-4">
            <div className="flex flex-row items-center justify-between border-b-2 border-gray-200 pb-4">
                <h1 className="text-xl font-bold text-gray-600 capitalize">filters</h1>
                <FontAwesomeIcon icon={faSliders} className="text-gray-600" />
            </div>
            <div className="flex flex-col gap-4 h-60 no-scrollbar overflow-y-auto border-b-2 border-gray-200 pb-4">
                {categoryElement}
            </div>
            <div className="flex flex-row items-center justify-between">
                <h1 className="text-xl font-bold text-gray-600 capitalize">price</h1>
                <FontAwesomeIcon icon={filterConfig.price.show ? faChevronUp : faChevronDown} className="text-gray-600" />
            </div>
        </div>
    )
}

export default Filter;