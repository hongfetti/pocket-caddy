import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../utils/mutations.ts";

import "./Sign-up.css"

import Auth from "../../utils/auth.ts"

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: "", 
    name: "", 
    email: "",
    password: "",
  })
  const [SignUp, { error }] = useMutation(CREATE_USER)
  // update state based on form input changes
  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;
  
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //submit form
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formState);
    try{
      const { data } = await SignUp({
        variables: { input: { ...formState } },
      });

      Auth.login(data.SignUp.token);
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="card" id="login-card">
      <div className="card-body d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column align-items-center col-12">
          <form className="col-12 d-flex flex-column" onSubmit={handleFormSubmit}>
            <input 
              className="signup-form"
              placeholder="Username"
              name="username"
              type="string"
              value={formState.username}
              onChange={handleChange}
            />
            <input 
              className="signup-form"
              placeholder="Name"
              name="name"
              type="string"
              value={formState.name}
              onChange={handleChange}
            />
            <input
              className="signup-form"
              placeholder="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              className="signup-form"
              placeholder="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button
              className="btn btn-block"
              id="login-submit-btn"
              style={{
                cursor: "pointer",
                backgroundColor: "#7669EA",
                color: "white",
              }}
              type="submit"
            >
              Submit
            </button>
          </form>

          <p className="mt-3">
            Already have an account? <Link to="/login">Log In</Link>
          </p>

          {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
        </div>
      </div>
    </div>
  )
}

export default SignUp;