import { createContext, ReactNode, useState } from "react";

type PageContextType = {
    showSidebar: boolean;
    setShowSidebar: () => void;
}

const PageContext = createContext<PageContextType>({
    showSidebar: false,
    setShowSidebar: () => { }
});

const PageContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    const contextValue: PageContextType = {
        showSidebar,
        setShowSidebar: toggleSidebar
    };

    return (
        <PageContext.Provider value={contextValue}>
            {props.children}
        </PageContext.Provider>
    );
}

export { PageContext };
export default PageContextProvider;