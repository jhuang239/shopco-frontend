import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser, faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useContext } from 'react';
import { PageContext } from '../../context/pageContext';
import LoginModal from '../Modals/Login_Modal';
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
    username: string;
}

const Navbar: React.FC = () => {
    const pageCtx = useContext(PageContext);

    const toggleSidebar = () => {
        pageCtx.setShowSidebar();
    };
    const toggleLoginModal = () => {
        pageCtx.setShowLoginModal();
    }

    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        if (pageCtx.token) {
            const decodedToken = jwtDecode<CustomJwtPayload>(pageCtx.token);
            setUsername(decodedToken.username);
        } else {
            setUsername(null);
        }
    }, [pageCtx.token]);

    return (
        <div className='sticky top-0 z-30 bg-white shadow-md'>
            <div className='bg-stone container mx-auto py-4 sm:px-12 bg-white'>
                <Sidebar />
                <nav className="flex justify-between items-center gap-4 md:gap-8">
                    <button className="block md:hidden hover:cursor-pointer">
                        <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} />
                    </button>
                    <Link to="/" className="font-header text-xl font-bold color-black uppercase shrink-0">Shop.Co</Link>
                    <div id="nav-links" className="flex items-center hidden md:block">
                        <ul className="flex items-center space-x-8">
                            <li className="relative group">
                                <div className="peer">
                                    <a className="text-sm text-black mr-2 cursor-pointer">Shop</a>
                                    <FontAwesomeIcon icon={faChevronDown} className="transform group-hover:rotate-180 transition-transform duration-200" />
                                </div>

                                <div className="absolute hidden hover:block peer-hover:block w-48 bg-white shadow-lg rounded-md mt-0 py-2 z-50">
                                    <Link to="/shop/all" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">All Categories</Link>
                                </div>
                            </li>
                            <li>
                                <Link to="/sale" className="text-sm text-black">On Sale</Link>
                            </li>
                            <li>
                                <Link to="/new-arrivals" className="text-sm text-black">New Arrivals</Link>
                            </li>
                            <li>
                                <Link to="/brands" className="text-sm text-black">Brands</Link>
                            </li>
                        </ul>
                    </div>
                    <div id="search-box" className="flex-grow">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-8 py-1 border-none w-full outline-none bg-stone-100 rounded-xl hidden md:block"
                            />
                            <button className="absolute left-0 ml-2 bg-transparent border-none hidden md:block">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>

                        </div>
                    </div>
                    <div id="icon-group" className="flex items-center space-x-4 shrink-0">
                        <button className='bg-transparent border-none md:hidden cursor-pointer'>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                        <button className="bg-transparent border-none cursor-pointer">
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </button>
                        <button className="bg-transparent border-none cursor-pointer">
                            {typeof username === 'string' ? <div className="w-8 h-8 rounded-full bg-gray-300 mr-4 flex items-center justify-center capitalize" onClick={toggleLoginModal}>
                                {username.charAt(0)}
                            </div> : <FontAwesomeIcon icon={faUser} onClick={toggleLoginModal} />}
                        </button>
                    </div>
                </nav>
            </div>
            <LoginModal isOpen={pageCtx.showLoginModal} onClose={toggleLoginModal} />
        </div>
    );
};

export default Navbar;
