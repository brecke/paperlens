/* eslint-disable unicorn/filename-case */
import { useEffect } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

import SearchForm from "./search-view";
import SkillForm from "./skill-view";
import Dashboard from "./dashboard-view";

const style = { display: "flex", gap: "8px", padding: "8px" };

function App() {
  /**
   * During development we can still access the base path at `/`
   * And this hook will make sure that we land on the base `/app`
   * path which will mount our App as usual.
   * In production, Phoenix makes sure that the `/app` route is
   * always mounted within the first request.
   */
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.replace("/app");
    }
  }, []);

  return (
    <BrowserRouter basename="app">
      <nav style={style}>
        <Link to="/">Homepage</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/search">Search</Link>
        <Link to="/settings">Settings</Link>
        <br />
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/search" element={<SearchView />} />
				<Route path="/publication/:id" element={<PublicationView />} />
        <Route path="settings" element={<SettingsView />} />
      </Routes>
    </BrowserRouter>
  );
}

function SettingsView() {
  return (
    <div className="container mx-auto">
      <h1>Settings page</h1>
    </div>
  );
}

function HomePage() {
  const style = { class: "container mx-auto", padding: "8px" };
  return (
    <div style={style}>
      <h1>Homepage</h1>
    </div>
  );
}

function DashboardView() {
  const style = { class: "container mx-auto", padding: "8px" };
  return (
    <div style={style}>
      <Dashboard />
    </div>
  );
}
function SearchView() {
  const style = { class: "container mx-auto", padding: "8px" };
  return (
    <div style={style}>
			<SearchForm />
    </div>
  );
}

function PublicationView() {
  const style = { class: "container mx-auto", padding: "8px" };
  return (
    <div style={style}>
			 <SkillForm />
    </div>
  );
}

export default App;
