import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Landing_Page from "./pages/Landing_Page";
import PageProvider from "./context/pageContext";
import Subscription_Box from "./components/footer/Subscription_Box";
import { queryClient } from "../utils/queryClient";
import { productsAndReviewsLoader } from "../utils/http";
import Products_Page from "./pages/Products_Page";
import Error_Page from "./pages/Error_Page";
import Product_Detail_Page from "./pages/Product_Detail_Page";
import Cart_Page from "./pages/Cart_Page";
import Brands_Page from "./pages/Brands_page";

const Layout = ({ children }: { children: React.ReactNode }) => (
    <>
        <Navbar />
        {children}
        <Subscription_Box />
        <div className="bg-[#f2f0f1] container mx-auto sm:px-12 pt-2">
            <Footer />
        </div>
    </>
);

// Create router with routes
const router = createBrowserRouter([
    {
        path: "/",
        index: true,
        element: (
            <Layout>
                <Landing_Page />
            </Layout>
        ),
        loader: productsAndReviewsLoader,
        errorElement: (
            <Layout>
                <Error_Page />
            </Layout>
        ),
    },
    {
        path: "/Shop",
        errorElement: (
            <Layout>
                <Error_Page />
            </Layout>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/Shop/All" />,
            },
            {
                path: ":Category",
                element: (
                    <Layout>
                        <Products_Page />
                    </Layout>
                ),
            },
            {
                path: ":Category/:productID",
                element: (
                    <Layout>
                        <Product_Detail_Page />
                    </Layout>
                ),
            },
        ],
    },
    {
        path: "/cart",
        errorElement: (
            <Layout>
                <Error_Page />
            </Layout>
        ),
        element: (
            <Layout>
                <Cart_Page />
            </Layout>
        ),
    },
    {
        path: "/onSale",
        errorElement: (
            <Layout>
                <Error_Page />
            </Layout>
        ),
        element: (
            <Layout>
                <Products_Page presetCategory="all" />
            </Layout>
        ),
    },
    {
        path: "/newArrivals",
        errorElement: (
            <Layout>
                <Error_Page />
            </Layout>
        ),
        element: (
            <Layout>
                <Products_Page presetCategory="all" />
            </Layout>
        ),
    },
    {
        path: "/brands",
        errorElement: (
            <Layout>
                <Error_Page />
            </Layout>
        ),
        children: [
            {
                index: true,
                element: (
                    <Layout>
                        <Brands_Page />
                    </Layout>
                ),
            },
            {
                path: ":brandName",
                element: (
                    <Layout>
                        <Products_Page isBrand={true} />
                    </Layout>
                ),
            },
        ],
    },
]);

function App() {
    return (
        <PageProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </PageProvider>
    );
}

export default App;
