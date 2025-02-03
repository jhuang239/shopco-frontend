import gucci from '../../assets/images/bands/gucci.png';
import ck from '../../assets/images/bands/ck.png';
import prada from '../../assets/images/bands/prada.png';
import versace from '../../assets/images/bands/versace.png';
import zara from '../../assets/images/bands/zara.png';

const Brand_banner: React.FC = () => {
    return (
        <div className='max-w-screen-xl mx-auto flex flex-wrap gap-4 py-8 sm:px-12  md:justify-between justify-center items-center'>
            <div className='min-h[20%] flex items-center justify-center'>
                <img src={versace} alt="versace" className='w-[100px]' />
            </div>
            <div className='min-h[20%] flex items-center justify-center'>
                <img src={zara} alt="zara" className='w-[50px]' />
            </div>
            <div className='min-h[20%] flex items-center justify-center'>
                <img src={gucci} alt="gucci" className='w-[100px]' />
            </div>
            <div className='min-h[20%] flex items-center justify-center'>
                <img src={prada} alt="prada" className='w-[100px]' />
            </div>
            <div className='min-h[20%] flex items-center justify-center'>
                <img src={ck} alt="ck" className='w-[100px]' />
            </div>
        </div>
    )
}

export default Brand_banner;