import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./pages/Header/Header";
import Home from "./pages/Home/Home";
import Signin from "./pages/SignIn/Signin";
import Singup from "./pages/Signup/Singup";
import Logout from "./pages/Logout/Logout";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Navbar from "./components/Navbar/Navbar";
import Loan from "./pages/Loan/Loan";
import Deposite from "./pages/Deposite/Deposite";
import { useSelector } from "react-redux";
import { useState } from "react";
import LoanForm from "./pages/Loan/LoanForm";
import CalculateLoanEmi from "./pages/Loan/CalculateLoanEmi";
import Footer from "./components/Footer/Footer";

function App() {
  const [hideNavItem, setHideNavItem] = useState(false);

  const user = useSelector((state) => state.user);
  // console.log(user);
  return (
    <div className="">
      <Navbar />
      <div
      // style={{margin:"2rem 5rem",justifyContent:"center",backgroundColor:'yellow'}}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loan" element={<Loan />}>
            <Route path="apply_loan" element={<LoanForm />} />
            <Route path="calculate_loan" element={<CalculateLoanEmi />} />
          </Route>
          <Route path="/deposite" element={<Deposite />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Singup />} />
          {/* <Route path="/logout" element={<Logout />} /> */}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
