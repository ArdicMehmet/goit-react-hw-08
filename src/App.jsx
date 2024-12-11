import "./App.css";
import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectToken } from "./redux/auth/selectors";
import { currentUser } from "./redux/auth/operations";
import { setLoading } from "./redux/auth/slice";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import GeneralRoutes from "./components/GeneralRoutes";

const Login = lazy(() => import("./pages/Login"));
const RegistrationForm = lazy(() => import("./pages/Registration"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Navbar = lazy(() => import("./components/Navbar"));

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (token) {
      dispatch(currentUser(token));
    } else {
      dispatch(setLoading(false));
    }
  }, [token, dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route element={<GeneralRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegistrationForm />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
