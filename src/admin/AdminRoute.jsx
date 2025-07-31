export default function AdminRoute({ children }) {
    const token = localStorage.getItem('admin_token');
    return token ? children : <Navigate to="/admin/login" />;
  }