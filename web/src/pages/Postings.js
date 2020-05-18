import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ME, GET_POSTINGS } from "../queries";
import Tiles from "../components/Tiles";
import Posting from "../components/Posting";
import { daysOfWeek, timesOfDay } from "../constants";

const Postings = () => {
  const { data } = useQuery(GET_POSTINGS);
  const { data: meData } = useQuery(GET_ME);

  const [filtering, setFiltering] = useState(false);
  const me = (meData && meData.me) || null;

  const postings = data ? data.postings : [];
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-narrow">
              <h1 className="title">Postings</h1>
            </div>
            <div className="column is-narrow">
              <button
                className="button is-primary"
                onClick={() => setFiltering((f) => !f)}
                disabled={me === null}
              >
                For {filtering ? "everyone" : "me"}
              </button>
            </div>
          </div>
          <Tiles>
            {[
              ...postings.map((posting) => {
                if (filtering) {
                  console.log(posting.filters);
                  // location filtering
                  // availability filtering
                  let totalCount = 0;
                  let meCount = 0;
                  if (
                    posting.filters.availabilities &&
                    posting.filters.availabilities[0]
                  ) {
                    daysOfWeek.forEach(({ value: day }) => {
                      timesOfDay.forEach(({ value: time }) => {
                        if (
                          posting.filters.availabilities[0][day][time] === "YES"
                        ) {
                          totalCount++;
                          if (me.availability[day][time] !== "NO") {
                            meCount++;
                          }
                        }
                      });
                    });
                    if (totalCount && !meCount) {
                      return null;
                    }
                  }
                }
                return <Posting before={posting} key={posting._id} />;
              }),
            ].filter((i) => i !== null)}
          </Tiles>
        </div>
      </section>
    </main>
  );
};

export default Postings;
