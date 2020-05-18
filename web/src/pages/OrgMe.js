import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_ORG_ME,
  CHANGE_BULLETIN,
  ADD_BULLETIN,
  REMOVE_BULLETIN,
  CHANGE_POSTING,
  ADD_POSTING,
  REMOVE_POSTING,
} from "../queries";
import { EditableBulletin } from "../components/Bulletin";
import { EditablePosting } from "../components/Posting";
import Tiles from "../components/Tiles";

const OrgMe = ({ history }) => {
  const { data } = useQuery(GET_ORG_ME);
  const [changeBulletin] = useMutation(CHANGE_BULLETIN);
  const [addBulletin] = useMutation(ADD_BULLETIN);
  const [removeBulletin] = useMutation(REMOVE_BULLETIN);

  const [changePosting] = useMutation(CHANGE_POSTING);
  const [addPosting] = useMutation(ADD_POSTING);
  const [removePosting] = useMutation(REMOVE_POSTING);

  const [tab, setTab] = useState("BULLETINS");

  const { bulletins, postings, name, handle, website } = (data &&
    data.orgMe) || {
    bulletins: [],
    postings: [],
    name: "",
    handle: "",
    website: "",
  };

  console.log(data && data.orgMe);
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

  const addNewPosting = async ({ title, description, website, filters }) => {
    await addPosting({
      variables: {
        title,
        description,
        website,
        filters: JSON.stringify(filters),
      },
    });
    history.go();
  };
  const editPosting = async ({ id, ...changes }) => {
    await changePosting({
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
              <li className={tab === "BULLETINS" ? "is-active" : null}>
                <a role="button" onClick={() => setTab("BULLETINS")}>
                  Manage bulletins
                </a>
              </li>
              <li className={tab === "POSTINGS" ? "is-active" : null}>
                <a role="button" onClick={() => setTab("POSTINGS")}>
                  Manage job postings
                </a>
              </li>
              <li className={tab === "ACCOUNT" ? "is-active" : null}>
                <a role="button" onClick={() => setTab("ACCOUNT")}>
                  Edit account
                </a>
              </li>
            </ul>
          </div>

          {tab === "BULLETINS" ? (
            <div>
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
          ) : tab === "POSTINGS" ? (
            <div>
              <h2 className="title is-4">My postings</h2>
              <Tiles>
                {[
                  ...postings.map((posting) => (
                    <EditablePosting
                      before={posting}
                      onSaveEdit={editPosting}
                      onRemove={() =>
                        removePosting({
                          variables: { id: posting._id },
                        })
                      }
                    />
                  )),
                  <EditablePosting isNew onSaveEdit={addNewPosting} />,
                ]}
              </Tiles>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </section>
    </main>
  );
};

export default OrgMe;
