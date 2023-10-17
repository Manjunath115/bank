import React, { useState } from "react";
import st from "./style.module.css";
import { FaRupeeSign } from "react-icons/fa";

const CalculateLoanEmi = () => {
  const [principal, setPrincipal] = useState(0);
  const [annualInterestRate, setAnnualInterestRate] = useState(0);
  const [tenureYears, setTenureYears] = useState(0);

  const [emiAmount, setEmiAmount] = useState(0);
  const [totalItrAmount, setTotalItrAmount] = useState(0);
  const [totalLoanAmount, setTotalLoanAount] = useState(0);

  // calculate the monthly interest rate

  const calculateEmi = () => {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    // console.log(monthlyInterestRate);
    const numberOfMonths = tenureYears * 12;
    // console.log(numberOfMonths);

    // calculate the emi
    const emiValue =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
      (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
    // console.log(emiValue.toFixed(2));

    setEmiAmount(emiValue.toFixed(2));
    const totalAmountPaid=emiValue*numberOfMonths;
    setTotalLoanAount(totalAmountPaid.toFixed(2));
    
    //calculate the total interest paid
    const totalInterestPaid=totalAmountPaid-principal
    setTotalItrAmount(totalInterestPaid.toFixed(2));
  };
  return (
    <div className={st.sub_navlinks}>
      <div className={st.loan_calculator}>
        <div className={st.inputs_div}>
          <h2>Loan Calculator</h2>
          <form>
            <div className={st.input_group}>
              <div className={st.lable_calculator}>Principle Amount</div>
              <input
                type="number"
                className={st.p_amount}
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </div>
            <div className={st.input_group}>
              <div className={st.lable_calculator}>Rate of Interest</div>
              <input
                type="number"
                value={annualInterestRate}
                onChange={(e) => setAnnualInterestRate(e.target.value)}
                className={st.interest_rate}
              />
            </div>
            <div className={st.input_group}>
              <div className={st.lable_calculator}>Tenure (in years)</div>
              <input
                type="number"
                className={st.tenure}
                value={tenureYears}
                onChange={(e) => setTenureYears(e.target.value)}
              />
            </div>
          </form>
        </div>
        {/* loan result div */}
        <div className={st.loan_result}>
          <div className={st.left_div}>
            <div className={st.res_header}>
              <h3>Loan EMI Amount</h3>
              <div className={st.res_val}>
                {" "}
                <FaRupeeSign />{emiAmount}
              </div>
            </div>
            <div className={st.total_int}>
              <h3>Total Interest Amount Payble</h3>
              <div className={st.res_val}>
                <FaRupeeSign />{totalItrAmount}
              </div>
            </div>
            <div className={st.total_amt}>
              <h3>Total Loan Amount</h3>
              <div className={st.res_val}>
                {" "}
                <FaRupeeSign />{totalLoanAmount}
              </div>
            </div>
            <button className={st.cal_btn} onClick={calculateEmi}>Calculate</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateLoanEmi;
