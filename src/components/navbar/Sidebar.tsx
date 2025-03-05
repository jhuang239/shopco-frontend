import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { PageContext } from "../../context/pageContext";
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const pageCtx = useContext(PageContext);
    const toggleSidebar = () => {
        pageCtx.setShowSidebar();
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 transition-all duration-300 ease-in-out z-40
                    ${pageCtx.showSidebar ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={toggleSidebar}
            />

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-[80%] max-w-[360px] bg-white z-50 shadow-lg transition-all duration-300 ease-in-out transform
                ${pageCtx.showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>

                {/* Close button */}
                <div className="flex justify-between">
                    <Link to="/" className="font-header absolute top-4 p-2 left-4 text-xl font-bold color-black uppercase">Shop.Co</Link>
                    <button
                        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={toggleSidebar}
                    >
                        <FontAwesomeIcon icon={faXmark} className="text-gray-600 w-6 h-6 hover:cursor-pointer" />
                    </button>
                </div>
                {/* Navigation links */}
                <nav className="mt-16 px-6 py-2">
                    <ul className="space-y-3">
                        <li className="group">
                            <div className="flex items-center cursor-pointer">
                                <a className="text-gray-800 transition-colors">
                                    Shop
                                </a>
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className="ml-2 w-4 h-4 transform transition-transform duration-200 group-hover:rotate-180"
                                />
                            </div>
                            <div className="overflow-hidden transition-all duration-300 ease-in-out max-h-0 group-hover:max-h-40">
                                <ul className="mt-2 ml-4 space-y-3">
                                    <li>
                                        <Link to="/shop/all" className="block text-sm text-gray-700 hover:text-blue-600 transition-colors">
                                            All Categories
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link to="/shop/women" className="block text-sm text-gray-700 hover:text-blue-600 transition-colors">
                                            Women
                                        </Link>
                                    </li> */}
                                </ul>
                            </div>
                        </li>
                        <li>
                            <a href="/about" className="text-gray-800 hover:text-blue-600 transition-colors">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="text-gray-800 hover:text-blue-600 transition-colors">
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;