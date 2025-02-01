import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Landing_Page from "./pages/Landing_Page";
import PageProvider from './context/pageContext';

function App() {
  return (
    <PageProvider>
      <Router>
        <div className="bg-stone max-w-screen-xl mx-auto p-4 sm:px-12 mb-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing_Page />} />
          </Routes>
        </div>
        <div className="bg-stone-100 max-w-screen-xl mx-auto sm:px-12">
          <Footer />
        </div>
      </Router>
    </PageProvider>
  );
}

export default App;
