import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./Pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddJob from "./pages/admin/AddJob";
import AllJobs from "./pages/admin/AllJobs";
import EditJob from "./Pages/Admin/EditJob"; 
import AdminRoute from "./components/AdminRoute";
import UserAllJobs from "./User/AllJobs"; 
import JobDetails from "./User/JobDetails";  

function App() {
  return (
 
      <Routes>
       
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-job"
          element={
            <AdminRoute>
              <AddJob />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <AdminRoute>
              <AllJobs />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/edit-job/:id"
          element={
            <AdminRoute>
              <EditJob />
            </AdminRoute>
          }
        />

     
        <Route path="/jobs" element={<UserAllJobs />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
      </Routes>
    
  );
}

export default App;
