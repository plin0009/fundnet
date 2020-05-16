import React, { useState } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import { GET_ME, CHANGE_ME, LOGOUT, GET_FORWARD_GEOCODE } from "../queries";
import {
  employmentStatusEnum,
  employmentHoursEnum,
  attributes,
  daysOfWeek,
  timesOfDay,
} from "../constants";
import { radarSecret } from "../config";

const Me = ({ history }) => {
  const { client, loading, error, data } = useQuery(GET_ME);
  console.log(loading, error, data);
  const [changeMe] = useMutation(CHANGE_ME, {
    update: (cache, result) => {
      cache.writeQuery({
        query: GET_ME,
        data: result.data.changeMe,
      });
    },
  });
  const [logout] = useMutation(LOGOUT, {
    update: async () => {
      await client.resetStore();
      history.push("/login");
    },
  });

  const [ageEdits, setAgeEdits] = useState(null);
  const [attributeEdits, setAttributeEdits] = useState(null);

  const [employmentEdits, setEmploymentEdits] = useState(null);
  const [locationSearch, setLocationSearch] = useState("");
  const [suggestedLocation, setSuggestedLocation] = useState(null);
  const [jobFindingEdits, setJobFindingEdits] = useState(null);

  const [currentTab, setCurrentTab] = useState("ACCOUNT");

  if (data && data.me) {
    if (!ageEdits && data.me.minAge) setAgeEdits(data.me.minAge);
    if (!attributeEdits)
      setAttributeEdits(() => {
        const newEdits = {};
        attributes.forEach(({ value }) => {
          newEdits[value] = data.me[value];
        });
        return newEdits;
      });
    if (!employmentEdits)
      setEmploymentEdits(() => ({
        employmentStatus: data.me.employmentStatus,
        employmentHours: data.me.employmentHours,
        income: data.me.income,
      }));
    if (!jobFindingEdits)
      setJobFindingEdits(() => ({
        location: data.me.location,
        availability: data.me.availability,
      }));
  }
  const saveBasicInfo = async () => {
    const changes = JSON.stringify({
      minAge: +ageEdits,
      maxAge: +ageEdits,
      ...attributeEdits,
    });
    const response = await saveChanges(changes);
  };

  const saveEmployment = async () => {
    const changes = JSON.stringify({
      ...employmentEdits,
    });
    console.log(changes);
    const response = await saveChanges(changes);
  };
  const saveJobFinding = async () => {
    const changes = JSON.stringify({
      ...jobFindingEdits,
    });
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

  const forwardGeocode = async (input) => {
    const response = await fetch(
      `https://api.radar.io/v1/geocode/forward?query=${input}`,
      {
        headers: {
          Authorization: radarSecret,
        },
      }
    );
    const { addresses } = await response.json();
    const { latitude, longitude, formattedAddress, confidence } = addresses[0];
    const location = {
      latitude,
      longitude,
      name: formattedAddress,
      confidence,
    };
    setSuggestedLocation(location);
  };
  const chooseSuggestedLocation = () => {
    setJobFindingEdits((e) => ({
      ...e,
      location: {
        coords: [suggestedLocation.latitude, suggestedLocation.longitude],
        name: suggestedLocation.name,
      },
    }));
  };

  return (
    <main>
      <section className="section">
        <div className="container">
          <h1 className="title">Me</h1>
          <div className="columns">
            <div className="column is-4-tablet is-3-desktop">
              <aside className="menu">
                <ul className="menu-list">
                  <li>
                    <a
                      className={currentTab === "ACCOUNT" ? "is-active" : ""}
                      onClick={() => setCurrentTab("ACCOUNT")}
                    >
                      Account settings
                    </a>
                  </li>
                  <li>
                    <a
                      className={currentTab === "BASIC" ? "is-active" : ""}
                      onClick={() => setCurrentTab("BASIC")}
                    >
                      Basic info
                    </a>
                  </li>
                  <li>
                    <a
                      className={currentTab === "EMPLOYMENT" ? "is-active" : ""}
                      onClick={() => setCurrentTab("EMPLOYMENT")}
                    >
                      Employment and income
                    </a>
                  </li>
                  <li>
                    <a
                      className={currentTab === "JOB" ? "is-active" : ""}
                      onClick={() => setCurrentTab("JOB")}
                    >
                      Job finding
                    </a>
                  </li>
                </ul>
              </aside>
            </div>

            <div className="column">
              {currentTab === "ACCOUNT" ? (
                <div className="">
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
                            {(data && data.me && data.me.handle) || ""}
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
                  <div className="field is-horizontal">
                    <label className="label field-label is-normal">
                      Sign out
                    </label>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <button className="button" onClick={logout}>
                            Sign out
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : currentTab === "EMPLOYMENT" ? (
                <div className="">
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
                              const newValue =
                                e.target.value === "Unspecified"
                                  ? null
                                  : e.target.value;
                              setEmploymentEdits((edits) => ({
                                ...edits,
                                employmentStatus: newValue,
                              }));
                            }}
                          >
                            {employmentStatusEnum.map(({ display, value }) => (
                              <option key={value} value={value}>
                                {display}
                              </option>
                            ))}
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
                                  const newValue =
                                    e.target.value === "Unspecified"
                                      ? null
                                      : e.target.value;
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
                              const newValue = e.target.value
                                ? +e.target.value
                                : null;
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
              ) : currentTab === "BASIC" ? (
                <div className="">
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
                                [attribute.value]:
                                  a[attribute.value] === "YES"
                                    ? "NO"
                                    : a[attribute.value] === "NO"
                                    ? "UNSPECIFIED"
                                    : "YES",
                              }));
                            }}
                            className={`button is-rounded ${
                              attributeEdits &&
                              (attributeEdits[attribute.value] === "YES"
                                ? "is-success"
                                : attributeEdits[attribute.value] === "NO"
                                ? "is-danger"
                                : "")
                            }`}
                          >
                            {attribute.display}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : currentTab === "JOB" ? (
                <div className="">
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
                        value={
                          jobFindingEdits && jobFindingEdits.location
                            ? `${jobFindingEdits.location.name} (${jobFindingEdits.location.coords[0]}, ${jobFindingEdits.location.coords[1]})`
                            : null
                        }
                        className="input"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <label className="label">Search Location</label>
                      <div className="field has-addons">
                        <div className="control is-expanded">
                          <input
                            type="text"
                            className="input"
                            // value={data && data.me && data.me.location}
                            value={locationSearch}
                            onChange={(e) => setLocationSearch(e.target.value)}
                            placeholder="e.g. Toronto"
                          />
                          <p className="help">
                            Country or province or city or postal code (first
                            three characters)
                          </p>
                        </div>
                        <div className="control">
                          <button
                            className="button"
                            onClick={() => {
                              console.log("clicked the button");
                              /* forwardGeocode({
                                  variables: {
                                    input: locationSearch,
                                  },
                                }); */
                              forwardGeocode(locationSearch);
                            }}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {suggestedLocation ? (
                    <div className="box">
                      <div className="columns is-mobile">
                        <div className="column">
                          <h1 className="title is-6">
                            {suggestedLocation.name}
                          </h1>
                          <h2 className="subtitle is-7">
                            Latitude: {suggestedLocation.latitude} Longitude:{" "}
                            {suggestedLocation.longitude}
                          </h2>
                        </div>
                        <div className="column is-narrow">
                          <button
                            className="button"
                            onClick={chooseSuggestedLocation}
                          >
                            Set as Location
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <label htmlFor="" className="label">
                    Availability
                  </label>
                  {daysOfWeek.map((day) => (
                    <div className="columns is-mobile is-vcentered">
                      <div className="column is-3 has-text-centered">
                        {day.display}
                      </div>
                      {timesOfDay.map((time) => (
                        <div className="column is-narrow">
                          <button
                            className={`button is-rounded is-small ${
                              jobFindingEdits &&
                              jobFindingEdits.availability &&
                              jobFindingEdits.availability[day.value]
                                ? jobFindingEdits.availability[day.value][
                                    time.value
                                  ] === "YES"
                                  ? "is-success"
                                  : jobFindingEdits.availability[day.value][
                                      time.value
                                    ] === "NO"
                                  ? "is-danger"
                                  : ""
                                : ""
                            }`}
                            onClick={() => {
                              setJobFindingEdits((e) => {
                                console.log(`${day.value} ${time.value}`);
                                let newValue = "YES";
                                if (
                                  e.availability &&
                                  e.availability[day.value] &&
                                  e.availability[day.value][time.value]
                                ) {
                                  if (
                                    e.availability[day.value][time.value] ===
                                    "YES"
                                  )
                                    newValue = "NO";
                                  if (
                                    e.availability[day.value][time.value] ===
                                    "NO"
                                  )
                                    newValue = "UNSPECIFIED";
                                }
                                return {
                                  ...e,
                                  availability: {
                                    ...e.availability,
                                    [day.value]: {
                                      ...((e.availability &&
                                        e.availability[day.value]) ||
                                        null),
                                      [time.value]: newValue,
                                    },
                                  },
                                };
                              });
                            }}
                          >
                            {time.display}
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Me;
