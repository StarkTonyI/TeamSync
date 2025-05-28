import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRouteRole = ({ user, role }: { user: any; role: string }) => {
  if (!user) {
    return <Navigate to="/login" />; // Если не залогинен — кидаем на вход
  }

  if (user !== role) {
    return <Navigate to="/" />; // Если роль не совпадает — кидаем на главную
  }

  return <Outlet />; // Показываем запрошенную страницу
};

import { ReactNode } from "react";
import { useGetUserCommandQuery } from "../../redux/userCommandApi/UserCommandApi";

export const ProtectedRouteCommand = ({ redirectTo = "/admin", children }: { redirectTo?: string; children: ReactNode }) => {
  const location = useLocation();
  const { data:command } = useGetUserCommandQuery({});
  if (command?.commandName) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return children;
};
