import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Attendance from "./pages/Attendance";
import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(true);

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">

        <Sidebar open={open} setOpen={setOpen} />

        <div
          className="transition-all duration-300"
          style={{ marginLeft: open ? 260 : 95 }}
        >

          <Topbar />

          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/attendance" element={<Attendance />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
