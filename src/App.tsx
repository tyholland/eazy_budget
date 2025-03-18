import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Monthly from "./pages/Monthly/Monthly.tsx";
import Yearly from "./pages/Yearly/Yearly.tsx";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb.tsx";
import Create from "./pages/Create/Create.tsx";
import Predict from "./pages/Predict/Predict.tsx";
import History from "./pages/History/History.tsx";
import Header from "./components/Header/Header.tsx";
import Auth0ProviderRedirect from "./components/Auth0ProviderRedirect/Auth0ProviderRedirect.tsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.tsx";
import Login from "./pages/Login/Login.tsx";
import Account from "./pages/Account/Account.tsx";

const App = () => {
  return (
    <Router>
      <Auth0ProviderRedirect>
        <>
          <Header />
          <Breadcrumb />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/overview"
              element={<PrivateRoute component={Home} />}
            />
            <Route
              path="/monthly/:type/:month/:year"
              element={<PrivateRoute component={Monthly} />}
            />
            <Route
              path="/yearly/:type/:year"
              element={<PrivateRoute component={Yearly} />}
            />
            <Route
              path="/create/:type/:month/:year"
              element={<PrivateRoute component={Create} />}
            />
            <Route
              path="/predict"
              element={<PrivateRoute component={Predict} />}
            />
            <Route
              path="/account/history"
              element={<PrivateRoute component={History} />}
            />
            <Route
              path="/account"
              element={<PrivateRoute component={Account} />}
            />
          </Routes>
        </>
      </Auth0ProviderRedirect>
    </Router>
  );
};

export default App;
