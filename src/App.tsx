import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Landing_Page from "./pages/Landing_Page";
import PageProvider from './context/pageContext';
import Subscription_Box from './components/footer/Subscription_Box';
import { queryClient } from '../utils/queryClient';
import { productsLoader } from '../utils/products_loader';

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
    element: <Layout><Landing_Page /></Layout>,
    loader: productsLoader
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
