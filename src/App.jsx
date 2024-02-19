import React from "react";
import Header from "./Components/Header";
import ProjectChat from "./Components/ProjectChat";
import MainLayout from "./Components/MainLayout"; 
import './Shared/Styles/Variables.scss';

function App() {
  return (
    <MainLayout>
      <Header />
      <ProjectChat />
    </MainLayout>
  );
}

export default App;
