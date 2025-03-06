import { createContext, ReactNode, useState } from "react";

type PageContextType = {
    showSidebar: boolean;
    setShowSidebar: () => void;
    showFilterSidebar: boolean;
    setShowFilterSidebar: () => void;

}

const PageContext = createContext<PageContextType>({
    showSidebar: false,
    setShowSidebar: () => { },
    showFilterSidebar: false,
    setShowFilterSidebar: () => { },
});

const PageContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [showFilterSidebar, setShowFilterSidebar] = useState<boolean>(false);

    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    const toggleFilterSidebar = () => {
        setShowFilterSidebar((prev) => !prev);
        console.log(showFilterSidebar);
    }

    const contextValue: PageContextType = {
        showSidebar,
        setShowSidebar: toggleSidebar,
        showFilterSidebar,
        setShowFilterSidebar: toggleFilterSidebar,
    };

    return (
        <PageContext.Provider value={contextValue}>
            {props.children}
        </PageContext.Provider>
    );
}

export { PageContext };
export default PageContextProvider;