import { Routes, Route } from 'react-router-dom'
import UserPage from './pages/UserPage/UserPage'
import AdminPage from './pages/adminpage/adminPage';
import { UserProvider } from './userContext/userContext';
import AnalyzePage from './pages/analyzePage/AnalyzePage.tsx';
import UserProfile from './pages/UserProfile/userProfile.tsx';
import CreateCommandPage from './pages/createCommand/CreateCommand.tsx.tsx';
import BigHomePage from './pages/BigHomePage/BigHomePage.tsx.tsx';
import Instructions from './pages/instructions/InstructionPage.tsx';
import WrongWay from './pages/wrong-way/WrongWay.tsx';
import ProtectedRoute from './features/protectedRoute/protectedRoute.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { initAuth } from './redux/reduxSlice/authSlice.ts';
import { AppDispatch } from './redux/store.ts';
import ProtectedBothRoute from './features/protecteBothRoute/protecteBothRoute.tsx';
 
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
 
return <UserProvider>
   <Routes>
        <Route path='/' element={<BigHomePage/>}/>
        <Route path="/login" element={<BigHomePage />} />
        <Route path="/register" element={<BigHomePage />} />
        
        <Route >
          <Route path='/instruction' element={<Instructions/>}/>
        </Route>
    
        <Route element={<ProtectedBothRoute user={user}/>}>
          <Route path='/analyze' element={<AnalyzePage/>} />
          <Route path='/profile' element={<UserProfile/>} /> 
        </Route>

        <Route element={<ProtectedRoute user={user} role="user" />}>
          <Route path="/user" element={<UserPage />} />
        </Route>
       
        <Route element={<ProtectedRoute user={user} role="admin" />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path='/admin/create/command' element={<CreateCommandPage/>} />
        </Route>
       
        <Route path="*" element={<WrongWay />} />
    
    </Routes>
</UserProvider>

}
