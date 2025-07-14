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
import PastMonths from "./pages/PastMonths/PastMonths.tsx";
import ShareAccount from "./pages/ShareAccount/ShareAccount.tsx";
// import Pricing from "./pages/Pricing/Pricing.tsx";
import Subscription from "./pages/Subscription/Subscription.tsx";
import Footer from "./views/Footer/Footer.tsx";
import About from "./pages/About/About.tsx";
import Contact from "./pages/Contact/Contact.tsx";
import Privacy from "./pages/Privacy/Privacy.tsx";
import Category from "./pages/Category/Category.tsx";

const App = () => {
  return (
    <Router>
      <Auth0ProviderRedirect>
        <>
          <Header />
          <Breadcrumb />
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/pricing" element={<Pricing />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
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
              path="/add/:type/:month/:year"
              element={<PrivateRoute component={Create} />}
            />
            <Route
              path="/account/predict"
              element={<PrivateRoute component={Predict} />}
            />
            <Route
              path="/account/history"
              element={<PrivateRoute component={History} />}
            />
            <Route
              path="/account/past-months"
              element={<PrivateRoute component={PastMonths} />}
            />
            <Route
              path="/account/share"
              element={<PrivateRoute component={ShareAccount} />}
            />
            <Route
              path="/account/subscription"
              element={<PrivateRoute component={Subscription} />}
            />
            <Route
              path="/account/categories"
              element={<PrivateRoute component={Category} />}
            />
            <Route
              path="/account"
              element={<PrivateRoute component={Account} />}
            />
          </Routes>
          <Footer />
        </>
      </Auth0ProviderRedirect>
    </Router>
  );
};

export default App;
