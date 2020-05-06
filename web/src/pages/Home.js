import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <section className="hero is-large">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered">
              <div className="column is-8">
                <h1 className="title is-1">
                  Never lose track of ways to save.
                </h1>
                <h2 className="subtitle is-3">
                  FundNet keeps everything in one place.
                </h2>
              </div>
              <div className="column">
                <img src="/img/savings.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns box is-vcentered">
            <div className="column">
              <img
                src="/img/browsing.svg"
                alt=""
                style={{ width: "100%", maxHeight: "24em" }}
              />
            </div>
            <div className="column is-6">
              <h1 className="title is-2">What's FundNet?</h1>
              <p className="is-size-4">
                FundNet (short for Fund Network) is a tool designed for{" "}
                <span className="is-emphasized">easing everyone's minds</span>:
                feel better financially with everything in one place. During
                COVID-19, many companies and governments are offering benefits
                and relief measures. FundNet was started with the goal to make
                things as easy as they should be.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h1 className="title">FundNet offers:</h1>
          <div className="columns is-centered has-text-centered is-variable is-8">
            <div className="column is-4">
              <div className="is-fullheight">
                <div className="img-wrapper">
                  <div className="img-frame">
                    <img
                      className="is-square"
                      src="/img/convenience.svg"
                      alt=""
                    />
                  </div>
                </div>
                <h1 className="subtitle is-3">Convenience</h1>
                <h2 className="subtitle">
                  Username and password are all you need. All you need to access
                  FundNet is an internet connection.
                </h2>
              </div>
            </div>
            <div className="column is-4">
              <div className="is-fullheight">
                <div className="img-wrapper">
                  <div className="img-frame">
                    <img className="is-square" src="/img/privacy.svg" alt="" />
                  </div>
                </div>
                <h1 className="subtitle is-3">Privacy</h1>
                <h2 className="subtitle">
                  No required fields. We don't even ask for your name. Any info
                  you give us is used to show relevant content.
                </h2>
              </div>
            </div>
            <div className="column is-4">
              <div className="is-fullheight">
                <div className="img-wrapper">
                  <div className="img-frame">
                    <img
                      className="is-square"
                      src="/img/discovery.svg"
                      alt=""
                    />
                  </div>
                </div>
                <h1 className="subtitle is-3">Discovery</h1>
                <h2 className="subtitle">
                  Learn about new ways to save from verified organizations and
                  fellow users.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="buttons is-centered are-large">
            <Link to="/signup" className="button is-primary">
              Join FundNet
            </Link>
          </div>
        </div>
      </section>
      <section className="section has-background-dark">
        <div className="container">
          <h1 className="title has-text-light">For organizations</h1>
          <div className="columns is-centered has-text-centered is-variable is-8">
            <div className="column is-4">
              <div className="is-fullheight">
                <div className="img-wrapper">
                  <div className="img-frame">
                    <img className="is-square" src="/img/settings.svg" alt="" />
                  </div>
                </div>
                <h1 className="subtitle is-3 has-text-light">Target</h1>
                <h2 className="subtitle has-text-light">
                  Easily target demographics by creating bulletins to promote
                  your campaigns.
                </h2>
              </div>
            </div>
            <div className="column is-4">
              <div className="is-fullheight">
                <div className="img-wrapper">
                  <div className="img-frame">
                    <img className="is-square" src="/img/feedback.svg" alt="" />
                  </div>
                </div>
                <h1 className="subtitle is-3 has-text-light">Track</h1>
                <h2 className="subtitle has-text-light">
                  See how different demographics engage with your bulletins.
                  (soon!)
                </h2>
              </div>
            </div>
            <div className="column is-4">
              <div className="is-fullheight">
                <div className="img-wrapper">
                  <div className="img-frame">
                    <img className="is-square" src="/img/report.svg" alt="" />
                  </div>
                </div>
                <h1 className="subtitle is-3 has-text-light">Grow</h1>
                <h2 className="subtitle has-text-light">
                  FundLink provides analytics and statistics to help you build
                  your organization. (soon!)
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section has-background-dark">
        <div className="container">
          <div className="buttons is-centered are-large">
            <Link to="/org/signup" className="button is-primary is-light">
              Join as an Organization
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
