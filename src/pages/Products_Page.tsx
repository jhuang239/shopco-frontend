import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productsKeys } from "../../utils/http";
import {
    getProducts,
    getCategories,
    getProductsByBrand,
} from "../../utils/http";
import Page_Indicator from "../components/page_indicator/Indicator";
import ProductsFull from "../components/product_gallery/Products_Full";
import Filter from "../components/filter/Filter";
import Pagination from "../components/pagination/Pagination";
import Filter_Sidebar from "../components/filter/Filter_Sidebar";
import { PageContext } from "../context/pageContext";
import { queryClient } from "../../utils/queryClient";

type ProductsPageProps = {
    presetCategory?: string;
    search?: boolean;
    searchQuery?: string;
    isBrand?: boolean;
    brand?: string;
};

const Products_Page: React.FC<ProductsPageProps> = ({
    presetCategory,
    search,
    searchQuery,
    isBrand,
}) => {
    const pageCtx = useContext(PageContext);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const location = useLocation();

    const category = presetCategory || location.pathname.split("/")[2];

    // Track previous pathname to detect category changes
    const [prevPathname, setPrevPathname] = useState(location.pathname);

    const { data: productsData, refetch } = useQuery({
        queryKey: [productsKeys.page(page), search ? searchQuery : category], // Add category to query key
        queryFn: () =>
            isBrand
                ? getProductsByBrand(category, page)
                : getProducts(category, page),
        staleTime: 1000 * 60 * 5,
    });

    const { data: categoriesData } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 5,
    });

    const setPageHandler = (page: number, loading: boolean) => {
        setLoading(loading);
        setPage(page);
    };

    useEffect(() => {
        if (productsData) {
            setTotalPages(productsData.totalPages);
            setLoading(false);
        }
    }, [productsData]);

    // Handle category changes
    useEffect(() => {
        // Check if the category has changed
        if (location.pathname !== prevPathname) {
            // Reset page to 1 when category changes
            setPage(1);

            // Reset the query for the new category
            queryClient.resetQueries({
                queryKey: [productsKeys.all, category], // Reset all queries for this category
            });

            // Update the previous pathname
            setPrevPathname(location.pathname);
        }
    }, [location.pathname, prevPathname, category]);

    // This effect handles refetching when page changes within the same category
    useEffect(() => {
        refetch();
    }, [page, category, refetch]);

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-12 py-4 mt-4">
                {pageCtx.showFilterSidebar && categoriesData && (
                    <Filter_Sidebar categories={categoriesData} />
                )}
                <div className="flex gap-4">{<Page_Indicator />}</div>
                <div className="grid grid-cols-4 gap-4 mt-4">
                    <div className="col-span-1 md:block hidden ">
                        {!pageCtx.showFilterSidebar && categoriesData && (
                            <Filter categories={categoriesData} />
                        )}
                    </div>
                    <div className="md:col-span-3 col-span-4">
                        <ProductsFull
                            products={productsData}
                            category={category}
                        />
                    </div>
                </div>
                {totalPages >= 1 && (
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        <div className="col-span-4 md:col-start-2">
                            <Pagination
                                loading={loading}
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={setPageHandler}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products_Page;
