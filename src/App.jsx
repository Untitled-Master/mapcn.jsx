import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Pages/docs/navbar";
import Sidebar from "./Pages/docs/sidebar";
import Home from "./Pages/Home";
import Intro from "./Pages/docs/intro";
import UnderWork from "./Pages/UnderWork";
import React from "react";

function DocsLayout({ children, dark, setDark }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar dark={dark} setDark={setDark} />
      <div className="max-w-7xl mx-auto w-full flex flex-1">
        <Sidebar />
        <main className="flex-1 px-6 py-12 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = React.useState(true);

  React.useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/docs"
          element={<DocsLayout dark={dark} setDark={setDark}><Intro /></DocsLayout>}
        />
        <Route
          path="/docs/*"
          element={<DocsLayout dark={dark} setDark={setDark}><UnderWork /></DocsLayout>}
        />
      </Routes>
    </Router>
  );
}
