import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar'
import Footer from './Components/Footer';
import Home from "./Components/pages/Home"
import Categories from "./Components/pages/Categories"
import About from "./Components/pages/About"  
import Contact from "./Components/pages/Contact"
import AdminDashboard from "./Components/AdminDashboard";
import AddBook from "./Components/AddBook";
import ManageBooks from "./Components/ManageBooks";
import ManageCategories from './Components/ManageCategories';





function App() {
  return (
    <div>
      <Router>
        <NavBar /> 
        <main>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/categories' element={<Categories/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/manage-books" element={<ManageBooks />} />
          <Route path="/manage-categories" element={<ManageCategories/>} />
        </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  )
}

export default App
