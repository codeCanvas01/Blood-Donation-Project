import React, { useState } from "react";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";
import { Typography, Radio, FormControlLabel, Button, TextField } from "@mui/material";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formType === "login") {
      handleLogin(e, email, password, role);
    } else if (formType === "register") {
      handleRegister(
        e,
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        website
      );
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Perform validation
    if (!validateEmail(emailValue)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Typography variant="h3" align="center" gutterBottom>
          {formTitle}
        </Typography>
        <hr />
        <div className="flex mb-3">
          <FormControlLabel
            value="donar"
            control={
              <Radio
                style={{ color: "#D94C2A" }}
                className="form-radio"
                id="donarRadio"
                checked={role === "donar"}
                onChange={(e) => setRole(e.target.value)}
              />
            }
            label="Donar"
          />
          <FormControlLabel
            value="admin"
            control={
              <Radio
                style={{ color: "#D94C2A" }}
                className="form-radio"
                id="adminRadio"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
              />
            }
            label="Admin"
          />
          <FormControlLabel
            value="hospital"
            control={
              <Radio
                style={{ color: "#D94C2A" }}
                className="form-radio"
                id="hospitalRadio"
                checked={role === "hospital"}
                onChange={(e) => setRole(e.target.value)}
              />
            }
            label="Hospital"
          />
          <FormControlLabel
            value="organisation"
            control={
              <Radio
                style={{ color: "#D94C2A" }}
                className="form-radio"
                id="organisationRadio"
                checked={role === "organisation"}
                onChange={(e) => setRole(e.target.value)}
              />
            }
            label="Organisation"
          />
        </div>
        
        {(() =>{
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <div className="flex flex-col justify-center items-center gap-5">
                  <TextField    sx={{ input: { color: 'red' } }}    className="input-field  "
                    label="Email"
                    id="forEmail"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    fullWidth
                    required
                    error={Boolean(emailError)}
                    helperText={emailError}
                  />
                  <TextField  sx={{ input: { color: 'red' } }}  className="input-field"
                    label="Password"
                    id="forPassword"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                  />
                  </div>
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                 <div className="flex flex-col justify-center items-center gap-5">
                  {(role === "admin" || role === "donar") && (
                    <TextField  sx={{ input: { color: 'red' } }} className="input-field"
                      label="Name"
                      id="forName"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      required
                    />
                  )}
                  {role === "organisation" && (
                    <TextField  sx={{ input: { color: 'red' } }} className="input-field"
                      label="Organisation Name"
                      id="forOrganisationName"
                      type="text"
                      name="organisationName"
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                      fullWidth
                      required
                    />
                  )}
                  {role === "hospital" && (
                    <TextField sx={{ input: { color: 'red' } }} className="input-field"
                      label="Hospital Name"
                      id="forHospitalName"
                      type="text"
                      name="hospitalName"
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      fullWidth
                      required
                    />
                  )}

                  <TextField sx={{ input: { color: 'red' } }} className="input-field"
                    label="Email"
                    id="forEmail"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    fullWidth
                    required
                    error={Boolean(emailError)}
                    helperText={emailError}
                  />
                  <TextField sx={{ input: { color: 'red' } }} className="input-field"
                    label="Password"
                    id="forPassword"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                  />
                  <TextField sx={{ input: { color: 'red' } }} className="input-field"
                    label="Website"
                    id="forWebsite"
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    fullWidth
                  />
                  <TextField sx={{ input: { color: 'red' } }} className="input-field"
                    label="Address"
                    id="forAddress"
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    fullWidth
                  />
                  <TextField  sx={{ input: { color: 'red' } }} className="input-field"
                    label="Phone"
                    id="forPhone"
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                  />
                  </div>
                </>
              );
            }
            default:
              return null;
          }
        })()}
        
        <div className="flex flex-col items-center justify-center">
          <Button
            fullWidth
            variant="contained"
            type="submit"
            className="mt-3 mb-2"
            style={{ background: "#D94C2A" }}
          >
            {submitBtn}
          </Button>
          {formType === "login" ? (
            <Typography variant="body1">
              Not registered yet?{" "}
              <Link to="/register" style={{ color: "white" }}>
                Register Here
              </Link>
            </Typography>
          ) : (
            <Typography variant="body1">
              Already have an account?{" "}
              <Link to="/login" style={{ color: "white"}}>
                Login
              </Link>
            </Typography>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
