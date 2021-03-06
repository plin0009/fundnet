import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../queries";

const Login = ({ history }) => {
  const [login] = useMutation(LOGIN);
  const [handleInput, setHandleInput] = useState("");
  const [passInput, setPassInput] = useState("");
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-4">
              <div className="box">
                <h1 className="title">Sign in</h1>
                <div className="field">
                  <label htmlFor="">Handle</label>
                  <div className="control">
                    <input
                      value={handleInput}
                      onChange={(e) => setHandleInput(e.target.value)}
                      type="text"
                      className="input"
                      placeholder="Handle"
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="">Password</label>
                  <div className="control">
                    <input
                      value={passInput}
                      onChange={(e) => setPassInput(e.target.value)}
                      type="password"
                      className="input"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <button
                  className="button"
                  onClick={async () => {
                    const response = await login({
                      variables: {
                        handle: handleInput,
                        pass: passInput,
                      },
                    });
                    console.log(`received`);
                    console.log(response);
                    if (response.data.login.token === "Set as cookie") {
                      history.push("/me");
                    } else {
                      console.log(`error ${response.data.login.token}`);
                    }
                  }}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
