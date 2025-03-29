import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, role }: { user: any; role: string }) => {
  if (!user) {
    return <Navigate to="/login" />; // Если не залогинен — кидаем на вход
  }

  if (user !== role) {
    return <Navigate to="/" />; // Если роль не совпадает — кидаем на главную
  }

  return <Outlet />; // Показываем запрошенную страницу
};

export default ProtectedRoute;
