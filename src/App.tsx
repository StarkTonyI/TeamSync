import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './userContext/userContext';
import UserProfile from './pages/UserProfile/userProfile.tsx';
import CreateCommandPage from './pages/createCommand/CreateCommand.tsx.tsx';
import BigHomePage from './pages/BigHomePage/BigHomePage.tsx.tsx';
import Instructions from './pages/instructions/InstructionPage.tsx';
import WrongWay from './pages/wrong-way/WrongWay.tsx';
import { ProtectedRouteCommand, ProtectedRouteRole } from './features/protectedRoute/protectedRoute.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { initAuth } from './redux/reduxSlice/authSlice.ts';
import { AppDispatch } from './redux/store.ts';
import ProtectedBothRoute from './features/protecteBothRoute/protecteBothRoute.tsx';
import Dashboard from './updateDesign/updateDesign.tsx';
import UserMainPage from './userUpdateDesign/userUpdateDesign.tsx';
import UpdatedAnalyzPage from './pages/updatedAnalyzePage/AnalyzepageDashboard.tsx';

export default function App() {

    const dispatch = useDispatch<AppDispatch>();
    // @ts-ignore
    const authRole = useSelector((state) => state.auth.role);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
         dispatch(initAuth()).finally(() => setLoading(false));
    }, [dispatch]);

    if (loading) {
        return <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          ⏳ Loading...
        </div>;  // Не рендерим приложение, пока не обновился токен
    }

  const user = JSON.parse(localStorage.getItem("role") || "null") || authRole;
 
return (
  <UserProvider>
    <Routes>
      <Route path="/" element={<BigHomePage />} />
      <Route path="/login" element={<BigHomePage />} />
      <Route path="/register" element={<BigHomePage />} />
      <Route />

      <Route element={<ProtectedBothRoute user={user} />}></Route>

      <Route path="/instruction" element={<Instructions />} />
      <Route path="/analyze" element={<UpdatedAnalyzPage />} />
      <Route path="/profile" element={<UserProfile />} />

      <Route element={<ProtectedRouteRole user={user} role="user" />}>
        <Route path="/user" element={<UserMainPage />} />
      </Route>

      <Route element={<ProtectedRouteRole user={user} role="admin" />}>
        <Route path="/admin" element={<Dashboard />} />

        <Route
          path="/admin/create/command"
          element={
            <ProtectedRouteCommand>
              <CreateCommandPage />
            </ProtectedRouteCommand>
          }
        />
      </Route>

      <Route path="*" element={<WrongWay />} />
    </Routes>
  </UserProvider>
);

}
