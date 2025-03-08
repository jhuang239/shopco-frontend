import { createContext, ReactNode, useState, useEffect } from "react";
import { getToken, isTokenExpired, removeToken, saveToken } from "../../utils/saveToken";

type PageContextType = {
    showSidebar: boolean;
    setShowSidebar: () => void;
    showFilterSidebar: boolean;
    setShowFilterSidebar: () => void;
    showLoginModal: boolean;
    setShowLoginModal: () => void;
    token: string | null;
    setToken: (token: string) => void;
    removeToken: () => void;
    isLogged: boolean;
    setIsLogged: (logged: boolean) => void;
}

const PageContext = createContext<PageContextType>({
    showSidebar: false,
    setShowSidebar: () => { },
    showFilterSidebar: false,
    setShowFilterSidebar: () => { },
    showLoginModal: false,
    setShowLoginModal: () => { },
    token: null,
    setToken: () => { },
    removeToken: () => { },
    isLogged: false,
    setIsLogged: () => { }
});

const PageContextProvider: React.FC<{ children: ReactNode }> = (props) => {
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [showFilterSidebar, setShowFilterSidebar] = useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    const toggleSidebar = () => {
        setShowSidebar((prev) => !prev);
    };

    const toggleFilterSidebar = () => {
        setShowFilterSidebar((prev) => !prev);
    }

    const toggleLoginModal = () => {
        setShowLoginModal((prev) => !prev);
    }

    const setTokenHandler = (token: string) => {
        saveToken(token);
        setToken(token);
    }

    const removeTokenHandler = () => {
        removeToken();
        setIsLogged(false);
        setToken(null);
    }

    const contextValue: PageContextType = {
        showSidebar,
        setShowSidebar: toggleSidebar,
        showFilterSidebar,
        setShowFilterSidebar: toggleFilterSidebar,
        showLoginModal,
        setShowLoginModal: toggleLoginModal,
        token,
        setToken: setTokenHandler,
        removeToken: removeTokenHandler,
        isLogged,
        setIsLogged
    };

    useEffect(() => {
        const token = getToken();
        if (token && !isTokenExpired(token)) {
            setToken(token);
            setIsLogged(true);
        } else {
            removeTokenHandler();
            setIsLogged(false);
        }
    }, []);

    return (
        <PageContext.Provider value={contextValue}>
            {props.children}
        </PageContext.Provider>
    );
}

export { PageContext };
export default PageContextProvider;