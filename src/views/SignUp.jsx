import React, { Component } from "react";
// import ReactDOM from 'react-dom';
import Radio from "components/CustomRadio/CustomRadio.jsx";

import {
  Grid,
  Row,
  Col,
  /*  FormGroup,
    ControlLabel,
    FormControl */
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
// import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

// import avatar from "assets/img/faces/face-3.jpg";
//import { response } from 'express';

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => {
      console.log("Valid : " + valid);
      val.length > 0 && (valid = false);
    }
  );

  return valid;
};

const validateCompleteFormFields = (allFormFields) => {
  let isSet = true;
  Object.values(allFormFields).forEach(
    // if we have an error string set valid to false
    (val) => {
      console.log("Is Set : " + val);
      val === false && (isSet = false);
    }
  );

  return isSet;
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      fname: "",
      lname: "",
      eng_email: "",
      idn_email: "",
      password: "",
      confirm_password: "",
      alt_email: "",
      mobile: "",
      quota: "",
      errors: {
        fname: "",
        lname: "",
        eng_email: "",
        idn_email: "",
        password: "",
        confirm_password: "",
        alt_email: "",
        mobile: "",
        quota: "",
      },
      allFormFields: {
        fname: false,
        lname: false,
        eng_email: false,
        idn_email: false,
        password: false,
        confirm_password: false,
        alt_email: false,
        mobile: false,
        quota: false,
      },
      url: "https://webmail.bharatdaak.in/services/createNewUser",
      server_response: "",
      submit_disabled: true,
    };
  }

  handleChange = (event) => {
    // event.preventDefault();
    console.log("handleChange event calling");

    const { name, value } = event.target;
    // let name = event.target.name;
    // let value = event.target.value;
    console.log("Target Event Name is : " + name);
    console.log("Target Event Value is : " + value);

    let errors = this.state.errors;
    let allFormFields = this.state.allFormFields;
    let submit_disabled = this.state.submit_disabled;

    switch (name) {
      case "fname":
        console.log("Validation of fname starts:");
        let fname_length = value.length;
        let fname_regex = /^[A-Za-z]+$/;

        if (fname_length <= 2 || fname_length > 20) {
          console.log("Validation Error:Error in Length of First Name ");
          errors.fname =
            "First Name should have atleast 3 & max 20 characters.";
          allFormFields.fname = false;
          submit_disabled = true;
        } else if (!fname_regex.test(value)) {
          console.log("Invalid characters in First Name ");
          errors.fname = "Invalid characters in First Name";
          allFormFields.fname = false;
          submit_disabled = true;
        } else {
          console.log("Validation Success : First Name");
          errors.fname = "";
          allFormFields.fname = true;
        }
        break;
      case "lname":
        console.log("Validation of lname starts:");
        let lname_length = value.length;
        let lname_regex = /^[A-Za-z]+$/;

        if (lname_length <= 2 || lname_length > 20) {
          console.log("Validation Error:Error in Length of Last Name ");
          errors.lname = "Last Name should have atleast 3 & max 20 characters";
          allFormFields.lname = false;
          submit_disabled = true;
        } else if (!lname_regex.test(value)) {
          console.log("Invalid characters in Last Name ");
          errors.lname = "Invalid characters in Last Name";
          allFormFields.lname = false;
          submit_disabled = true;
        } else {
          console.log("Validation Success : Last Name");
          errors.lname = "";
          allFormFields.lname = true;
        }
        break;
      case "eng_email":
        console.log("Validation of English User Name Starts");
        let eng_email_length = value.length;
        let eng_email_regex = /^[A-Za-z]+$/;

        if (eng_email_length <= 3 || eng_email_length > 20) {
          console.log("Validation Error:Error in english UserName ");
          errors.eng_email =
            "User Name should have atleast 3 and max 20 characters";
          allFormFields.eng_email = false;
          submit_disabled = true;
        } else if (!eng_email_regex.test(value)) {
          console.log("Invalid characters in English User Name ");
          errors.eng_email = "Invalid characters in User Name";
          allFormFields.eng_email = false;
          submit_disabled = true;
        } else {
          console.log("Validation Success : English User Name");
          errors.eng_email = "";
          allFormFields.eng_email = true;
        }
        break;
      case "idn_email":
        console.log("Inside idn_email");
        let length = value.length;
        console.log("Length : " + length);
        if (length < 3) {
          console.log("Validation Error:Error in Hindi UserName ");
          errors.idn_email = "Please Enter valid hindi user name";
          allFormFields.idn_email = false;
          submit_disabled = true;
        } else {
          console.log("Validation Success : Hindi User Name");
          errors.idn_email = "";
          allFormFields.idn_email = true;
          submit_disabled = true;
        }
        break;
      case "password":
        console.clear();
        console.log("Password Value is " + value);
        // this.setState({ password: value });
        let password_length = value.length;
        let password_regex = /^(?=.*[0-9])(?=.*[!@#$])[a-zA-Z0-9!@#$]{6,20}$/;

        if (password_length <= 5 || password_length >= 20) {
          console.log("Validation Error:Error in Password ");
          errors.password = "Password should be 6 to 20 characters";
          allFormFields.password = false;
          submit_disabled = true;
        } else if (!password_regex.test(value)) {
          console.log("Validation Error : Password Check Policy Failed");
          errors.password =
            "Password must contain atleast one small , one capital , one number and special character !@#$";
          allFormFields.password = false;
          submit_disabled = true;
        } else {
          console.log("Validation Success : Password");
          errors.password = "";
          allFormFields.password = true;
        }
        break;
      case "rePassword":
        console.clear();
        let rePassword_length = value.length;
        let rePassword_regex = /^(?=.*[0-9])(?=.*[!@#$])[a-zA-Z0-9!@#$]{6,20}$/;

        if (rePassword_length <= 5 || rePassword_length >= 20) {
          console.log("Validation Error:Error in Confirm Password ");
          errors.confirm_password = "Password should be 6 to 20 characters";
          allFormFields.confirm_password = false;
          submit_disabled = true;
        } else if (!rePassword_regex.test(value)) {
          console.log("Validation Error : Password Check Policy Failed");
          errors.confirm_password =
            "Password must contain atleast one small , one capital , one number and special character !@#$";
          allFormFields.confirm_password = false;
          submit_disabled = true;
        } else if (value !== this.state.password) {
          errors.confirm_password = "Both Passwords does not match";
          allFormFields.confirm_password = false;
          submit_disabled = true;
        } else {
          console.log("Validation Success : Password");
          errors.confirm_password = "";
          allFormFields.confirm_password = true;
        }
        break;
      case "alt_email":
        let alt_email_length = value.length;
        //let alt_email_regex =  /^[A-Za-z0-9]+@[A-Za-z0-9]+.[A-za-z0-9]+$/;
        let alt_email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (alt_email_length < 4 || alt_email_length > 30) {
          console.log("Validation Error:Error in alternate email id length ");
          errors.alt_email = "Email should be 4 to 30 characters";
          allFormFields.alt_email = false;
          submit_disabled = true;
        } else if (!alt_email_regex.test(value)) {
          console.log("Validation Error : Email Check Policy Failed");
          errors.alt_email = "Invalid Email ID";
          allFormFields.alt_email = false;
          submit_disabled = true;
        } else {
          console.log("Validation Success : Alternate Email");
          errors.alt_email = "";
          allFormFields.alt_email = true;
        }
        break;
      case "mobile":
        let mobile_length = value.length;
        //let mobile_regex = /^(?=.*[0-9])(?=.*[!@#$])[a-zA-Z0-9!@#$]{6,20}$/;

        if (mobile_length !== 10) {
          console.log("Validation Error:Error in Mobile Number ");
          errors.mobile = "Mobile should be 10 digits";
          allFormFields.mobile = false;
          submit_disabled = true;
        }
        // else if(!rePassword_regex.test(value)){
        //   console.log("Validation Error : Password Check Policy Failed");
        //   confirmpassword_error_message = <p>Password must contain atleast one small , one capital , one number and special character !@#$</p>
        //   this.setState({confirmpassword_error_message: confirmpassword_error_message});
        //   return false;
        // }
        else if (isNaN(value)) {
          console.log("Validation Error : Is not a number");
          errors.mobile = "Mobile should contain only digits";
          allFormFields.mobile = false;
          submit_disabled = true;
        } else if (value.startsWith("9")) {
          console.log(" Mobile Number ");
          errors.mobile = "";
          allFormFields.mobile = true;
        } else if (value.startsWith("8")) {
          console.log(" Mobile Number ");
          errors.mobile = "";
          allFormFields.mobile = true;
        } else if (value.startsWith("7")) {
          console.log(" Mobile Number ");
          errors.mobile = "";
          allFormFields.mobile = true;
        } else if (value.startsWith("6")) {
          console.log(" Mobile Number ");
          errors.mobile = "";
          allFormFields.mobile = true;
        } else {
          console.log("Validation FAILED : Mobile");
          errors.mobile = "Mobile Number should starts with 6, 7, 8, or 9";
          allFormFields.mobile = false;
          submit_disabled = true;
          // this.setState({ mobile_error_message: mobile_error_message });
          // return false;
        }
        break;
      case "quota":
        console.log("Quota Validation " + value);
        if (
          value === "5242880" ||
          value === "15728640" ||
          value === "26214400" ||
          value === "1048576"
        ) {
          console.log("Allotted Value Selected ");
          errors.quota = "";
          allFormFields.quota = true;
        } else {
          // if (value !== "5242880" && value !== "15728640" && value !== "26214400" && value !== "1048576") {
          console.log("Invalid Value Selected ");
          errors.quota = "Invalid Quota Value !!!";
          allFormFields.quota = false;
          submit_disabled = true;
        }
        break;
      default:
        console.log(`Name ${name} not available`);
        break;
    }

    this.setState(
      {
        errors,
        allFormFields,
        [name]: value,
        submit_disabled: submit_disabled,
      },
      () => {
        console.log(errors);
        console.log(allFormFields);
      }
    );

    if (validateForm(errors) && validateCompleteFormFields(allFormFields)) {
      this.setState({ submit_disabled: false });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //componentWillMount(){
    if (validateForm(this.state.errors)) {
      var formdata = {
        fname: this.state.fname,
        lname: this.state.lname,
        eng_email: this.state.eng_email,
        idn_email: this.state.idn_email,
        password: this.state.password,
        alt_email: this.state.alt_email,
        mobile: this.state.mobile,
        quota: this.state.quota,
      };

      const form = Object.keys(formdata)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(formdata[key])
        )
        .join("&");

      fetch(this.state.url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: form, // data can be `string` or {object}!
      })
        .then((res) => res.json())
        .then(
          (data) => {
            console.log(data);
            this.setState({ server_response: data.message });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            // this.setState({
            //   isLoaded: true,
            //   error
            // });
            this.setState({ server_response: error });
            console.log(error);
          }
        );
      // .catch(err => {
      //     // Catch and display errors
      //     console.log("Error occured" + err);
      //     //this.setState({server_response: err});
      // });
    }
  };

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Create User"
                content={
                  <form onSubmit={this.handleSubmit}>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Company (disabled)",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Company",
                          defaultValue: "State Bank of India",
                          disabled: true,
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "First name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First name",
                          name: "fname",
                          onChange: this.handleChange,
                          //defaultValue: "Mike"
                        },
                        {
                          label: "Last name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          name: "lname",
                          onChange: this.handleChange,
                          //defaultValue: "Andrew"
                        },
                      ]}
                    />
                    <div className="row">
                      <div className="col-md-6">
                        <div className="validation-error">
                          {this.state.errors.fname}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="validation-error">
                          {this.state.errors.lname}
                        </div>
                      </div>
                    </div>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "English Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Eg. user",
                          name: "eng_email",
                          onChange: this.handleChange,
                          //defaultValue: ""
                        },
                        {
                          label: "Hindi Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "उपयोगकर्ता नाम",
                          name: "idn_email",
                          id: "hin_email",
                          onKeyUp: this.handleChange,
                        },
                      ]}
                    />
                    <div className="row">
                      <div className="col-md-6">
                        <div className="validation-error">
                          {this.state.errors.eng_email}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="validation-error">
                          {this.state.errors.idn_email}
                        </div>
                      </div>
                    </div>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Password",
                          type: "password",
                          bsClass: "form-control",
                          placeholder: "Enter Password",
                          name: "password",
                          onChange: this.handleChange,
                          //defaultValue: ""
                        },
                        {
                          label: "Confirm Password",
                          type: "password",
                          bsClass: "form-control",
                          placeholder: "Confirm Password",
                          name: "rePassword",
                          onChange: this.handleChange,
                        },
                      ]}
                    />
                    <div className="row">
                      <div className="col-md-6">
                        <div className="validation-error">
                          {this.state.errors.password}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="validation-error">
                          {this.state.errors.confirm_password}
                        </div>
                      </div>
                    </div>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "Alternate Email-ID",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Alternate Email ID",
                          name: "alt_email",
                          onChange: this.handleChange,
                          //defaultValue: ""
                        },
                        {
                          label: "Mobile Number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Enter Mobile Number",
                          name: "mobile",
                          onChange: this.handleChange,
                        },
                      ]}
                    />
                    <div className="row">
                      <div className="col-md-6">
                        <div className="validation-error">
                          {this.state.errors.alt_email}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="validation-error">
                          {this.state.errors.mobile}
                        </div>
                      </div>
                    </div>

                    <label>Quota</label>

                    <Radio
                      number="1"
                      option="1048576"
                      name="quota"
                      onChange={this.handleChange}
                      checked={this.state.quota === "1048576"}
                      label="1 GB"
                    />
                    <Radio
                      number="2"
                      option="5242880"
                      name="quota"
                      onChange={this.handleChange}
                      checked={this.state.quota === "5242880"}
                      label="5 GB"
                    />
                    <Radio
                      number="3"
                      option="15728640"
                      name="quota"
                      onChange={this.handleChange}
                      checked={this.state.quota === "15728640"}
                      label="15 GB"
                    />
                    <Radio
                      number="4"
                      option="26214400"
                      name="quota"
                      onChange={this.handleChange}
                      checked={this.state.quota === "26214400"}
                      label="25 GB"
                    />
                    <div className="col-md-12">
                      <div className="validation-error">
                        {this.state.errors.quota}
                      </div>
                    </div>
                    <br />

                    <Button
                      bsStyle="info"
                      disabled={this.state.submit_disabled}
                      pullRight
                      fill
                      type="submit"
                    >
                      Create New Profile
                    </Button>
                    <br />
                    <div className="row">
                      <div className="submit-message">
                        {this.state.server_response}
                      </div>
                    </div>

                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default SignUp;
