import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Landing_Page from "./pages/Landing_Page";
import PageProvider from './context/pageContext';
import Subscribution_Box from './components/footer/Subscribution_Box';

function App() {
  return (
    <PageProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing_Page />} />
        </Routes>
        <Subscribution_Box />
        <div className="bg-stone-100 max-w-screen-xl mx-auto sm:px-12 pt-2">
          <Footer />
        </div>
      </Router>
    </PageProvider>
  );
}

export default App;
