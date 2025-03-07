import { useQuery } from '@tanstack/react-query';
import { getLatestProducts } from "../../../utils/http";
import Gallery from '../product_gallery/Gallery';

const Suggested_Products: React.FC = () => {

    const { data: latestProducts, isLoading, isError, error } = useQuery({
        queryKey: ['latestProducts'],
        queryFn: getLatestProducts
    });

    console.log(latestProducts);

    return (
        <div className="container mx-auto">
            {isLoading && <h1>Loading...</h1>}
            {isError && <h1>Error: {error instanceof Error ? error.message : 'Unknown error'}</h1>}
            {latestProducts && <Gallery products={latestProducts} headerTitle="You may also like" sliceArr={[0, 4]} />}
        </div>
    )
}

export default Suggested_Products;
