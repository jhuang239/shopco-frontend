import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
const Footer_links: React.FC = () => {
    return (
        <div className="grid grid-cols-6 gap-4 items-start pb-8 justify-between">
            <div className="flex flex-col gap-2 md:col-span-2 sm:col-span-6 col-span-6">
                <h2 className="font-header font-bold uppercase text-2xl">Shop.co</h2>
                <p className="text-[12px] text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p className="text-[12px] text-gray-500">
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="flex gap-5">
                    <FontAwesomeIcon icon={faFacebook} className="text-[18px] text-gray-500 hover:text-black hover:cursor-pointer" />
                    <FontAwesomeIcon icon={faInstagram} className="text-[18px] text-gray-500 hover:text-black hover:cursor-pointer" />
                    <FontAwesomeIcon icon={faTwitter} className="text-[18px] text-gray-500 hover:text-black hover:cursor-pointer" />
                    <FontAwesomeIcon icon={faYoutube} className="text-[18px] text-gray-500 hover:text-black hover:cursor-pointer" />

                </div>
            </div>
            <div className="flex flex-col gap-2 md:mt-2 md:col-span-1 sm:col-span-3 col-span-3">
                <h3 className="uppercase text-[14px] font-bold">company</h3>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer hover:text-black hover:cursor-pointer">About</span>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer">Feature</span>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer">Works</span>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer">Career</span>
            </div>
            <div className="flex flex-col gap-2 md:mt-2 md:col-span-1 sm:col-span-3 col-span-3">
                <h3 className="uppercase text-[14px] font-bold">Help</h3>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer">Customer Support</span>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer">Delivery Detail</span>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer">Terms & Conditions</span>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer">Privacy Policy</span>
            </div>
            <div className="flex flex-col gap-2 md:mt-2 md:col-span-1 sm:col-span-3 col-span-3">
                <h3 className="uppercase text-[14px] font-bold">FAQ</h3>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer">Account</span>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer">Manage Deliveries</span>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer">Orders</span>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer">Payments</span>
            </div>
            <div className="flex flex-col gap-2 md:mt-2 md:col-span-1 sm:col-span-3 col-span-3">
                <h3 className="uppercase text-[14px] font-bold">Resources</h3>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer">Free eBooks</span>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer">Development Tutorial</span>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer">How to - Block</span>
                <span className="text-gray-500 text-[12px] hover:text-black hover:cursor-pointer">Youtube Playlist</span>
            </div>
        </div>
    )
};

export default Footer_links;