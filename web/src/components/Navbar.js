import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_ME, GET_ORG_ME } from "../queries";

const Navbar = () => {
  const { data } = useQuery(GET_ME);
  const { data: orgData } = useQuery(GET_ORG_ME);
  const me = (data && data.me) || (orgData && orgData.orgMe) || null;
  const [expanded, setExpanded] = useState(false);
  return (
    <nav className="navbar has-shadow">
      <div className="container">
        <div className="navbar-brand">
          <Link
            to="/"
            style={{
              position: "relative",
              display: "flex",
            }}
          >
            <img
              src="/logo192.png"
              alt=""
              style={{
                maxHeight: "4em",
              }}
            />
            <h1
              className="title is-4"
              style={{ alignSelf: "center", padding: "0 0.5em" }}
            >
              FundNet
            </h1>
          </Link>
          <a
            className={`navbar-burger burger ${expanded ? "is-active" : ""}`}
            onClick={() => setExpanded((e) => !e)}
            role="button"
            aria-label="menu"
            aria-expanded={expanded ? "true" : "false"}
            data-target="navbarMenu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={`navbar-menu ${expanded && "is-active"}`}>
          <div className="navbar-start">
            <Link to="/bulletins" className="navbar-item">
              Bulletins
            </Link>
            <Link to="/jobs" className="navbar-item">
              Job Postings
            </Link>
          </div>
          <div className="navbar-end">
            {me ? (
              <div className="navbar-item">
                <Link
                  to="/me"
                  className="is-flex"
                  style={{ alignItems: "center" }}
                >
                  <div
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "2em",
                      backgroundColor: "#0002",
                    }}
                  ></div>
                  <p style={{ padding: "0 1em" }}>{me.handle}</p>
                </Link>
              </div>
            ) : (
              <div className="buttons" style={{ padding: "0 1em" }}>
                <Link to="/signup" className="button is-primary">
                  Join
                </Link>
                <Link to="/login" className="button is-primary is-light">
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
