import React, { useState } from "react";
import data from "./data/Chapters.json";
import { Route, Routes, Router } from "react-router-dom";
import { MainPage } from "./components/MainPage";
import { NewPage } from "./components/NewPage";
import ChapterContextProvider from "./contexts/ChapterContext";

function App() {
  const [finalData, setFinalData] = useState(data);
  return (
    <ChapterContextProvider>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chapters" element={<NewPage />} />
      </Routes>
    </ChapterContextProvider>
  );
}

export default App;
