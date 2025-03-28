import { useQuery } from '@tanstack/react-query';
import hero_resize from '../assets/images/landing/hero_resized.png';
import hero from "../assets/images/landing/hero.png"
import Brand_banner from '../components/brand/Brand_banner';
import Style_Cards from '../components/dress_style_card/Style_Card';
import { productsKeys } from '../../utils/http';
import { reviewsKeys } from '../../utils/http';
import { getProductsAndReviews } from '../../utils/http';
import Gallery from '../components/product_gallery/Gallery';
import CommentCarousel from '../components/comments/Comment_Carousel';

const Landing_Page: React.FC = () => {

    // Use the cached query data
    const { data: productsData } = useQuery({
        queryKey: [productsKeys.page(1), reviewsKeys.all],
        queryFn: () => getProductsAndReviews(1),
        enabled: false,
    });

    const heroBackgroundStyle = {
        '--hero-bg-image': `url(${hero})`
    } as React.CSSProperties;

    return (
        <>
            <div className='bg-[#f2f0f1]'>
                <div className="container mx-auto px-4 sm:px-12 bg-[#f2f0f1]">
                    <div
                        className="xl:min-h-140 md:min-h-120 grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 md:bg-[image:var(--hero-bg-image)] bg-cover bg-center bg-no-repeat"
                        style={heroBackgroundStyle}
                    >
                        <div className="md:col-span-1 sm:col-span-2 col-span-2 flex flex-col items-start justify-center">
                            <h1 className="font-header uppercase text-4xl">
                                find clothes that matches your style
                            </h1>
                            <p className='text-[12px] text-gray-700 mt-4'>
                                Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                            </p>
                            <button className='bg-black text-white py-2 rounded-4xl mt-4 hover:bg-gray-800 transition-colors hover:cursor-pointer text-[12px] md:w-35 sm:w-48 w-full'>
                                Shop Now
                            </button>
                            <div className='w-full flex flex-wrap gap-4 mt-4 md:items-start sm:items-start items-center md:justify-between sm:justify-between justify-center'>
                                <div className='flex flex-col gap-1 md:border-r-1 sm:border-r-1 border-gray-400 md:pr-10 sm:pr-10'>
                                    <h2 className='text-2xl font-bold'>200+</h2>
                                    <span className='text-[12px]'>International Brands</span>
                                </div>
                                <div className='flex flex-col gap-1 md:border-r-1 sm:border-r-1 border-gray-400 md:pr-10 sm:pr-10'>
                                    <h2 className='text-2xl font-bold'>2,000+</h2>
                                    <span className='text-[12px]'>High-Quality Products</span>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h2 className='text-2xl font-bold'>30,000+</h2>
                                    <span className='text-[12px]'>Happy Customers</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-1 flex col-span-2 text-center justify-center items-center">
                            <img src={hero_resize} alt="Hero" className='md:hidden block w-100' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-black mx-auto'>
                <Brand_banner />
            </div>
            <div className='sm:px-12 container mx-auto bg-white'>
                <Gallery headerTitle='new arrivals' sliceArr={[0, 5]} products={productsData?.products} showAll={true} />
            </div>
            <div className='sm:px-12 container mx-auto bg-white mb-16'>
                <Gallery headerTitle='top selling' sliceArr={[5, 10]} products={productsData?.products} showAll={true} />
            </div>
            <div className='sm:px-12 px-4 container mx-auto mb-4'>
                <Style_Cards />
            </div>
            <div className='sm:px-12 container mx-auto'>
                <CommentCarousel reviews={productsData?.reviews} />
            </div>
        </>
    );
}

export default Landing_Page;