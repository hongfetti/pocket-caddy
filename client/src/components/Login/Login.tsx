import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations.ts";

import Auth from "../../utils/auth.ts";
import "./Login.css"

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLInputElement;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="card" id="login-card">
      <div className="card-body d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column align-items-center col-12">
          <form className="col-12 d-flex flex-column" onSubmit={handleFormSubmit}>
            <input
              className="form-input"
              placeholder="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              className="form-input"
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
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>

          {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Login;
