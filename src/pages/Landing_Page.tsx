import hero_rize from '../assets/images/landing/hero_resized.png'
import Brand_banner from '../components/brand/Brand_banner';
import Style_Cards from '../components/dress_style_card/Style_Card';

const Landing_Page: React.FC = () => {
    return (
        <>
            <div className='bg-[#f2f0f1]'>
                <div className="max-w-screen-xl mx-auto px-4 sm:px-12 bg-[#f2f0f1]">
                    <div className="xl:min-h-140 md:min-h-120 grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4
                md:bg-[url(src/assets/images/landing/hero.png)] bg-cover bg-center bg-no-repeat">
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
                                    <span className='text-[12px]'>Internation Brands</span>
                                </div>
                                <div className='flex flex-col gap-1 md:border-r-1 sm:border-r-1 border-gray-400 md:pr-10 sm:pr-10'>
                                    <h2 className='text-2xl font-bold'>2,000+</h2>
                                    <span className='text-[12px]'>High-Quality Products</span>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h2 className='text-2xl font-bold'>30,000+</h2>
                                    <span className='text-[12px]'>Happ Customers</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-1 flex col-span-2 text-center justify-center items-center">
                            <img src={hero_rize} alt="Hero" className='md:hidden block w-100' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-black mx-auto'>
                <Brand_banner />
            </div>
            <div className='sm:px-12 max-w-screen-xl mx-auto'>
                <h1 className='text-center text-3xl font-header uppercase p-8'>new arrivals</h1>
            </div>
            <div className='sm:px-12 px-4 max-w-screen-xl mx-auto'>
                <Style_Cards />
            </div>
        </>
    );
}

export default Landing_Page;