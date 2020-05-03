import React from "react";

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
                <img src="/savings.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section has-background-dark">
        <div className="container">
          <div className="box">
            <h1 className="title">What's FundNet?</h1>
            <p>
              FundNet (short for Fund Network) is a tool designed for easing
              everyone's minds: feel better financially with everything in one
              place. During COVID-19, many companies and governments are
              offering benefits and relief measures. FundNet was started with
              the goal to make things as easy as they should be.
            </p>
          </div>
        </div>
      </section>
      <section className="section has-background-dark">
        <div className="container">
          <h1 className="title is-4 has-text-light has-text-centered">
            FundNet offers:
          </h1>
          <div className="columns is-centered has-text-centered">
            <div className="column is-4">
              <h1 className="subtitle is-2 has-text-light">Convenience</h1>
              <h2 className="subtitle has-text-light">
                Username and password are all you need. Access FundNet from your
                computer or your phone.
              </h2>
            </div>
            <div className="column is-4">
              <h1 className="subtitle is-2 has-text-light">Privacy</h1>
              <h2 className="subtitle has-text-light">
                No required fields. We don't even ask for your name. Any info
                you give us is used to show relevant content.
              </h2>
            </div>
            <div className="column is-4">
              <h1 className="subtitle is-2 has-text-light">Discovery</h1>
              <h2 className="subtitle has-text-light">
                See new bulletins and job listings by verified organizations and
                fellow users.
              </h2>
            </div>
          </div>
          <div className="buttons is-centered are-medium">
            <button className="button is-light is-primary">Join FundNet</button>
            <button className="button is-light">Sign in</button>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h1 className="title">For organizations</h1>
          <div className="columns is-centered has-text-centered">
            <div className="column is-4">
              <h1 className="subtitle is-2">Target</h1>
              <h2 className="subtitle">
                Easily target demographics by creating bulletins to promote your
                campaigns. For COVID-19, support your people by offering relief
                measures.
              </h2>
            </div>
            <div className="column is-4">
              <h1 className="subtitle is-2">Track</h1>
              <h2 className="subtitle">
                See how audiences engages with your bulletin. (Coming soon)
              </h2>
            </div>
            <div className="column is-4">
              <h1 className="subtitle is-2">Grow</h1>
              <h2 className="subtitle">
                FundLink provides analytics and statistics to help you build
                your organization. (Coming soon)
              </h2>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
