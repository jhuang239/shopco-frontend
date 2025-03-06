import { Category } from "../../interfaces/category_interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faChevronUp, faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useCallback, useRef, useContext } from "react";
import CategoryItem from "./Category_Item";
import PriceRangeSlider from "./Price_Range_Slider";
import ColorList from "./Color_List";
import SizeList from "./Size_List";
import DressStyleList from "./Dress_Style_List";
import { PageContext } from "../../context/pageContext";

export type FilterProps = {
    categories: Category[];
}

type CategoryListProps = {
    id: string;
    name: string;
    checked: boolean;
}

export type ColorProps = {
    color: string;
    checked: boolean;
}

export type SizeProps = {
    name: string;
    checked: boolean;
}

export type DressStyleProps = {
    style: string;
    checked: boolean;
}

const Colors = ["Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Black", "cyan", "plum", "Pink"];
const Sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];
const DressStyles = ["Casual", "Formal", "Party", "Gym"];

const Filter: React.FC<FilterProps> = ({ categories }) => {

    console.log("Filter Component Rendered");

    const pageCtx = useContext(PageContext);
    const priceRange = useRef<[number, number]>([0, 200]);

    const [categoriesList, setCategoriesList] = useState<CategoryListProps[]>([]);
    const categoryListRef = useRef<CategoryListProps[]>([]);

    const colorListRef = useRef<ColorProps[]>(
        Colors.map((color) => {
            return {
                color: color,
                checked: false
            }
        })
    )

    const sizeListRef = useRef<SizeProps[]>(
        Sizes.map((size) => {
            return {
                name: size,
                checked: false
            }
        })
    )

    const dressStyleRef = useRef<DressStyleProps[]>(
        DressStyles.map((style) => {
            return {
                style: style,
                checked: false
            }
        })
    )

    const [filterShowConfig, setFilterShowConfig] = useState({
        price: true,
        color: true,
        size: true,
        style: true
    });

    const categoryHandler = (id: string) => {
        categoryListRef.current = categoryListRef.current.map((category) => {
            if (category.id === id) {
                return {
                    ...category,
                    checked: !category.checked
                }
            }
            return category;
        })
    }

    const colorHandler = (color: string) => {
        colorListRef.current = colorListRef.current.map((c: ColorProps) => {
            if (c.color === color) {
                return {
                    ...c,
                    checked: !c.checked
                }
            }
            return c;
        })
    }

    const sizeHandler = (name: string) => {
        sizeListRef.current = sizeListRef.current.map((s: SizeProps) => {
            if (s.name === name) {
                return {
                    ...s,
                    checked: !s.checked
                }
            }
            return s;
        })
    }

    const dressStyleHandler = (style: string) => {
        dressStyleRef.current = dressStyleRef.current.map((s: DressStyleProps) => {
            if (s.style === style) {
                return {
                    ...s,
                    checked: !s.checked
                }
            }
            return s;
        })
    }

    const priceRangeHandler = useCallback((values: [number, number]) => {
        priceRange.current = values;
    }, []);

    const filterShowConfigHandler = (filter: keyof typeof filterShowConfig) => {
        setFilterShowConfig({
            ...filterShowConfig,
            [filter]: !filterShowConfig[filter]
        })
    }

    const appleFiltersHandler = () => {
        console.log("Category List: ", categoryListRef.current);
        console.log("Color List: ", colorListRef.current);
        console.log("Size List: ", sizeListRef.current);
        console.log("Dress Style List: ", dressStyleRef.current);
        console.log("Price Range: ", priceRange.current);
    }

    const toggleFilterSidebar = () => {
        pageCtx.setShowFilterSidebar();
    }

    useEffect(() => {
        if (categories && categories.length > 0) {
            setCategoriesList(categories.map((category) => {
                return {
                    id: category.id,
                    name: category.name,
                    checked: false
                }
            }))
            categoryListRef.current = categories.map((category) => {
                return {
                    id: category.id,
                    name: category.name,
                    checked: false
                }
            })
        }
    }, [categories])

    return (
        <div className={`flex flex-col gap-4 border-2 rounded-2xl border-gray-200 ${pageCtx.showFilterSidebar ? "p-6" : "p-4"}`}>
            <div className="flex flex-row items-center justify-between border-b-2 border-gray-200 pb-4">
                <h1 className="text-xl font-bold text-gray-600 capitalize">filters</h1>
                {pageCtx.showFilterSidebar === false ?
                    <FontAwesomeIcon icon={faSliders} className="text-gray-600" />
                    :
                    <FontAwesomeIcon icon={faXmark} className="text-gray-600" onClick={toggleFilterSidebar} />
                }
            </div>
            <div className="flex flex-col gap-4 h-50 no-scrollbar overflow-y-auto border-b-2 border-gray-200 pb-4">
                {categoriesList && categoriesList.length > 0 &&
                    categoriesList.map((category: CategoryListProps) => {
                        return (
                            <CategoryItem key={category.id} id={category.id} name={category.name} checked={category.checked} checkHandler={categoryHandler} />
                        )
                    })
                }
            </div>
            <div className="flex flex-row items-center justify-between hover:cursor-pointer" onClick={() => filterShowConfigHandler("price")}>
                <h1 className="text-xl font-bold text-gray-600 capitalize">price</h1>
                <FontAwesomeIcon icon={filterShowConfig.price ? faChevronUp : faChevronDown} className="text-gray-600" />
            </div>
            <div
                className={`transition-[height] ease-in-out duration-300 border-b-2 border-gray-200 px-2 ${filterShowConfig.price ? "max-h-100 opacity-100" : "max-h-0 opacity-0 mb-0"
                    }`}
                style={{
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionProperty: "max-height, opacity, margin-bottom"
                }}
            >
                <PriceRangeSlider min={0} max={200} onChange={priceRangeHandler} rangeValues={[priceRange.current[0], priceRange.current[1]]} />
            </div>
            <div className="flex flex-row items-center justify-between hover:cursor-pointer" onClick={() => filterShowConfigHandler("color")}>
                <h1 className="text-xl font-bold text-gray-600 capitalize">colors</h1>
                <FontAwesomeIcon icon={filterShowConfig.color ? faChevronUp : faChevronDown} className="text-gray-600" />
            </div>
            <div
                className={`transition-[height] ease-in-out duration-300 border-b-2 border-gray-200 px-2 ${filterShowConfig.color ? "max-h-100 opacity-100" : "max-h-0 opacity-0 mb-0"
                    }`}
                style={{
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionProperty: "max-height, opacity, margin-bottom"
                }}
            >
                <ColorList colorList={colorListRef.current} onChange={colorHandler} />
            </div>

            <div className="flex flex-row items-center justify-between hover:cursor-pointer" onClick={() => filterShowConfigHandler("size")}>
                <h1 className="text-xl font-bold text-gray-600 capitalize">size</h1>
                <FontAwesomeIcon icon={filterShowConfig.size ? faChevronUp : faChevronDown} className="text-gray-600" />
            </div>
            <div
                className={`transition-[height] ease-in-out duration-300 border-b-2 border-gray-200 px-2 ${filterShowConfig.size ? "max-h-100 opacity-100" : "max-h-0 opacity-0 mb-0"
                    }`}
                style={{
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionProperty: "max-height, opacity, margin-bottom"
                }}
            >
                <SizeList sizeList={sizeListRef.current} onChange={sizeHandler} />
            </div>

            <div className="flex flex-row items-center justify-between hover:cursor-pointer" onClick={() => filterShowConfigHandler("style")}>
                <h1 className="text-xl font-bold text-gray-600 capitalize">dress style</h1>
                <FontAwesomeIcon icon={filterShowConfig.style ? faChevronUp : faChevronDown} className="text-gray-600" />
            </div>
            <div
                className={`transition-[height] ease-in-out duration-300 ${filterShowConfig.style ? "max-h-100 opacity-100" : "max-h-0 opacity-0 mb-0"
                    }`}
                style={{
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionProperty: "max-height, opacity, margin-bottom"
                }}
            >
                <DressStyleList dressStyleList={dressStyleRef.current} onChange={dressStyleHandler} />
            </div>
            {pageCtx.showFilterSidebar === false ?
                <button className="bg-black text-white py-2 rounded-4xl" onClick={appleFiltersHandler}>Apply Filters</button>
                :
                <div className="sticky bottom-0 p-2 flex flex-col z-30 bg-white">
                    <button className="bg-black text-white py-2 rounded-4xl" onClick={toggleFilterSidebar}>Apply Filters</button>
                </div>

            }
        </div>
    )
}

export default Filter;