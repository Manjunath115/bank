import React, { useState } from "react";
import st from "./style.module.css";
import { validation } from "../../services/FormValidations";
import countryData from "../../constants/CountryState.json";
import { useDispatch } from "react-redux";
import { signupAction } from "../../store/actions/AuthActions";
import SweetAlert from "../../services/SweetAlert";
import { NavLink, useNavigate } from "react-router-dom";
import { initialDeposite } from "../../store/actions/AccountActions";
import Swal from "sweetalert2";

const Singup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    country: "",
    // countryId:'',
    // states: [],
    state_name: "",
    phone: "",
    dob: "",
    ac_type: "",
    branch_name: "",
    int_deposite: 0,
    id_proof_type: "",
    id_proof_num: "",
    // age: null,
  });

  const [states, setStates] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [age, setAge] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* hanlde input values */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // calculateAge();
  };

  const handleBirthDate = (e) => {
    // console.log(e.target.value);
    const enteredDate = e.target.value;

    const today = new Date();
    const birthDate = new Date(enteredDate);
    const ageInMilliSeconds = today - birthDate;
    const ageDate = new Date(ageInMilliSeconds);
    const yourAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    // console.log(yourAge);
    setFormData({ ...formData, dob: enteredDate, age: yourAge });
  };
  
  /* get the country name from the json file */
  const handleCountryChange = (e) => {
    const getCountryId = e.target.value;
    const getCountryName = countryData.find(
      (ctname) => ctname.country_id === getCountryId
    );
    // console.log(getCountryName.country_name,'ct name');
    const getStateData = countryData.find(
      (country) => country.country_id === getCountryId
    ).states;
    setFormData({ ...formData, country: getCountryName.country_name });
    setStates(getStateData);
    // setFormData({...formData,country:getCountryName.country_name,states:getStateData});
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    // console.log(stateId);
    setFormData({ ...formData, state_name: stateId });
  };
  // console.log(formData);
  const intialDepositAmountChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value, 10) });
  };

  /* calculate the user age */
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const ageInMilliSeconds = today - birthDate;
    const ageInYears = ageInMilliSeconds / (1000 * 60 * 60 * 24 * 365.25);
    // console.log(ageInYears.toFixed(0));
    return ageInYears.toFixed(0);
  };

  const ageCheckMessage = () => {
    Swal.fire(
      "Sorry! you are not able to register",
      "Because, your age is under 18 (minor age)",
      "warning"
    );
  };

  /* submit form data*/
  const submitFormData = (e) => {
    e.preventDefault();
    const userAge = calculateAge(formData.dob);
    // calculateAge();

    if (userAge <= 18) {
      console.log(userAge);
      ageCheckMessage();
    } else {
      const errors = validation(formData);
      console.log(Object.keys(errors).length);
      setFormErrors(errors);
      if (Object.keys(errors).length === 0) {
        dispatch(signupAction(formData));
        dispatch(initialDeposite(formData.int_deposite));
        SweetAlert("success", "Registration Success");
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      } else {
        SweetAlert("error", "All fields are required");
      }
    }
  };
  // console.log(formData);

  return (
    // <div>
    <section id={st.rg_page}>
      <form
        className={st.signup_form}
        style={{ marginTop: "4rem" }}
        onSubmit={submitFormData}
      >
        <div className={st.form_header}>
          <h1>Registration</h1>
        </div>
        <div className={st.form_body}>
          <div className={st.row}>
            <div className={st.input_group}>
              <label>First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                placeholder="Enter first name"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value.toUpperCase(),
                  })
                }
              />
              <span className={st.field_error}>{formErrors.firstname}</span>
            </div>
            <div className={st.input_group}>
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                name="lastname"
                value={formData.lastname}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [e.target.name]: e.target.value.toUpperCase(),
                  })
                }
              />
              <span className={st.field_error}>{formErrors.lastname}</span>
            </div>
          </div>
          <div className={st.row}>
            <div className={st.input_group}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <span className={st.field_error}>{formErrors.email}</span>
            </div>
            <div className={st.input_group}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span className={st.field_error}>{formErrors.password}</span>
            </div>
          </div>
          <div className={st.row}>
            <div className={st.input_group}>
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              ></textarea>
              <span className={st.field_error}>{formErrors.address}</span>
            </div>
          </div>
          <div className={st.row}>
            <div className={st.input_group}>
              <label>Select Country</label>
              <select name="country" onChange={(e) => handleCountryChange(e)}>
                <option value="">select country</option>
                {countryData.map((country, index) => (
                  <option value={country.country_id} key={index}>
                    {country.country_name.slice(0, 20)}
                  </option>
                ))}
              </select>
              <span className={st.field_error}>{formErrors.country}</span>
            </div>
            <div className={st.input_group}>
              <label>Select State</label>
              <select name="state" onChange={(e) => handleStateChange(e)}>
                <option value="">select state</option>
                {states.map((st, index) => (
                  <option value={st.state_name} key={index}>
                    {st.state_name}
                  </option>
                ))}
              </select>
              <span className={st.field_error}>{formErrors.state_name}</span>
            </div>
          </div>
          <div className={st.row}>
            <div className={st.input_group}>
              <label>Contact.No:</label>
              <input
                type="number"
                maxLength="10"
                placeholder="Enter Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <span className={st.field_error}>{formErrors.phone}</span>
            </div>
            <div className={st.input_group}>
              <label>Date of Birth</label>
              <input
                type="date"
                placeholder="Enter DOB"
                name="dob"
                value={formData.dob}
                // onChange={handleInputChange}
                onChange={handleBirthDate}
              />
              <span className={st.field_error}>{formErrors.dob}</span>
            </div>
          </div>
          <div className={st.acc_row}>
            <div className={st.input_group}>
              <label>AC Type</label>
              <input
                type="text"
                placeholder="Enter account type"
                name="ac_type"
                value={formData.ac_type}
                onChange={handleInputChange}
              />
              <span className={st.field_error}>{formErrors.ac_type}</span>
            </div>
            <div className={st.input_group}>
              <label>Branch name</label>
              <input
                type="text"
                placeholder="Enter branch name"
                name="branch_name"
                value={formData.branch_name}
                onChange={handleInputChange}
              />
              <span className={st.field_error}>{formErrors.branch_name}</span>
            </div>
            <div className={st.input_group}>
              <label>Initial Deposite</label>
              <input
                type="number"
                placeholder="Enter branch name"
                name="int_deposite"
                value={formData.int_deposite}
                onChange={intialDepositAmountChange}
              />
              <span className={st.field_error}>{formErrors.int_deposite}</span>
            </div>
          </div>
          <div className={st.row}>
            <div className={st.input_group}>
              <label>Identification Proof Type</label>
              <input
                type="text"
                placeholder="Enter proof type"
                name="id_proof_type"
                value={formData.id_proof_type}
                onChange={handleInputChange}
              />
              <span className={st.field_error}>{formErrors.id_proof_type}</span>
            </div>
            <div className={st.input_group}>
              <label>Identification Document No.</label>
              <input
                type="text"
                placeholder="Enter document no."
                name="id_proof_num"
                value={formData.id_proof_num}
                onChange={handleInputChange}
              />
              <span className={st.field_error}>{formErrors.id_proof_num}</span>
            </div>
          </div>
        </div>
        <div className={st.form_footer}>
          <button className={st.submit_btn}>Submit</button>
        </div>
        <div className={st.not}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            style={{ fontWeight: "500" }}
          >
            Signin
          </span>
        </div>
      </form>
    </section>
  );
};

export default Singup;

// import React, { useState } from "react";
// import { connect, useDispatch } from "react-redux";
// import st from "./style.module.css";
// import { signupAction } from "../../store/actions/AuthActions";

// const Singup = () => {
//   const [formdata, setFormdata] = useState({
//     firstname:'',
//     lastname:"",
//     email: "",
//     password: "",
//     address:'',
//     country:'',
//     countryId:'',
//     states:[],
//     state_name:'',
//     phone: "",
//     dob: "",
//     ac_type: "",
//     branch_name: "",
//     int_deposite: "",
//     id_proof_type: "",
//     id_proof_num: "",
//   });
//   const [states,setStates]=useState([]);
//   const [formErrors, setFormErrors] = useState({});

//   const handleInputChange = (e) => {
//     setFormdata({ ...formdata, [e.target.name]: e.target.value });
//   };

//   console.log(formdata);
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(signupAction(formdata));
//   };
//   return (
//     <div className={st.signup_container}>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="username"
//           value={formdata.username}
//           placeholder="username"
//           onChange={handleInputChange}
//         />
//         <br />
//         <br />
//         <input
//           type="email"
//           name="email"
//           value={formdata.email}
//           placeholder="enter email"
//           onChange={handleInputChange}
//         />
//         <br />
//         <br />
//         <input
//           type="password"
//           name="password"
//           value={formdata.password}
//           placeholder="enter password"
//           onChange={handleInputChange}
//         />
//         <br />
//         <br />

//         <button>Submit</button>
//       </form>
//     </div>

//   );
// };

// export default Singup;
