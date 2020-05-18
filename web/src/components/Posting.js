import React, { useState } from "react";
import { daysOfWeek, timesOfDay } from "../constants";

export const EditablePosting = ({ before, onSaveEdit, onRemove, isNew }) => {
  const [editing, setEditing] = useState(false);
  const [edits, setEdits] = useState(null);

  const startEdit = () => {
    setEdits(() => {
      const e = isNew
        ? {
            filters: {
              geofence: {
                coords: [],
                distance: null,
              },
              availabilities: [],
            },
          }
        : before;
      if (!e.filters) {
        e.filters = {
          geofence: {
            coords: [],
            distance: null,
          },
          availabilities: [],
        };
      }
      return e;
    });
    setEditing(true);
  };

  const toggleAvailability = (day, time) => {
    setEdits((e) => {
      let newAvailability = "YES";
      if (
        e.filters.availabilities &&
        e.filters.availabilities[0] &&
        e.filters.availabilities[0][day]
      ) {
        if (e.filters.availabilities[0][day][time] === "YES") {
          newAvailability = "NO";
        } else if (e.filters.availabilities[0][day][time] === "NO") {
          newAvailability = "UNSPECIFIED";
        }
      }
      console.log(JSON.stringify(e.filters));
      const newAvailabilities = [
        {
          ...((e.filters.availabilities && e.filters.availabilities[0]) ||
            null),
          [day]: {
            ...((e.filters.availabilities &&
              e.filters.availabilities[0] &&
              e.filters.availabilities[0][day]) ||
              null),
            [time]: newAvailability,
          },
        },
      ];
      return {
        ...e,
        filters: {
          ...e.filters,
          availabilities: newAvailabilities,
        },
      };
    });
  };
  const setDistance = (distance) => {
    setEdits((e) => ({
      ...e,
      filters: {
        ...e.filters,
        geofence: {
          ...e.filters.geofence,
          distance,
        },
      },
    }));
  };
  const setCoords = (index, value) => {
    setEdits((e) => {
      const newCoords = [...e.filters.geofence.coords];
      newCoords[index] = value;
      return {
        ...e,
        filters: {
          ...e.filters,
          geofence: {
            ...e.filters.geofence,
            coords: newCoords,
          },
        },
      };
    });
  };

  const stopEdit = () => {
    setEditing(false);
    setEdits(null);
  };

  if (editing) {
    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={stopEdit}></div>
        <div className="modal-content">
          <div className="box">
            <h1 className="title">
              {isNew ? "Create a new" : "Edit this"} posting
            </h1>
            <div className="columns is-multiline is-mobile">
              <div className="column is-12">
                <div className="field">
                  <label htmlFor="" className="label">
                    Title
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      className="input title is-6"
                      placeholder="Title"
                      value={edits.title}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setEdits((ed) => ({ ...ed, title: newValue }));
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="" className="label">
                    Description
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Description here"
                      value={edits.description}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setEdits((ed) => ({ ...ed, description: newValue }));
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="" className="label">
                    Website
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Put a valid URL here."
                      value={edits.website}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setEdits((ed) => ({ ...ed, website: newValue }));
                      }}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Filters</label>
                </div>
                <div className="field is-horizontal">
                  <label className="label field-label is-small">Location</label>
                  <div className="field-body">
                    <div className="field has-addons">
                      <button className="button is-static is-small">
                        within
                      </button>
                      <div className="control">
                        <input
                          type="text"
                          className="input is-small"
                          placeholder="distance"
                          value={edits.filters.geofence.distance || ""}
                          onChange={(e) => {
                            const newValue =
                              e.target.value === ""
                                ? null
                                : isNaN(+e.target.value)
                                ? null
                                : +e.target.value;
                            setDistance(newValue);
                          }}
                        />
                      </div>
                      <button className="button is-static is-small">
                        km of
                      </button>
                      <div className="control is-expanded">
                        <input
                          type="text"
                          className="input is-small"
                          placeholder="latitude"
                          value={edits.filters.geofence.coords[0] || ""}
                          onChange={(e) => {
                            const newValue =
                              e.target.value === ""
                                ? null
                                : isNaN(+e.target.value)
                                ? null
                                : +e.target.value;
                            setCoords(0, newValue);
                          }}
                        />
                      </div>
                      <div className="control is-expanded">
                        <input
                          type="text"
                          className="input is-small"
                          placeholder="longitude"
                          value={edits.filters.geofence.coords[1] || ""}
                          onChange={(e) => {
                            const newValue =
                              e.target.value === ""
                                ? null
                                : isNaN(+e.target.value)
                                ? null
                                : +e.target.value;
                            setCoords(1, newValue);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <label className="label field-label is-small">
                    Availability
                  </label>
                  <div className="field-body">
                    <div className="columns is-mobile is-multiline">
                      {daysOfWeek.map((day) => (
                        <div className="column is-12">
                          <div className="columns is-mobile is-vcentered">
                            <div className="column is-3 has-text-centered">
                              {day.display}
                            </div>
                            <div className="column">
                              {timesOfDay.map((time) => (
                                <button
                                  className={`button is-small is-rounded ${
                                    edits.filters.availabilities[0] &&
                                    edits.filters.availabilities[0][day.value]
                                      ? edits.filters.availabilities[0][
                                          day.value
                                        ][time.value] === "YES"
                                        ? "is-success"
                                        : edits.filters.availabilities[0][
                                            day.value
                                          ][time.value] === "NO"
                                        ? "is-danger"
                                        : ""
                                      : ""
                                  }`}
                                  onClick={() =>
                                    toggleAvailability(day.value, time.value)
                                  }
                                >
                                  {time.display}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6">
                <button
                  className="button is-fullwidth is-success"
                  onClick={() => {
                    onSaveEdit({ id: before ? before._id : null, ...edits });
                  }}
                >
                  Save
                </button>
              </div>

              <div className="column is-6">
                <button className="button is-fullwidth" onClick={stopEdit}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isNew) {
    // return button
    return (
      <button className="button is-fullwidth is-success" onClick={startEdit}>
        Add a posting
      </button>
    );
  }

  const { title, description, website } = { ...before, ...edits };
  return (
    <div className="box">
      <div className="columns is-mobile is-multiline">
        <div className="column is-12">
          <h1 className="title is-4">{title}</h1>
          <p>{description}</p>
          {website ? <a href={website}>{website}</a> : null}
        </div>
        <div className="column is-6">
          <button className="button is-fullwidth" onClick={startEdit}>
            Edit
          </button>
        </div>
        <div className="column is-6">
          <button className="button is-fullwidth is-danger" onClick={onRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
const Posting = ({ before }) => {
  const { title, description, website, creator } = { ...before };

  return (
    <div className="box">
      <div className="columns is-mobile is-multiline">
        <div className="column is-12">
          <h1 className="title is-4">{title}</h1>
          <h2 className="subtitle">{creator.name}</h2>
          <p>{description}</p>
          {website ? <a href={website}>{website}</a> : null}
        </div>
      </div>
    </div>
  );
};

export default Posting;
