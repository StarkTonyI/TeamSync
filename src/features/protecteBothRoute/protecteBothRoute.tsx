import { Navigate, Outlet } from "react-router-dom";

const ProtectedBothRoute = ({ user }: { user: any; }) => {
  if (!user) {
    return <Navigate to="/login" />; // Если не залогинен — кидаем на вход
  }

  return <Outlet />; // Показываем запрошенную страницу
};

export default ProtectedBothRoute;
