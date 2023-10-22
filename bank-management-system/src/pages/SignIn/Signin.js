import React, { useEffect, useState } from "react";
import st from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { validation } from "../../services/FormValidations";
import SweetAlert from "../../services/SweetAlert";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../store/actions/AuthActions";
import Button from "../../components/ButtonComp/Button";

function Signin() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const[logiCredentials,setLoginCredentials]=useState('');
  const [formErrors, setFormErrors] = useState({});

  const userdata = useSelector((state) => state.auth.users);
  // console.log(userdata);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    setLoginCredentials(userdata)
  },[userdata])
// console.log(userdata);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const submitLoginDetails = (e) => {
    e.preventDefault();
    setFormErrors(validation(loginDetails));
    const credentials = (logiCredentials || []).find(
      (user) =>
        user.email === loginDetails.email &&
        user.password === loginDetails.password
    );
    console.log(credentials);
    if (credentials) {
      dispatch(loginAction(credentials));
      SweetAlert("success", "Login Successfully");
      setLoginDetails('')
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      SweetAlert("error", "wrong credentials");
    }
  };
  return (
    <div className={st.login_container}>
      
      <form className={st.signup_form} onSubmit={submitLoginDetails}>
        <div className={st.form_header}>
          <h1>Login</h1>
        </div>
        <div className={st.form_body}>
          <div className={st.input_group}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={loginDetails.email}
              placeholder="Enter email"
              onChange={handleInputChange}
            />
            <span className={st.field_error}>{formErrors.email}</span>
          </div>
          <div className={st.input_group}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginDetails.password}
              placeholder="Enter password"
              onChange={handleInputChange}
            />
            <span className={st.field_error}>{formErrors.password}</span>
          </div>
          <p className={st.ft_pwd}>Forget password</p>
        </div>
        <div className={st.form_footer}>
          {/* <button className={st.submit_btn}>Submit</button> */}
          <Button text="Submit" className={st.submit_btn} />
        </div>
        <div className={st.not}>
          Not a member?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ fontWeight: "500" }}
          >
            Register
          </span>
        </div>
      </form>
      {/* </>
      )} */}
    </div>
  );
}

export default Signin;
