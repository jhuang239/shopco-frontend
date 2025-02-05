import visa from '../../assets/images/payments/visa.png';
import master from '../../assets/images/payments/master.png';
import paypal from '../../assets/images/payments/paypal.png';
import googlepay from '../../assets/images/payments/googlepay.png';
import applepay from '../../assets/images/payments/applepay.png';

const Payment_method: React.FC = () => {
    return (
        <div className='grid grid-cols-2 flex items-center justify-between py-4 border-t border-gray-300 md:text-start text-center'>
            <div className='md:col-span-1 col-span-2'>
                <span>Shop.co &#169; 2024-2025. All Right Reserved</span>
            </div>
            <div className='flex gap-4 md:ml-auto md:col-span-1 col-span-2 justify-center items-center mt-2 md:mt-0'>
                <img src={visa} alt="visa" className="w-12 h-9" />
                <img src={master} alt="master" className="w-12 h-9" />
                <img src={paypal} alt="paypal" className="w-12 h-9" />
                <img src={googlepay} alt="googlepay" className="w-12 h-9" />
                <img src={applepay} alt="applepay" className="w-12 h-9" />
            </div>
        </div>
    )
}

export default Payment_method;