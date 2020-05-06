import React, { useState } from "react";
import {
  employmentHoursEnum,
  employmentStatusEnum,
  attributes,
} from "../constants";

export const EditableBulletin = ({ before, onSaveEdit, onRemove, isNew }) => {
  const [editing, setEditing] = useState(false);
  const [edits, setEdits] = useState(null);

  const startEdit = () => {
    setEdits(
      isNew
        ? {
            filters: {
              employmentHours: [],
              employmentStatus: [],
            },
          }
        : before
    );
    setEditing(true);
  };

  const toggleAttribute = (filter) => {
    setEdits((e) => {
      let change = "UNSPECIFIED";
      if (e.filters[filter] === "YES") {
        change = "NO";
      } else if (e.filters[filter] === "NO") {
        change = "UNSPECIFIED";
      } else {
        change = "YES";
      }
      return {
        ...e,
        filters: {
          ...e.filters,
          [filter]: change,
        },
      };
    });
  };
  const toggleEnumFilter = (filterEnum, filter) => {
    setEdits((e) => {
      // console.log(e);
      // console.log(filterEnum);
      const newFilterEnum = [...e.filters[filterEnum]];
      const filterIndex = newFilterEnum.indexOf(filter);
      if (filterIndex > -1) {
        newFilterEnum.splice(filterIndex, 1);
      } else {
        newFilterEnum.push(filter);
      }
      // console.log([...newFilterEnum]);

      /* console.log({
          ...e,
          filters: {
            ...e.filters,
            [filterEnum]: [...newFilterEnum],
          },
        }); */
      return {
        ...e,
        filters: {
          ...e.filters,
          [filterEnum]: [...newFilterEnum],
        },
      };
    });
  };

  const setEdit = (filter, value) => {
    setEdits((e) => ({
      ...e,
      filters: {
        ...e.filters,
        [filter]: value,
      },
    }));
  };
  const stopEdit = () => {
    setEdits({});
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={stopEdit}></div>
        <div className="modal-content">
          <div className="box">
            <h1 className="title">
              {isNew ? "Create a new" : "Edit this"} bulletin
            </h1>
            <div className="columns is-multiline is-mobile">
              <div className="column is-12">
                <div className="field">
                  <label className="label">Title</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input title is-6"
                      value={edits.title}
                      placeholder="Title"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setEdits((e) => ({ ...e, title: newValue }));
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={edits.description}
                      placeholder="Description here"
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setEdits((e) => ({ ...e, description: newValue }));
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Website</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={edits.website}
                      placeholder="Put a valid URL here."
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setEdits((e) => ({ ...e, website: newValue }));
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Filters</label>
                </div>
                <div className="field is-horizontal">
                  <label className="label field-label is-small">Age</label>
                  <div className="field-body">
                    <div className="field has-addons">
                      <div className="control">
                        <input
                          type="text"
                          className="input is-small"
                          value={edits.filters.minAge || ""}
                          placeholder="minimum age"
                          onChange={(e) => {
                            const newValue =
                              e.target.value === ""
                                ? null
                                : isNaN(+e.target.value)
                                ? null
                                : +e.target.value;
                            setEdit("minAge", newValue);
                          }}
                        />
                      </div>
                      <button className="button is-static is-small">to</button>
                      <div className="control">
                        <input
                          type="text"
                          className="input is-small"
                          value={edits.filters.maxAge || ""}
                          placeholder="maximum age"
                          onChange={(e) => {
                            const newValue =
                              e.target.value === ""
                                ? null
                                : isNaN(+e.target.value)
                                ? null
                                : +e.target.value;
                            setEdit("maxAge", newValue);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <label className="label field-label is-small">
                    Attributes
                  </label>
                  <div className="field-body">
                    <div className="buttons">
                      {attributes.map(({ display, value }) => {
                        return (
                          <button
                            className={`button is-small is-rounded is-light ${
                              edits.filters[value] === "YES"
                                ? "is-success"
                                : edits.filters[value] === "NO"
                                ? "is-danger"
                                : ""
                            }`}
                            onClick={() => {
                              toggleAttribute(value);
                            }}
                          >
                            {display}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <label className="label field-label is-small">
                    Job hours
                  </label>
                  <div className="field-body">
                    <div className="buttons">
                      {employmentHoursEnum.map(({ display, value }) => {
                        if (!value) {
                          return null;
                        }
                        return (
                          <button
                            className={`button is-small is-rounded ${
                              edits.filters.employmentHours.indexOf(value) > -1
                                ? "is-success"
                                : ""
                            }`}
                            onClick={() => {
                              toggleEnumFilter("employmentHours", value);
                            }}
                          >
                            {display}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <label className="label field-label is-small">
                    Job status
                  </label>
                  <div className="field-body">
                    <div className="buttons">
                      {employmentStatusEnum.map(({ display, value }) => {
                        if (!value) {
                          return null;
                        }
                        return (
                          <button
                            className={`button is-small is-rounded ${
                              edits.filters.employmentStatus.indexOf(value) > -1
                                ? "is-success"
                                : ""
                            }`}
                            onClick={() => {
                              toggleEnumFilter("employmentStatus", value);
                            }}
                          >
                            {display}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <label className="label field-label is-small">Income</label>
                  <div className="field-body">
                    <div className="field has-addons">
                      <button className="button is-static is-small">$</button>
                      <div className="control">
                        <input
                          type="text"
                          className="input is-small"
                          value={edits.filters.minIncome || ""}
                          placeholder="minimum income"
                          onChange={(e) => {
                            const newValue =
                              e.target.value === ""
                                ? null
                                : isNaN(+e.target.value)
                                ? null
                                : +e.target.value;
                            setEdit("minIncome", newValue);
                          }}
                        />
                      </div>
                      <button className="button is-static is-small">
                        to $
                      </button>
                      <div className="control">
                        <input
                          type="text"
                          className="input is-small"
                          value={edits.filters.maxIncome || ""}
                          placeholder="maximum income"
                          onChange={(e) => {
                            const newValue =
                              e.target.value === ""
                                ? null
                                : isNaN(+e.target.value)
                                ? null
                                : +e.target.value;
                            setEdit("maxIncome", newValue);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6">
                <button
                  className="button is-fullwidth is-success is-light"
                  onClick={() => {
                    onSaveEdit({ id: before ? before._id : null, ...edits });
                  }}
                >
                  Save
                </button>
              </div>
              <div className="column is-6">
                <button
                  className="button is-fullwidth is-light"
                  onClick={stopEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <button className="modal-close is-large" onClick={stopEdit}></button>
      </div>
    );
  }
  if (isNew) {
    return (
      <div className="button is-fullwidth is-success" onClick={startEdit}>
        Add a bulletin
      </div>
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
const Bulletin = ({ before }) => {
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

export default Bulletin;
