import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_ORG_ME,
  CHANGE_BULLETIN,
  ADD_BULLETIN,
  REMOVE_BULLETIN,
} from "../queries";
import { EditableBulletin } from "../components/Bulletin";
import Tiles from "../components/Tiles";

const OrgMe = ({ history }) => {
  const { data } = useQuery(GET_ORG_ME);
  const [changeBulletin] = useMutation(CHANGE_BULLETIN);
  const [addBulletin] = useMutation(ADD_BULLETIN);
  const [removeBulletin, { error }] = useMutation(REMOVE_BULLETIN);
  const { bulletins, name, handle, website } = (data && data.orgMe) || {
    bulletins: [],
    name: "",
    handle: "",
    website: "",
  };
  const addNewBulletin = async ({ title, description, website, filters }) => {
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
          <div className="columns is-multiline">
            <div className="column is-12">
              <h1 className="subtitle is-2 has-text-centered">
                {name ? `Welcome, ${name}!` : "Welcome!"}
              </h1>
            </div>
          </div>
          <div className="tabs is-boxed">
            <ul>
              <li className="is-active">
                <a>Manage bulletins</a>
              </li>
              <li>
                <a>Manage job postings</a>
              </li>
              <li>
                <a>Edit account</a>
              </li>
            </ul>
          </div>
          <h2 className="title is-4">My bulletins</h2>
          <Tiles>
            {[
              ...bulletins.map((bulletin) => (
                <EditableBulletin
                  before={bulletin}
                  onSaveEdit={editBulletin}
                  onRemove={() =>
                    removeBulletin({
                      variables: {
                        id: bulletin._id,
                      },
                    })
                  }
                />
              )),
              <EditableBulletin isNew={true} onSaveEdit={addNewBulletin} />,
            ]}
          </Tiles>
        </div>
      </section>
    </main>
  );
};

export default OrgMe;
