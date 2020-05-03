import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ME } from "../queries";
import {
  employmentStatusEnum,
  employmentHoursEnum,
  attributes,
} from "../constants";

const Me = () => {
  const { loading, error, data } = useQuery(GET_ME);
  return (
    <main>
      <section className="section">
        <div className="container">
          <h1 className="title">Me</h1>
          <div className="columns">
            <div className="column is-6">
              <div className="columns is-multiline">
                <div className="column is-12">
                  <div className="box">
                    <h2 className="subtitle">Account settings</h2>
                    <div className="field is-horizontal">
                      <label className="label field-label is-normal">
                        Handle
                      </label>
                      <div className="field-body">
                        <div className="field has-addons">
                          <div className="control">
                            <button className="button is-static">@</button>
                          </div>
                          <div className="control is-expanded">
                            <input
                              type="text"
                              className="input"
                              value={data && data.me.handle}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column is-12">
                  <div className="box">
                    <h2 className="subtitle">Employment and income</h2>
                    <div className="columns is-mobile">
                      <div className="column is-6">
                        <div className="field">
                          <label className="label">Employment status</label>
                          <div className="select">
                            <select value={data && data.me.employmentHours}>
                              {employmentStatusEnum.map(
                                ({ display, value }) => (
                                  <option value={value}>{display}</option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="column is-6">
                        <div className="field">
                          <label className="label">Hours of work</label>

                          <div className="field is-expanded">
                            <div className="control is-expanded">
                              <div className="select">
                                <select
                                  value={data && data.me.employmentStatus}
                                >
                                  {employmentHoursEnum.map(
                                    ({ display, value }) => (
                                      <option value={value}>{display}</option>
                                    )
                                  )}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Income estimate</label>

                      <div className="field is-expanded">
                        <div className="field has-addons">
                          <div className="control">
                            <button className="button is-static">$</button>
                          </div>
                          <div className="control is-expanded">
                            <input
                              type="text"
                              className="input"
                              value={data && data.me.employmentIncome}
                              placeholder="You don't have to be exact!"
                            />
                          </div>
                        </div>
                        <p className="help">Annual income before tax. </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column is-6">
              <div className="columns is-multiline">
                <div className="column is-12">
                  <div className="box">
                    <h2 className="subtitle">Basic info</h2>
                    <div className="field">
                      <div className="control">
                        <label className="label">Age</label>
                        <input
                          type="text"
                          className="input"
                          value={data && data.me.minAge}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <label className="label">Attributes</label>
                        <div className="buttons">
                          {attributes.map((attribute) => (
                            <button className="button is-rounded">
                              {attribute.display}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-12">
                  <div className="box">
                    <h2 className="subtitle">Employment and income</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Me;
