import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_BULLETINS, GET_ME } from "../queries";
import Bulletin from "../components/Bulletin";
import { attributes } from "../constants";

const Bulletins = () => {
  const { data } = useQuery(GET_BULLETINS);
  const { data: meData } = useQuery(GET_ME);

  const [filtering, setFiltering] = useState(false);
  const me = meData ? meData.me : {};

  const bulletins = data ? data.bulletins : [];
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-narrow">
              <h1 className="title">Bulletins</h1>
            </div>
            <div className="column is-narrow">
              <button
                className="button is-primary"
                onClick={() => setFiltering((f) => !f)}
              >
                For {filtering ? "everyone" : "me"}
              </button>
            </div>
          </div>
          <div className="columns is-multiline">
            {bulletins.map((bulletin) => {
              if (filtering) {
                if (
                  bulletin.filters.maxAge &&
                  me.minAge &&
                  me.minAge > bulletin.filters.maxAge
                )
                  return null;
                if (
                  bulletin.filters.minAge &&
                  me.maxAge &&
                  me.maxAge < bulletin.filters.minAge
                )
                  return null;
                if (
                  bulletin.filters.maxIncome &&
                  me.income &&
                  me.income > bulletin.filters.maxIncome
                )
                  return null;
                if (
                  bulletin.filters.minIncome &&
                  me.income &&
                  me.income < bulletin.filters.minIncome
                )
                  return null;
                console.log(bulletin.filters);
                for (let i = 0; i < attributes.length; i++) {
                  const value = attributes[i].value;
                  if (bulletin.filters[value] === false && me[value] === true)
                    return null;
                  if (bulletin.filters[value] === true && !me[value])
                    return null;
                }
                if (
                  bulletin.filters.employmentHours.indexOf(
                    me.employmentHours
                  ) === -1 &&
                  bulletin.filters.employmentHours.length &&
                  me.employmentHours
                ) {
                  return null;
                }
                if (
                  bulletin.filters.employmentStatus.indexOf(
                    me.employmentStatus
                  ) === -1 &&
                  bulletin.filters.employmentStatus.length &&
                  me.employmentStatus
                ) {
                  return null;
                }
              }
              return (
                <div className="column is-4" key={bulletin._id}>
                  <Bulletin before={bulletin} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Bulletins;
