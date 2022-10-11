import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen";
import "./App.css";
import Connect from "./components/screens/Connect/Connect";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, setToken } from "./features/tokenSlice";

function App() {
  const [user, setUser] = useState(true);
  const nav = useNavigate();
  const tokenSelector = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch(setToken(token));
    }
  }, [tokenSelector, dispatch]);

  return (
    <div className="App">
      {!tokenSelector ? (
        <Routes>
          <Route path="/" element={<Connect />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
