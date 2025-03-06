import { FilterProps } from "./Filter";
import Filter from "./Filter";
import { useContext } from "react";
import { PageContext } from "../../context/pageContext";

const Filter_Sidebar: React.FC<FilterProps> = ({ categories }) => {

    console.log("Filter_Sidebar rendered");
    const pageCtx = useContext(PageContext);

    const toggleFilterSidebar = () => {
        pageCtx.setShowFilterSidebar();
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 transition-[height] duration-300 ease-in-out z-40
                    ${pageCtx.showFilterSidebar ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={toggleFilterSidebar}
            />

            {/* Sidebar - Modified to slide from bottom to top */}
            <div className={`fixed bottom-0 left-0 w-full max-h-[90vh] overflow-y-auto bg-white z-50 shadow-lg rounded-t-3xl transition-[height] duration-300 ease-in-out transform
                ${pageCtx.showFilterSidebar ? 'translate-y-0' : 'translate-y-full'}`}>
                <Filter categories={categories} />
            </div>
        </>
    );
}

export default Filter_Sidebar;