import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import "./App.css";
import Dashboard from "./pages/Dashboard.tsx";
import { useAppSelector, useAppDispatch } from "./hooks/redux/index.ts";
import { setNotes } from "./redux/slices/notes/index.ts";
import { setUsers } from "./redux/slices/users/index";
import NavBar from "./components/navBar/NavBar";
import Login from "./pages/Login.tsx";
import SignUpForm from "./pages/SignUp.tsx";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((res) => res.json())
      .then((res) => {
        dispatch(setNotes(res));
      })
      .catch((error) => console.error(error));

    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((res) => {
        dispatch(setUsers(res));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
