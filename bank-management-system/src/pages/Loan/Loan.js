import React, { useEffect, useState } from "react";
import st from "./style.module.css";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { SweetAlert2 } from "../../services/SweetAlert";
import Swal from "sweetalert2";

const Loan = () => {
  // const [loanStatus, setLoanStatus] = useState();

  // /* check loan status of user */
  // const applied = useSelector((state) => state.loan.status);
  // useEffect(() => {
  //   console.log(applied);
  //   setLoanStatus(applied);
  // }, [applied]);

  const loanStatusCheck = () => {
    Swal.fire(
      "Already, You have a loan account in this bank",
      "I if you are not recieved amount, It's in process!",
      "warning"
    );
  };

  return (
    <div className={st.loan_page_container}>
      <div className={st.main_page}>
        <div className={st.loan_header}>
          <p>
            Get Loan for your <br /> Business growth or Startup
          </p>
        </div>
        <div className={st.loan_content}>
          <hr />
          <span>What we offer for you</span>
          <p>
            We provide online instant cash loans with quick approval that suit
            your term
          </p>
          <div className={st.loan_types}>
            <div className={st.home_loan}>
              <h5>Home Loan</h5>
              <hr />
              <div className={st.loan_features}>
                <p>. Instant Approval</p>
                <p>. 100% Paperless Process</p>
                <p>. Zero Processing Fee</p>
                <p>. Attractive Interest rates</p>
                <p>. Flexible Repayment Tenure</p>
                <p>. Instance Sanction Letter</p>
              </div>
            </div>
            <div className={st.home_loan}>
              <h5>Personal Loan</h5>
              <hr />
              <div className={st.loan_features}>
                <p>. Instant Disbursal</p>
                <p>. 100% Paperless Process</p>
                <p>. No Collateral Required</p>
                <p>. Minimal Documentation</p>
                <p>. Flexible EMI Options</p>
                <p>. Get Loan Amount of Your Choice</p>
              </div>
            </div>
            <div className={st.home_loan}>
              <h5>Educational Loan</h5>
              <hr />
              <div className={st.loan_features}>
                <p>. Amount can go upto Rs.1 crore</p>
                <p>. Parents Should be Joint Borrowers</p>
                <p>. Loan Tenure upto 15 Years</p>
                <p>. Tax Benefits Upto 8 Years</p>
                <p>. Moratorium Period Upto 6 Months</p>
              </div>
            </div>
          </div>
        </div>
        {/* <button className={st.apply_btn}>Apply For a Loan</button> */}
        <nav className={st.btn_nav_links}>
          <NavLink to="/loan/apply_loan">
            <button className={st.apply_btn}>Apply For a Loan</button>
          </NavLink>
          &emsp;&emsp;&emsp;
          <NavLink to="/loan/calculate_loan">
            <button className={st.apply_btn}>Calculate Loan EMI</button>
          </NavLink>
        </nav>
        {/* {loanStatus === true ? (
          loanStatusCheck()
        ) : (
          <>
            <Outlet />
          </>
        )} */}
        <Outlet />
      </div>
    </div>
  );
};

export default Loan;
