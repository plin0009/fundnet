import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ORG_ME, CHANGE_BULLETIN, ADD_BULLETIN } from "../queries";
import { EditableBulletin } from "../components/Bulletin";

const OrgMe = ({ history }) => {
  const { loading, error, data } = useQuery(GET_ORG_ME);
  const [changeBulletin] = useMutation(CHANGE_BULLETIN);
  const [addBulletin] = useMutation(ADD_BULLETIN);
  const { bulletins, name, handle, website } = (data && data.orgMe) || {
    bulletins: [],
    name: "",
    handle: "",
    website: "",
  };
  console.log(bulletins);
  const addNewBulletin = async ({ title, description, website, filters }) => {
    console.log(`adding bulletin`);
    await addBulletin({
      variables: {
        title,
        description,
        website,
        filters: JSON.stringify(filters),
      },
    });
    history.go();
  };
  const editBulletin = async ({ id, ...changes }) => {
    await changeBulletin({
      variables: { id, changes: JSON.stringify(changes) },
    });
    history.go();
  };
  return (
    <main>
      <section className="section">
        <div className="container">
          <h1 className="title">Organization Dashboard</h1>
          <div className="box">
            <div className="columns">
              <div className="column">
                <h1 className="subtitle is-2 has-text-centered">
                  {name ? `Welcome, ${name}!` : "Welcome!"}
                </h1>
              </div>
            </div>
          </div>
          <h2 className="title is-4">My bulletins</h2>
          <div className="columns is-multiline">
            {bulletins.map((bulletin) => (
              <div className="column is-4" key={bulletin._id}>
                <EditableBulletin before={bulletin} onSaveEdit={editBulletin} />
              </div>
            ))}
            <div className="column is-4">
              <EditableBulletin onSaveEdit={addNewBulletin} isNew={true} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrgMe;
