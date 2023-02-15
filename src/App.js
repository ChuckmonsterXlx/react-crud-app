import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import "./App.css";
import Dashboard from "./pages/Dashboard.tsx";
import { useAppSelector, useAppDispatch } from './hooks/redux/index.ts'
import { setNotes } from './redux/slices/notes/index.ts'; 

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((res) => res.json())
      .then((res) => {
        dispatch(setNotes(res));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
