import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import "./App.css";
import Dashboard from "./pages/Dashboard.tsx";
import { useAppSelector, useAppDispatch } from "./hooks/redux/index.ts";
import { setNotes } from "./redux/slices/notes/index.ts";
import NavBar from "./components/navBar/NavBar";
import Login from "./pages/Login.tsx";

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
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
