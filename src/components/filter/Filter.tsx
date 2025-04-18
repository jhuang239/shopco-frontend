import { Category } from "../../interfaces/category_interface";
import { StylesResponse } from "../../interfaces/style_interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../utils/queryClient";
import { productsKeys } from "../../../utils/http";
import {
    faSliders,
    faChevronUp,
    faChevronDown,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useCallback, useRef, useContext } from "react";
import CategoryItem from "./Category_Item";
import PriceRangeSlider from "./Price_Range_Slider";
import ColorList from "./Color_List";
import SizeList from "./Size_List";
import DressStyleList from "./Dress_Style_List";
import { PageContext } from "../../context/pageContext";
import { Colors, Sizes } from "../../dummyData/dummy";
import { getProductsByFilters } from "../../../utils/http";
import { filterProps } from "../../../utils/http";

export type FilterProps = {
    categories: Category[];
    styles: StylesResponse[];
    currentCategory: string;
};

type CategoryListProps = {
    id: string;
    name: string;
    checked: boolean;
};

export type ColorProps = {
    color: string;
    checked: boolean;
};

export type SizeProps = {
    name: string;
    checked: boolean;
};

export type DressStyleProps = {
    id: string;
    style: string;
    checked: boolean;
};

const Filter: React.FC<FilterProps> = ({
    categories,
    styles,
    currentCategory,
}) => {
    const pageCtx = useContext(PageContext);
    const priceRange = useRef<[number, number]>([0, 200]);

    const [categoriesList, setCategoriesList] = useState<CategoryListProps[]>(
        []
    );

    const categoryListRef = useRef<CategoryListProps[]>([]);

    const colorListRef = useRef<ColorProps[]>(
        Colors.map((color) => {
            return {
                color: color,
                checked: false,
            };
        })
    );

    const sizeListRef = useRef<SizeProps[]>(
        Sizes.map((size) => {
            return {
                name: size,
                checked: false,
            };
        })
    );

    const [dressStyleList, setDressStyleList] = useState<DressStyleProps[]>([]);

    const dressStyleRef = useRef<DressStyleProps[]>([]);

    const [filterShowConfig, setFilterShowConfig] = useState({
        price: true,
        color: true,
        size: true,
        style: true,
    });

    const categoryHandler = (id: string) => {
        categoryListRef.current = categoriesList.map((category) => {
            if (category.id === id) {
                return {
                    ...category,
                    checked: !category.checked,
                };
            }
            return category;
        });
    };

    const colorHandler = (color: string) => {
        colorListRef.current = colorListRef.current.map((c: ColorProps) => {
            if (c.color === color) {
                return {
                    ...c,
                    checked: !c.checked,
                };
            }
            return c;
        });
    };

    const sizeHandler = (name: string) => {
        sizeListRef.current = sizeListRef.current.map((s: SizeProps) => {
            if (s.name === name) {
                return {
                    ...s,
                    checked: !s.checked,
                };
            }
            return s;
        });
    };

    const dressStyleHandler = (style: string) => {
        dressStyleRef.current = dressStyleList.map((s: DressStyleProps) => {
            if (s.style === style) {
                return {
                    ...s,
                    checked: !s.checked,
                };
            }
            return s;
        });
    };

    const priceRangeHandler = useCallback((values: [number, number]) => {
        priceRange.current = values;
    }, []);

    const filterShowConfigHandler = (filter: keyof typeof filterShowConfig) => {
        setFilterShowConfig({
            ...filterShowConfig,
            [filter]: !filterShowConfig[filter],
        });
    };

    const applyFiltersMutation = useMutation({
        mutationFn: async (filter: filterProps) => {
            return await getProductsByFilters(filter, 1);
        },
        onSuccess: (data) => {
            console.log("Filtered Data: ", data);
            queryClient.setQueryData(
                [productsKeys.page(1), currentCategory],
                data
            );
        },
    });

    const appleFiltersHandler = () => {
        console.log("Category List: ", categoryListRef.current);
        console.log("Color List: ", colorListRef.current);
        console.log("Size List: ", sizeListRef.current);
        console.log("Dress Style List: ", dressStyleRef.current);
        console.log("Price Range: ", priceRange.current);

        const filter: filterProps = {
            category_ids: categoryListRef.current
                .filter((category) => category.checked)
                .map((category) => category.id),
            brand_id: null,
            style_ids: dressStyleRef.current
                .filter((style) => style.checked)
                .map((style) => style.id),
            product_name: null,
        };
        console.log("Filter: ", filter);
        applyFiltersMutation.mutateAsync(filter);
    };

    // const clearFiltersHandler = () => {
    //     setCategoriesList(
    //         categoriesList.map((category) => {
    //             return {
    //                 ...category,
    //                 checked: false,
    //             };
    //         })
    //     );
    //     categoryListRef.current = categoryListRef.current.map((category) => {
    //         return {
    //             ...category,
    //             checked: false,
    //         };
    //     });
    //     colorListRef.current = colorListRef.current.map((color) => {
    //         return {
    //             ...color,
    //             checked: false,
    //         };
    //     });
    //     sizeListRef.current = sizeListRef.current.map((size) => {
    //         return {
    //             ...size,
    //             checked: false,
    //         };
    //     });
    //     dressStyleRef.current = dressStyleRef.current.map((style) => {
    //         return {
    //             ...style,
    //             checked: false,
    //         };
    //     });
    //     priceRange.current = [0, 200];
    //     setHardRefresher((prev) => !prev);
    // };

    const toggleFilterSidebar = () => {
        appleFiltersHandler();
        pageCtx.setShowFilterSidebar();
    };

    useEffect(() => {
        if (categories && categories.length > 0) {
            setCategoriesList(
                categories.map((category) => {
                    return {
                        id: category.id,
                        name: category.name,
                        checked: false,
                    };
                })
            );
        }
    }, [categories]);

    useEffect(() => {
        if (styles && styles.length > 0) {
            setDressStyleList(
                styles.map((style) => {
                    return {
                        id: style.id,
                        style: style.name,
                        checked: false,
                    };
                })
            );
        }
    }, [styles]);

    return (
        <div
            className={`flex flex-col gap-4 border-2 rounded-2xl border-gray-200 ${
                pageCtx.showFilterSidebar ? "p-6" : "p-4"
            }`}
        >
            <div className="flex flex-row items-center justify-between border-b-2 border-gray-200 pb-4">
                <h1 className="text-xl font-bold text-gray-600 capitalize">
                    filters
                </h1>
                {pageCtx.showFilterSidebar === false ? (
                    <FontAwesomeIcon
                        icon={faSliders}
                        className="text-gray-600 cursor-pointer"
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faXmark}
                        className="text-gray-600 cursor-pointer"
                        onClick={toggleFilterSidebar}
                    />
                )}
            </div>
            <div className="flex flex-col gap-4 h-50 no-scrollbar overflow-y-auto border-b-2 border-gray-200 pb-4">
                {categoriesList &&
                    categoriesList.length > 0 &&
                    categoriesList.map((category: CategoryListProps) => {
                        return (
                            <CategoryItem
                                key={category.id}
                                id={category.id}
                                name={category.name}
                                checked={category.checked}
                                checkHandler={categoryHandler}
                            />
                        );
                    })}
            </div>
            <div
                className="flex flex-row items-center justify-between hover:cursor-pointer"
                onClick={() => filterShowConfigHandler("price")}
            >
                <h1 className="text-xl font-bold text-gray-600 capitalize">
                    price
                </h1>
                <FontAwesomeIcon
                    icon={filterShowConfig.price ? faChevronUp : faChevronDown}
                    className="text-gray-600"
                />
            </div>
            <div
                className={`transition-[height] ease-in-out duration-300 border-b-2 border-gray-200 px-2 ${
                    filterShowConfig.price
                        ? "max-h-100 opacity-100"
                        : "max-h-0 opacity-0 mb-0"
                }`}
                style={{
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionProperty: "max-height, opacity, margin-bottom",
                }}
            >
                <PriceRangeSlider
                    min={0}
                    max={200}
                    onChange={priceRangeHandler}
                    rangeValues={[priceRange.current[0], priceRange.current[1]]}
                />
            </div>
            <div
                className="flex flex-row items-center justify-between hover:cursor-pointer"
                onClick={() => filterShowConfigHandler("color")}
            >
                <h1 className="text-xl font-bold text-gray-600 capitalize">
                    colors
                </h1>
                <FontAwesomeIcon
                    icon={filterShowConfig.color ? faChevronUp : faChevronDown}
                    className="text-gray-600"
                />
            </div>
            <div
                className={`transition-[height] ease-in-out duration-300 border-b-2 border-gray-200 px-2 ${
                    filterShowConfig.color
                        ? "max-h-100 opacity-100"
                        : "max-h-0 opacity-0 mb-0"
                }`}
                style={{
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionProperty: "max-height, opacity, margin-bottom",
                }}
            >
                <ColorList
                    colorList={colorListRef.current}
                    onChange={colorHandler}
                />
            </div>

            <div
                className="flex flex-row items-center justify-between hover:cursor-pointer"
                onClick={() => filterShowConfigHandler("size")}
            >
                <h1 className="text-xl font-bold text-gray-600 capitalize">
                    size
                </h1>
                <FontAwesomeIcon
                    icon={filterShowConfig.size ? faChevronUp : faChevronDown}
                    className="text-gray-600"
                />
            </div>
            <div
                className={`transition-[height] ease-in-out duration-300 border-b-2 border-gray-200 px-2 ${
                    filterShowConfig.size
                        ? "max-h-100 opacity-100"
                        : "max-h-0 opacity-0 mb-0"
                }`}
                style={{
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionProperty: "max-height, opacity, margin-bottom",
                }}
            >
                <SizeList
                    sizeList={sizeListRef.current}
                    onChange={sizeHandler}
                />
            </div>

            <div
                className="flex flex-row items-center justify-between hover:cursor-pointer"
                onClick={() => filterShowConfigHandler("style")}
            >
                <h1 className="text-xl font-bold text-gray-600 capitalize">
                    dress style
                </h1>
                <FontAwesomeIcon
                    icon={filterShowConfig.style ? faChevronUp : faChevronDown}
                    className="text-gray-600"
                />
            </div>
            <div
                className={`transition-[height] ease-in-out duration-300 ${
                    filterShowConfig.style
                        ? "max-h-100 opacity-100"
                        : "max-h-0 opacity-0 mb-0"
                }`}
                style={{
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionProperty: "max-height, opacity, margin-bottom",
                }}
            >
                <DressStyleList
                    dressStyleList={dressStyleList}
                    onChange={dressStyleHandler}
                />
            </div>
            {pageCtx.showFilterSidebar === false ? (
                <button
                    className="bg-black text-white py-2 px-4 rounded-4xl cursor-pointer"
                    onClick={appleFiltersHandler}
                >
                    Apply Filters
                </button>
            ) : (
                <div className="sticky bottom-0 p-2 flex flex-row z-30 gap-2 bg-white items-center justify-between">
                    <button
                        className="bg-black text-white py-2 px-4 rounded-4xl cursor-pointer w-1/2"
                        onClick={toggleFilterSidebar}
                    >
                        Apply Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default Filter;
