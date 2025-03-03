import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const Subscription_Box: React.FC = () => {
    return (
        <div className=" bg-gradient-to-b from-white to-[#f2f0f1] max-w-screen-xl mx-auto sm:px-12 px-4">
            <div className="bg-black text-white w-full rounded-xl shadow-xl ">
                <div className="p-8 grid grid-cols-10 gap-6 items-center">
                    <div className="space-y-4 md:col-span-6 sm:col-span-10 col-span-10">
                        <h2 className="font-header uppercase text-4xl font-bold">stay upto date about our latest offers</h2>
                    </div>
                    <div className="flex flex-col md:col-span-4 sm:col-span-10 col-span-10">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="pl-10 w-full px-4 py-2 rounded-xl border-none outline-none bg-white text-black placeholder-gray-500"
                            />
                            <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3.5 text-gray-500" />
                        </div>
                        <button className="bg-white text-black px-4 py-2 rounded-xl w-full mt-4 hover:bg-gray-100 transition-colors hover:cursor-pointer">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription_Box;