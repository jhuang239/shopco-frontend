import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Landing_Page from "./pages/Landing_Page";
import PageProvider from './context/pageContext';
import Subscription_Box from './components/footer/Subscription_Box';
import { queryClient } from '../utils/queryClient';
import { productsAndReviewsLoader } from '../utils/http';
import Products_Page from './pages/Products_Page';
import Error_Page from './pages/Error_Page';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    {children}
    <Subscription_Box />
    <div className="bg-[#f2f0f1] max-w-screen-xl mx-auto sm:px-12 pt-2">
      <Footer />
    </div>
  </>
);

// Create router with routes
const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Layout><Landing_Page /></Layout>,
    loader: productsAndReviewsLoader,
    errorElement: <Layout><Error_Page /></Layout>
  },
  {
    path: "/shop",
    errorElement: <Layout><Error_Page /></Layout>,
    children: [
      {
        index: true,
        element: <Navigate to="/shop/all" />,
      },
      {
        path: ":category",
        element: <Layout><Products_Page /></Layout>,
      },
      {
        path: ":category/:productID",
        element: <Layout><Products_Page /></Layout>,
      }
    ]
  },
  {
    path: "/search/:query",
    element: <Layout><Products_Page /></Layout>,
    errorElement: <Layout><Error_Page /></Layout>,
  }
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
