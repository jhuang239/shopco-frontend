import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@utils/http";
import { Brand } from "@/interfaces/brand_interface";
import { Link } from "react-router-dom";
import Page_Indicator from "@/components/page_indicator/Indicator";

const Brands_Page: React.FC = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["brands"],
        queryFn: getBrands,
        staleTime: 1000 * 60 * 5,
    });

    console.log(data);

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-12 py-4 mt-4">
                <div className="flex gap-4">
                    <Page_Indicator />
                </div>
                {isLoading && <p>Loading...</p>}
                {isError && (
                    <p>
                        Error:{" "}
                        {error instanceof Error ? error.message : String(error)}
                    </p>
                )}
                {data && (
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        {data.map((brand: Brand) => (
                            <Link
                                key={brand.id}
                                to={`/Brands/${brand.name}`}
                                className="col-span-4 sm:col-span-2 md:col-span-1 bg-black text-white p-4 text-center rounded-2xl"
                            >
                                <div>
                                    <p>{brand.name}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Brands_Page;
