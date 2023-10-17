import React from "react";
import st from "./style.module.css";
import { FaRegCopyright as CopyRight } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className={st.footer}>
        <p>
          <CopyRight /> SD Bank. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
