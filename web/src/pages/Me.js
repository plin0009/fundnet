import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ME, CHANGE_ME } from "../queries";
import {
  employmentStatusEnum,
  employmentHoursEnum,
  attributes,
} from "../constants";

const Me = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [changeMe] = useMutation(CHANGE_ME);

  const [ageEdits, setAgeEdits] = useState(null);
  const [attributeEdits, setAttributeEdits] = useState(null);

  const [employmentEdits, setEmploymentEdits] = useState(null);

  if (data) {
    if (!ageEdits && data.me.minAge) setAgeEdits(data.me.minAge);
    if (!attributeEdits)
      setAttributeEdits(() => {
        const newEdits = {};
        attributes.forEach(({ value }) => {
          newEdits[value] = !!data.me[value];
        });
        return newEdits;
      });
    if (!employmentEdits)
      setEmploymentEdits(() => ({
        employmentStatus: data.me.employmentStatus,
        employmentHours: data.me.employmentHours,
        income: data.me.income,
      }));
  }
  const saveBasicInfo = async () => {
    const changes = JSON.stringify({
      minAge: +ageEdits,
      maxAge: +ageEdits,
      ...attributeEdits,
    });
    const response = await saveChanges(changes);
    console.log(response);
  };

  const saveEmployment = async () => {
    const changes = JSON.stringify({
      ...employmentEdits,
    });
    const response = await saveChanges(changes);
    console.log(response);
  };
  const saveJobFinding = async () => {
    const changes = JSON.stringify({});
    const response = await saveChanges(changes);
    console.log(response);
  };
  const saveChanges = async (changes) => {
    return await changeMe({
      variables: {
        changes,
      },
    });
  };
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
                            <p
                              type="text"
                              className="input"
                              // value={data && data.me.handle}
                            >
                              {data ? data.me.handle : ""}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="field is-horizontal">
                      <label className="label field-label is-normal">
                        Password
                      </label>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <button className="button">Change password</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column is-12">
                  <div className="box">
                    <div className="columns is-mobile">
                      <div className="column">
                        <h2 className="subtitle">Employment and income</h2>
                      </div>
                      <div className="column is-narrow">
                        <button
                          className="button is-success"
                          onClick={saveEmployment}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>

                    <div className="columns is-mobile">
                      <div className="column is-6">
                        <div className="field">
                          <label className="label">Employment status</label>
                          <div className="select">
                            <select
                              value={
                                employmentEdits
                                  ? employmentEdits.employmentStatus
                                  : ""
                              }
                              onChange={(e) => {
                                const newValue = e.target.value;
                                setEmploymentEdits((edits) => ({
                                  ...edits,
                                  employmentStatus: newValue,
                                }));
                              }}
                            >
                              {employmentStatusEnum.map(
                                ({ display, value }) => (
                                  <option key={value} value={value}>
                                    {display}
                                  </option>
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
                                  value={
                                    employmentEdits
                                      ? employmentEdits.employmentHours
                                      : ""
                                  }
                                  onChange={(e) => {
                                    const newValue = e.target.value;
                                    setEmploymentEdits((edits) => ({
                                      ...edits,
                                      employmentHours: newValue,
                                    }));
                                  }}
                                >
                                  {employmentHoursEnum.map(
                                    ({ display, value }) => (
                                      <option key={value} value={value}>
                                        {display}
                                      </option>
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
                              value={
                                employmentEdits ? employmentEdits.income : ""
                              }
                              placeholder="An estimate is good enough!"
                              onChange={(e) => {
                                const newValue = +e.target.value;
                                setEmploymentEdits((edits) => ({
                                  ...edits,
                                  income: newValue,
                                }));
                              }}
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
                    <div className="columns is-mobile">
                      <div className="column">
                        <h2 className="subtitle">Basic info</h2>
                      </div>
                      <div className="column is-narrow">
                        <div
                          className="button is-success"
                          onClick={saveBasicInfo}
                        >
                          Save changes
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <label className="label">Age</label>
                        <input
                          type="text"
                          className="input"
                          value={ageEdits}
                          onChange={(e) => setAgeEdits(+e.target.value)}
                          placeholder="e.g. 26"
                        />
                        <p className="help">
                          A number! You don't have to be exact.
                        </p>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <label className="label">Attributes</label>
                        <div className="buttons">
                          {attributes.map((attribute) => (
                            <button
                              key={attribute.value}
                              onClick={() => {
                                setAttributeEdits((a) => ({
                                  ...a,
                                  [attribute.value]: !a[attribute.value],
                                }));
                              }}
                              className={`button is-rounded ${
                                attributeEdits &&
                                attributeEdits[attribute.value]
                                  ? "is-success"
                                  : "is-light"
                              }`}
                            >
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
                    <div className="columns is-mobile">
                      <div className="column">
                        <h2 className="subtitle">Job finding</h2>
                      </div>
                      <div className="column is-narrow">
                        <button
                          className="button is-success"
                          onClick={saveJobFinding}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>

                    <div className="field">
                      <div className="control">
                        <label className="label">Location</label>
                        <input
                          type="text"
                          className="input"
                          value={data && data.me.location}
                          placeholder="e.g. Toronto"
                        />
                        <p className="help">
                          Country or province or city or first three digits of
                          postal code
                        </p>
                      </div>
                    </div>
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
