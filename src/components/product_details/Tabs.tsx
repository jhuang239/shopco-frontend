import { useState } from "react";

const Tabs: React.FC = () => {

    const [selectedTab, setSelectedTab] = useState('rating');

    return (
        <div className="grid grid-cols-3 justify-between py-2">
            <div onClick={() => setSelectedTab("details")} className={`${selectedTab === "details" ? "text-gray-800 border-gray-800" : "text-gray-300 border-gray-300"}  border-b-2  flex items-center justify-center py-2 cursor-pointer`}>
                <span className={`capitalize ${selectedTab === "details" ? "text-gray-800" : "text-gray-300"}`}>product details</span>
            </div>
            <div onClick={() => setSelectedTab("rating")} className={`${selectedTab === "rating" ? "text-gray-800 border-gray-800" : "text-gray-300 border-gray-300"}  border-b-2  flex items-center justify-center py-2 cursor-pointer`}>
                <span className={`capitalize ${selectedTab === "rating" ? "text-gray-800" : "text-gray-300"}`}>rating & reviews</span>
            </div>
            <div onClick={() => setSelectedTab("faq")} className={`${selectedTab === "faq" ? "text-gray-800 border-gray-800" : "text-gray-300 border-gray-300"}  border-b-2  flex items-center justify-center py-2 cursor-pointer`}>
                <span className={`capitalize ${selectedTab === "faq" ? "text-gray-800" : "text-gray-300"}`}>FAQs</span>
            </div>
        </div>
    )
}

export default Tabs;