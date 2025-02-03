import Footer_links from "./Footer_links";
import Payment_method from "./Payment_method";
import Subscribution_Box from "./Subscribution_Box";

const Footer: React.FC = () => {
    return (
        <footer className="bg-stone-100 relative sm:px-0 px-4">
            <Footer_links />
            <Payment_method />
        </footer>
    );
};

export default Footer;