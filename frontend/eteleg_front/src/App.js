import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Main from "./routes/main";
import Login from "./routes/login";
import CreateProject from "./routes/createProject";
import Projects from "./routes/projects";
import ProjectDetails from "./routes/projectDetails";
import EditProject from "./routes/projectEdit";
import AddProject from "./routes/addProject";
import StockDashboard from "./routes/stockDashboard";
import AddProduct from "./routes/addProduct";
import AllProducts from "./routes/products";
import EditProduct from "./routes/editProducts";
import Users from "./routes/users";
import EditUser from "./routes/editUser";
import AddUser from "./routes/addUser";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import RoleProtectedRoute from "./utils/RoleProtectedRoute"
import NotAuthorized from "./routes/notAuthorized"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Main />} />
          <Route element={<RoleProtectedRoute allowedRoles={[1]} />}>
            <Route path="/users" element={<Users />} />
            <Route path="/users/edit/:userId" element={<EditUser />} />
            <Route path="/users/add" element={<AddUser />} />
          </Route>
          <Route element={<RoleProtectedRoute allowedRoles={[1, 2]} />}>
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetails />} />
            <Route path="/projects/add" element={<AddProject />} />
            <Route path="/projects/edit/:projectId" element={<EditProject />} />
          </Route>
          <Route element={<RoleProtectedRoute allowedRoles={[1, 3]} />}>
            <Route path="/stock" element={<StockDashboard />} />
            <Route path="/products/create" element={<AddProduct />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/edit/:productId" element={<EditProduct />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
