import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { SIGNUP } from "../queries";

const Signup = ({ history }) => {
  const [signup] = useMutation(SIGNUP);
  const [handleInput, setHandleInput] = useState("");
  const [passInput, setPassInput] = useState("");
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-4">
              <div className="box">
                <h1 className="title">Join</h1>
                <div className="field">
                  <label htmlFor="">Handle</label>
                  <div className="control">
                    <input
                      value={handleInput}
                      onChange={(e) => setHandleInput(e.target.value)}
                      type="text"
                      className="input"
                      placeholder="You'll use this to sign in"
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
                      placeholder="Enter something secure!"
                    />
                  </div>
                </div>
                <button
                  className="button"
                  onClick={async () => {
                    const response = await signup({
                      variables: {
                        handle: handleInput,
                        pass: passInput,
                      },
                    });
                    console.log(`received ${response}`);
                    if (response.data.signup.token === "Set as cookie") {
                      history.push("/me");
                    } else {
                      console.log(`error ${response.data.signup.token}`);
                    }
                  }}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
