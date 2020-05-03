import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ORG_SIGNUP } from "../queries";

const OrgSignup = ({ history }) => {
  const [orgSignup] = useMutation(ORG_SIGNUP);
  const [nameInput, setNameInput] = useState("");
  const [handleInput, setHandleInput] = useState("");
  const [passInput, setPassInput] = useState("");
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-4">
              <div className="box">
                <h1 className="title">Join as an organization</h1>
                <div className="field">
                  <label htmlFor="">Organization name</label>
                  <div className="control">
                    <input
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      type="text"
                      className="input"
                      placeholder="How people will see you"
                    />
                  </div>
                </div>
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
                    const response = await orgSignup({
                      variables: {
                        name: nameInput,
                        handle: handleInput,
                        pass: passInput,
                      },
                    });
                    console.log(`received ${response}`);
                    if (response.data.orgSignup.token === "Set as cookie") {
                      history.push("/org/me");
                    } else {
                      console.log(`error ${response.data.orgSignup.token}`);
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

export default OrgSignup;
