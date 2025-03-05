import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { productsKeys } from '../../utils/http';
import { getProducts, getCategories } from "../../utils/http";
import Page_Indicator from "../components/page_indicator/Indicator";
import ProductsFull from "../components/product_gallery/Products_Full";
import Filter from "../components/filter/Filter";
import Pagination from "../components/pagination/Pagination";

const Products_Page = () => {

    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    const { data: productsData } = useQuery({
        queryKey: [productsKeys.page(page),],
        queryFn: () => getProducts(category, page),
        staleTime: 1000 * 60 * 5,
    });

    const [totalPages, setTotalPages] = useState(productsData?.totalPages || 0);

    const location = useLocation();

    const category = location.pathname.split("/")[2];



    const { data: categoriesData } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
        staleTime: 1000 * 60 * 5,
    })

    const setPageHandler = (page: number, loading: boolean) => {
        setLoading(loading);
        setPage(page);
    }

    useEffect(() => {
        if (productsData) {
            setTotalPages(productsData.totalPages);
            setLoading(false);
        }
    }, [productsData])


    return (
        <>
            <div className="bg-white">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-12 py-4 mt-4">
                    <div className="flex gap-4">
                        {<Page_Indicator />}
                    </div>
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        <div className="col-span-1 md:block hidden ">
                            {categoriesData && <Filter categories={categoriesData} />}
                        </div>
                        <div className="md:col-span-3 col-span-4">
                            <ProductsFull products={productsData} category={category} />
                        </div>
                    </div>
                    {totalPages >= 1 &&
                        <div className="grid grid-cols-4 gap-4 mt-4">
                            <div className="col-span-4 col-start-2">
                                <Pagination
                                    loading={loading}
                                    currentPage={page}
                                    totalPages={totalPages}
                                    onPageChange={setPageHandler}
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Products_Page;