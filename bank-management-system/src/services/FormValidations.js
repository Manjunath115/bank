export const validation = (values) => {
  const errors = {};
  const emailFormate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!values.firstname) {
    errors.firstname = "Firstname is required";
  }
  if (!values.lastname) {
    errors.lastname = "Lastname is required";
  }
  /* email validation */
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!emailFormate.test(values.email)) {
    errors.email = "Invalid email";
  }
  /* password validation */
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    console.log(values.password.length);
    errors.password = "Must be morethan 6 chars";
  }

  /* address validation */
  if (!values.address) {
    errors.address = "Address is required";
  } else if (values.address.length < 15) {
    errors.address = "Must be morethan 15 chars";
  }

  /* country validation */
  if (!values.country) {
    errors.country = "Select your country";
  }

  /* state validation */
  if (!values.state_name) {
    errors.state_name = "Select your state";
  }

  /* phone number validation */
  if (!values.phone) {
    errors.phone = "Phone number equired";
  } else if (values.phone.length > 10 || values.phone.length < 10) {
    errors.phone = "Please enter 10 digit valid number";
  }

  /* date of birth validation */
  if (!values.dob) {
    errors.dob = "DOB is required";
  } else {
    const enteredDate = new Date(values.dob);
    const currentDate = new Date();
    if (isNaN(enteredDate.getTime())) {
      errors.dob = "Invalid date formate";
    } else if (enteredDate > currentDate) {
      errors.dob = "DOB can't be feature date";
    }
  }

  /* account type validation */
  if (!values.ac_type) {
    errors.ac_type = "Account type required";
  }

  /* branch name validation */
  if (!values.branch_name) {
    errors.branch_name = "Branch name required";
  }

  /* deposite amount validation */
  if (!values.int_deposite) {
    errors.int_deposite = "Initial deposite required";
  } else if (!/^[0-9]*$/.test(values.int_deposite)) {
    errors.int_deposite = "Enter positive number only";
  }

  /* identificatio proof type */
  if (!values.id_proof_type) {
    errors.id_proof_type = "ID proof required";
  }

  /* identification document number */
  if (!values.id_proof_num) {
    errors.id_proof_num = "Id number required";
  }

  return errors;
};

/* apply loan form validations */

export const loanFormValidations = (values) => {
  const errors = {};

  if (!values.acc_holder_name) {
    errors.acc_holder_name = "Name is required";
  }

  if (!values.loanAmount) {
    errors.loanAmount = "Loan amount Required";
  } else if (!/^[0-9]*$/.test(values.loanAmount)) {
    errors.loanAmount = "Enter positive number only";
  }

  if (!values.loanType) {
    errors.loanType = "Loan type required";
  }

  /* loan type Home */
  if (values.loanType === "Home loan") {
    if (!values.applyDate) {
      errors.applyDate = "Apply date required";
    } else {
      const enteredDate = new Date(values.applyDate);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      if (enteredDate.toDateString() !== currentDate.toDateString()) {
        errors.applyDate = "Select today date only";
      }
    }

    if (!values.interestRate) {
      errors.interestRate = "Interest rate required";
    } else if (!/^[0-9]*$/.test(values.interestRate)) {
      errors.interestRate = "Enter positive number only";
    }

    if (!values.tenure) {
      errors.tenure = "Loan tenure required";
    }
    if (!values.annualIncome) {
      errors.annualIncome = "Annual income required";
    } else if (!/^[0-9]*$/.test(values.annualIncome)) {
      errors.annualIncome = "Enter positive number only";
    }

    if (!values.companyName) {
      errors.companyName = "Company name required";
    }

    if (!values.designation) {
      errors.designation = "Designation required";
    }

    if (!values.totalExp) {
      errors.totalExp = "Total Exps required";
    } else if (!/^[0-9]*$/.test(values.totalExp)) {
      errors.totalExp = "Enter positive number only";
    }

    if (!values.currentExp) {
      errors.currentExp = "Current Exps required";
    } else if (!/^[0-9]*$/.test(values.currentExp)) {
      errors.currentExp = "Enter positive number only";
    }
  }
  /* loan type Personal */
  if (values.loanType === "Personal loan") {
    if (!values.applyDate) {
      errors.applyDate = "Apply date required";
    } else {
      const enteredDate = new Date(values.applyDate);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      if (enteredDate.toDateString() !== currentDate.toDateString()) {
        errors.applyDate = "Select today date only";
      }
    }

    if (!values.interestRate) {
      errors.interestRate = "Interest rate required";
    } else if (!/^[0-9]*$/.test(values.interestRate)) {
      errors.interestRate = "Enter positive number only";
    }

    if (!values.tenure) {
      errors.tenure = "Loan tenure required";
    }

    if (!values.annualIncome) {
      errors.annualIncome = "Annual income required";
    } else if (!/^[0-9]*$/.test(values.annualIncome)) {
      errors.annualIncome = "Enter positive number only";
    }

    if (!values.companyName) {
      errors.companyName = "Company name required";
    }

    if (!values.designation) {
      errors.designation = "Designation required";
    }

    if (!values.totalExp) {
      errors.totalExp = "Total Exps required";
    } else if (!/^[0-9]*$/.test(values.totalExp)) {
      errors.totalExp = "Enter positive number only";
    }

    if (!values.currentExp) {
      errors.currentExp = "Current Exps required";
    } else if (!/^[0-9]*$/.test(values.currentExp)) {
      errors.currentExp = "Enter positive number only";
    }
  }
  /* loan type Education */
  if (values.loanType === "Education loan") {
    if (!values.applyDate) {
      errors.applyDate = "Apply date required";
    } else {
      const enteredDate = new Date(values.applyDate);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      if (enteredDate.toDateString() !== currentDate.toDateString()) {
        errors.applyDate = "Select today date only";
      }
    }

    if (!values.interestRate) {
      errors.interestRate = "Interest rate required";
    } else if (!/^[0-9]*$/.test(values.interestRate)) {
      errors.interestRate = "Enter positive number only";
    }

    if (!values.tenure) {
      errors.tenure = "Loan tenure required";
    }

    if (!values.annualIncome) {
      errors.annualIncome = "Annual income required";
    } else if (!/^[0-9]*$/.test(values.annualIncome)) {
      errors.annualIncome = "Enter positive number only";
    }

    if (!values.courseFee) {
      errors.courseFee = "Cours fee required";
    } else if (!/^[0-9]*$/.test(values.courseFee)) {
      errors.courseFee = "Enter positive number only";
    }

    if (!values.courseName) {
      errors.courseName = "Course name required";
    }

    if (!values.fatherName) {
      errors.fatherName = "Father name required";
    }

    if (!values.fatherOccupation) {
      errors.fatherOccupation = "Occupation required";
    }
  }

  return errors;
};

export const depositeFormValidation = (values) => {
  const errors = {};

  if (!values.newAmount) {
    errors.newAmount = "Amount required";
  } else if (!/^[0-9]*$/.test(values.newAmount)) {
    errors.newAmount = "Positive number only";
  }

  return errors;
};
