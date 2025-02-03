import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Landing_Page from "./pages/Landing_Page";
import PageProvider from './context/pageContext';
import Subscribution_Box from './components/footer/Subscribution_Box';
import { queryClient } from './utils/queryClient';

function App() {
  return (
    <PageProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route index path="/" element={<Landing_Page />} />
          </Routes>
          <Subscribution_Box />
          <div className="bg-[#f2f0f1] max-w-screen-xl mx-auto sm:px-12 pt-2">
            <Footer />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </PageProvider>
  );
}

export default App;
