import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ORG_ME, CHANGE_BULLETIN, ADD_BULLETIN } from "../queries";
import Bulletin from "../components/Bulletin";

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
          <h1 className="title">Organization dashboard</h1>
          <h2 className="title is-4">My bulletins</h2>
          <div className="columns is-multiline">
            {bulletins.map((bulletin) => (
              <div className="column is-4" key={bulletin._id}>
                <Bulletin before={bulletin} onSaveEdit={editBulletin} />
              </div>
            ))}
            <div className="column is-4">
              <Bulletin onSaveEdit={addNewBulletin} isNew={true} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrgMe;
