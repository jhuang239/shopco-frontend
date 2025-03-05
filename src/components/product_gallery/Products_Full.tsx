import { ProductsResponse, Product } from '../../interfaces/fetch_products_interface';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import GalleryItem from './Gallery_item';

type ProductsFullProps = {
    products: ProductsResponse;
    category: string;
}

const ProductsFull: React.FC<ProductsFullProps> = ({ products, category }) => {

    const [sort, setSort] = useState<boolean>(true);

    const sortHandler = () => {
        if (sort === false) {
            setSort(true);
            if (products.items.length === 0) return;
            products.items.sort((a: Product, b: Product) => a.price - b.price);
        } else {
            setSort(false);
            if (products.items.length === 0) return;
            products.items.sort((a: Product, b: Product) => b.price - a.price);
        }
    }

    let productsList = null;

    if (products && products.items.length > 0) {
        productsList =
            <div className='grid grid-cols-6 gap-4 mt-4 justify-items-center'>
                {products.items.map((item, index: number) => {
                    return (
                        <div key={`new_arrival_${index}`} className='md:col-span-2 col-span-3 min-w-[250px] w-1/4 flex-shrink-0 mx-auto'>
                            <GalleryItem {...item as Product} />
                        </div>
                    )
                })}
            </div>
    } else {
        productsList =
            <div className='text-center w-full p-8'>
                <h1 className='text-3xl font-header uppercase'>No products found</h1>
            </div>
    }

    return (
        <div>
            <div className='flex flex-row justify-between items-center'>
                <div className='float-left'>
                    <h1 className='text-2xl font-bold capitalize'>{category}</h1>
                </div>
                <div className='float-right'>
                    <span className='text-gray-600'>Sort by:</span>
                    <span className='text-gray-800 mx-2 cursor-pointer' onClick={sortHandler}>
                        Most Popular
                        {
                            sort === true ?
                                <FontAwesomeIcon icon={faChevronDown} className='ml-2' />
                                :
                                <FontAwesomeIcon icon={faChevronUp} className='ml-2' />
                        }
                    </span>
                </div>
            </div>
            {productsList}
        </div>
    )
}

export default ProductsFull;