import React, { useEffect, useState } from "react";
import st from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { depositeFormValidation } from "../../services/FormValidations";
import { depositeAmount } from "../../store/actions/AccountActions";

const Deposite = () => {
  const [newAmount, setNewAmount] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [viewBalance, setViewBalance] = useState();

  const dispatch = useDispatch();
  const detailsOfUser = useSelector((state) => state.auth.users);
  const username=detailsOfUser.map((user)=>user.firstname);
  const accountType=detailsOfUser.map((user)=>user.ac_type);
  const intBalance = useSelector((state) => state.account.balance);

  const handleAmountChange = (e) => {
    setNewAmount(parseInt(e.target.value),10);
  };
  
  /* handle input error */
  const hadleValidation = () => {
    const errors = {};
    if (!newAmount) {
      errors.newAmount = "amount required";
    } else if (!/^[0-9]*$/.test(newAmount)) {
      errors.newAmount = "postive only";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    const isFormValid = hadleValidation();
    if (isFormValid) {
      dispatch(depositeAmount(newAmount))
      setNewAmount(0);
      console.log("success-----");
    } else {
      console.log("failure------");
    }
  };
  const handleNewBalance = () => {};

  return (
    <div className={st.deposite_container}>
      <div className={st.deposite_page}>
        <div className={st.acc_details}>
          <p>Username: <span className={st.acc_details_span}>{username}</span></p>
          <p>Account Type: <span className={st.acc_details_span}>{accountType}</span> </p>
        </div>
        <div className={st.tot_amount}>
          <p>Available Balance: Rs. {intBalance}/-</p>
          {/* <p>Available Balance: Rs. {detailsOfUser.int_deposite}/-</p> */}
          {/* <button onClick={handleNewBalance}>view balance</button> */}
        </div>
      </div>
      {/* amount deposite form */}
      <div className={st.dp_form}>
        <form className={st.signup_form} onSubmit={clickSubmit}>
          <div className={st.form_header}>
            <h1>Deposite</h1>
          </div>
          <div className={st.form_body}>
            {/* <div className={st.input_group}>
              <label>Account Type</label>
              <input type="text" placeholder="Enter account type" />
            </div> */}
            <div className={st.input_group}>
              <label>Deposite Amount</label>
              <input
                type="number"
                name="newAmount"
                placeholder="Enter amount"
                value={newAmount}
                onChange={handleAmountChange}
              />
              <span className={st.field_error}>{validationErrors.newAmount}</span>
            </div>
          </div>
          <div className={st.form_footer}>
            <button type="submit" className={st.submit_btn}>Submit</button>
          </div>
        </form>
      </div>

      {/* <div style={{ marginTop: "2rem" }}>
        <h4>Demposite</h4>
        <form onSubmit={clickSubmit}>
          <div>
            <label>Amount</label>
            <input
              type="number"
              placeholder="Enter deposite amount"
              value={newAmount}
              onChange={(e) => handleAmountChange(e, setNewAmount)}
            />
            <span>{validationErrors.newAmount}</span>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div> */}
    </div>
  );
};

export default Deposite;
