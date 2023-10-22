import React, { useEffect, useState } from "react";
import st from "./style.module.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  loanFormValidations,
  validation,
} from "../../services/FormValidations";
import { useDispatch, useSelector } from "react-redux";
import SweetAlert from "../../services/SweetAlert";
import { applyLoan } from "../../store/actions/LoanActions";
import Button from "../../components/ButtonComp/Button";

const LoanForm = () => {
  const [loanDetails, setLoanDetails] = useState({
    acc_holder_name: "",
    loanAmount: "",
    loanType: "",
    applyDate: "",
    interestRate: "",
    tenure: "",
    courseFee: "",
    courseName: "",
    fatherName: "",
    fatherOccupation: "",
    annualIncome: "",
    companyName: "",
    designation: "",
    totalExp: "",
    currentExp: "",
  });

  const [inputsHide, setInputsHide] = useState("");
  const [selectedLoanType, setSelectedLoanType] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isLoanTypeSelected, setIsLoanTypeSelected] = useState(false);
  const [loanStatus, setLoanStatus] = useState();

  /* check loan status of user */
  const applied = useSelector((state) => state.loan.status);
  useEffect(() => {
    console.log(applied);
    setLoanStatus(applied);
  }, [applied]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanDetails({ ...loanDetails, [name]: value });
  };
  const handleLoanTypes = (e) => {
    const { name, value } = e.target;
    const getType = value;
    setInputsHide(getType);
    setSelectedLoanType(getType);
    setLoanDetails({ ...loanDetails, [name]: value });
    setIsLoanTypeSelected(true);
  };
  const handleInterestRate = (e) => {
    const rate = e.target.value;
    setLoanDetails({ ...loanDetails, interestRate: rate });
  };

  /* show success message once user submit the loan form */
  const showAlertOnsubmit = () => {
    Swal.fire(
      "Thank you for applying loan",
      "Your details are submited successfuly",
      "success"
    );
  };
  const submitLoanDetails = (e) => {
    e.preventDefault();
    // setFormErrors(validation(loanDetails));
    const errors = loanFormValidations(loanDetails);
    // console.log(errors);
    // console.log(Object.keys(errors).length);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(applyLoan(loanDetails));
      SweetAlert("success", "Registration Success");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      SweetAlert("error", "All fields are required");
    }
  };

  return (
    <div className={st.sub_navlinks}>
      {loanStatus === true ? (
        <div className={st.status_true}>
          <span>You are already applied for a loan.</span>
          <p>
            If you have not yet received the loan amount or any updates, <br /> please contact
            your branch immediatly.
          </p>
        </div>
      ) : (
        <form className={st.signup_form} onSubmit={submitLoanDetails}>
          <div className={st.form_header}>
            <h1>Apply For a Loan</h1>
          </div>
          <div className={st.form_body}>
            {/* <div className={st.row}> */}
            <div className={st.input_group}>
              <label>Name</label>
              <input
                type="text"
                placeholder="name"
                name="acc_holder_name"
                value={loanDetails.acc_holder_name}
                onChange={handleInputChange}
              />
              <span className={st.field_error}>
                {formErrors.acc_holder_name}
              </span>
            </div>
            <div className={st.input_group}>
              <label>Loan Amount</label>
              <input
                type="number"
                placeholder="Enter loan amount"
                name="loanAmount"
                value={loanDetails.loanAmount}
                onChange={handleInputChange}
              />
              <span className={st.field_error}>{formErrors.loanAmount}</span>
            </div>
            <div className={st.input_group}>
              <label>Select Loan Type</label>
              <select
                name="loanType"
                onChange={handleLoanTypes}
                disabled={isLoanTypeSelected}
              >
                <option value="">select loan type</option>
                <option value="Home loan">Home loan</option>
                <option value="Personal loan">Personal loan</option>
                <option value="Education loan">Education loan</option>
              </select>
              <span className={st.field_error}>{formErrors.loanType}</span>
            </div>
            <div className={st.input_group}>
              <label>Interest Rate</label>
              <select name="interestRate" onChange={handleInterestRate}>
                <option>Select Int.rate</option>
                {selectedLoanType === "Home loan" ? (
                  <>
                    <option value="7">7.17%</option>
                    <option value="8">8.60%</option>
                    <option value="9">9.55%</option>
                    <option value="10">10.49%</option>
                  </>
                ) : selectedLoanType === "Personal loan" ? (
                  <>
                    <option value="10">10.25%</option>
                    <option value="12">12.85%</option>
                    <option value="14">14.0%</option>
                    <option value="18">18.25%</option>
                  </>
                ) : selectedLoanType === "Education loan" ? (
                  <>
                    <option value="8">8.15%</option>
                    <option value="10">10.0%</option>
                    <option value="11">11.30%</option>
                    <option value="15">15.0%</option>
                  </>
                ) : (
                  ""
                )}
              </select>
              <span className={st.field_error}>{formErrors.interestRate}</span>
            </div>
            {/* </div> */}
            <div className={st.input_group}>
              <label>Apply Date</label>
              <input
                type="date"
                name=" applyDate"
                value={loanDetails.applyDate}
                onChange={(e) =>
                  setLoanDetails({ ...loanDetails, applyDate: e.target.value })
                }
              />
              <span className={st.field_error}>{formErrors.applyDate}</span>
            </div>

            <div className={st.input_group}>
              <label>Tenure (in years)</label>
              <select
                name="tenure"
                value={loanDetails.tenure}
                onChange={(e) =>
                  setLoanDetails({
                    ...loanDetails,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <option value="">Select Tenure</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>
              <span className={st.field_error}>{formErrors.tenure}</span>
            </div>

            {inputsHide === "Home loan" && (
              <>
                <div className={st.input_group}>
                  <label>Annual Income</label>
                  <input
                    type="number"
                    placeholder="Enter income"
                    name="annualIncome"
                    value={loanDetails.annualIncome}
                    onChange={handleInputChange}
                  />
                  <span className={st.field_error}>
                    {formErrors.annualIncome}
                  </span>
                </div>
                <div className={st.input_group}>
                  <label>Company Name</label>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    name="companyName"
                    value={loanDetails.companyName}
                    onChange={handleInputChange}
                  />
                  <span className={st.field_error}>
                    {formErrors.companyName}
                  </span>
                </div>
                <div className={st.input_group}>
                  <label>Designation</label>
                  <input
                    type="text"
                    placeholder="Enter designation"
                    name="designation"
                    value={loanDetails.designation}
                    onChange={handleInputChange}
                  />
                  <span className={st.field_error}>
                    {formErrors.designation}
                  </span>
                </div>
                <div className={st.input_group}>
                  <label>Total Work Experience</label>
                  <input
                    type="number"
                    placeholder="Enter total experience"
                    name="totalExp"
                    value={loanDetails.totalExp}
                    onChange={handleInputChange}
                  />
                  <span className={st.field_error}>{formErrors.totalExp}</span>
                </div>
                <div className={st.input_group}>
                  <label style={{ fontSize: "16px" }}>
                    Exp. with Current Company
                  </label>
                  <input
                    type="number"
                    placeholder="Enter current experience"
                    name="currentExp"
                    value={loanDetails.currentExp}
                    onChange={handleInputChange}
                  />
                  <span className={st.field_error}>
                    {formErrors.currentExp}
                  </span>
                </div>
              </>
            )}
            {inputsHide === "Personal loan" && (
              <>
                <div className={st.input_group}>
                  <label>Annual Income</label>
                  <input
                    type="number"
                    placeholder="Enter income"
                    name="annualIncome"
                    value={loanDetails.annualIncome}
                    onChange={handleInputChange}
                  />
                  <span className={st.field_error}>
                    {formErrors.annualIncome}
                  </span>
                </div>
                <div className={st.input_group}>
                  <label>Company Name</label>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    name="companyName"
                    value={loanDetails.companyName}
                    onChange={handleInputChange}
                  />
                  <span className={st.field_error}>
                    {formErrors.companyName}
                  </span>
                </div>
                <div className={st.input_group}>
                  <label>Designation</label>
                  <input
                    type="text"
                    placeholder="Enter designation"
                    name="designation"
                    value={loanDetails.designation}
                    onChange={handleInputChange}
                  />
                  <span className={st.field_error}>
                    {formErrors.designation}
                  </span>
                </div>
                <div className={st.input_group}>
                  <label>Total Work Experience</label>
                  <input
                    type="number"
                    placeholder="Enter total experience"
                    name="totalExp"
                    value={loanDetails.totalExp}
                    onChange={handleInputChange}
                  />
                  <span className={st.field_error}>{formErrors.totalExp}</span>
                </div>
                <div className={st.input_group}>
                  <label style={{ fontSize: "16px" }}>
                    Exp. with Current Company
                  </label>
                  <input
                    type="number"
                    placeholder="Enter current experience"
                    name="currentExp"
                    value={loanDetails.currentExp}
                    onChange={handleInputChange}
                  />
                  <span className={st.field_error}>
                    {formErrors.currentExp}
                  </span>
                </div>
              </>
            )}
            {inputsHide === "Education loan" && (
              <>
                <div className={st.input_group}>
                  <label>Course Fee</label>
                  <input
                    type="number"
                    placeholder="Enter fee"
                    name="courseFee"
                    value={loanDetails.courseFee}
                    onChange={handleInputChange}
                    disabled={loanDetails.loanType !== "Education loan"}
                  />
                  <span className={st.field_error}>{formErrors.courseFee}</span>
                </div>
                <div className={st.input_group}>
                  <label>Course</label>
                  <input
                    type="text"
                    placeholder="Enter course name"
                    name="courseName"
                    value={loanDetails.courseName}
                    onChange={handleInputChange}
                    disabled={loanDetails.loanType !== "Education loan"}
                  />
                  <span className={st.field_error}>
                    {formErrors.courseName}
                  </span>
                </div>
                <div className={st.input_group}>
                  <label>Father Name</label>
                  <input
                    type="text"
                    placeholder="Enter father name"
                    name="fatherName"
                    value={loanDetails.fatherName}
                    onChange={handleInputChange}
                    disabled={loanDetails.loanType !== "Education loan"}
                  />
                  <span className={st.field_error}>
                    {formErrors.fatherName}
                  </span>
                </div>
                <div className={st.input_group}>
                  <label>Father Occupation</label>
                  <input
                    type="text"
                    placeholder="Enter occupation"
                    name="fatherOccupation"
                    value={loanDetails.fatherOccupation}
                    onChange={handleInputChange}
                    disabled={loanDetails.loanType !== "Education loan"}
                  />
                  <span className={st.field_error}>
                    {formErrors.fatherOccupation}
                  </span>
                </div>
                <div className={st.input_group}>
                  <label>Annual Income </label>
                  <input
                    type="number"
                    placeholder="Enter income"
                    name="annualIncome"
                    value={loanDetails.annualIncome}
                    onChange={handleInputChange}
                    disabled={loanDetails.loanType !== "Education loan"}
                  />
                  <span className={st.field_error}>
                    {formErrors.annualIncome}
                  </span>
                </div>
              </>
            )}
          </div>
          <div className={st.form_footer}>
            {/* <button type="submit" className={st.submit_btn}>
              Submit
            </button> */}
            <Button text="Submit" className={st.submit_btn} />
          </div>
        </form>
      )}
    </div>
  );
};

export default LoanForm;
