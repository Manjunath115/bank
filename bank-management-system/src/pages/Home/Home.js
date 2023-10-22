import React from "react";
import st from "./style.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ButtonComp/Button";

function Home() {

  const navigate=useNavigate();
  const storedata = useSelector((state) => state.products);

  const clickGetStarted=()=>{
    navigate("/signin")
  }
  return (
    <div className={st.home_container}>
      <div className={st.home_page}>
        <h1>Welcome to our site</h1>
        <div className={st.sub_content}>
          <span>Your new banking experience</span>
          <p>Open an account today to unveil digital banking the world loves</p>
        </div>

        {/* <button className={st.started_btn} onClick={clickGetStarted}>Get Started</button> */}
        <Button text="Get Started" clickOnButton={clickGetStarted} className={st.started_btn} />
      </div>
    </div>
  );
}

export default Home;
