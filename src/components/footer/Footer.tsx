import Footer_links from "./Footer_links";
import Payment_method from "./Payment_method";

const Footer: React.FC = () => {
    return (
        <footer className="relative sm:px-0 px-4">
            <Footer_links />
            <Payment_method />
        </footer>
    );
};

export default Footer;