import GalleryItem from './Gallery_item';
import { ProductsResponse, Product } from '../../interfaces/fetch_products_interface';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

export type GalleryProps = {
    products: ProductsResponse;
    headerTitle: string;
    sliceArr: [number, number];
    showAll?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({ products, headerTitle, sliceArr, showAll }) => {
    const scrollRef = useHorizontalScroll();
    return (
        <div className="flex flex-col flex-wrap items-center justify-center py-4 pb-8 border-b-2 border-gray-200">
            <h1 className='text-center text-3xl font-header uppercase p-8'>{headerTitle}</h1>
            {(products != null && products != undefined && products.items.length > 0) &&
                <div ref={scrollRef} className="flex gap-4 w-full p-6 overflow-x-auto no-scrollbar">
                    {products.items.slice(sliceArr[0], sliceArr[1]).map((item, index: number) => {
                        return (
                            <div key={`new_arrival_${index}`} className='min-w-[250px] w-1/4 flex-shrink-0'>
                                <GalleryItem {...item as Product} />
                            </div>
                        )
                    })}

                </div>
            }
            {showAll &&
                <button className="bg-white text-black px-16 py-2 rounded-2xl mt-4 hover:bg-gray-100 transition-colors hover:cursor-pointer outline">
                    View All
                </button>
            }
        </div>
    )
}

export default Gallery;