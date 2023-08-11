/* eslint-disable jsx-a11y/anchor-has-content */
import "./App.css";
import React, { useState, useEffect, memo } from "react";

function App() {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [users, setUsers] = useState([]);

  const API_URL = "https://api.github.com";

  useEffect(() => {
    fetch(`${API_URL}/search/users?q=${displayName}`)
      .then((res) => res.json())
      .then((data) => setUsers(data.items));
  }, [displayName]);

  function doSearch() {
    setDisplayName(name);
    setName("");
  }

  function handleChange(e) {
    if (e.key === "Enter") {
      setDisplayName(name);
      setName("");
    }
  }

  function openTab(id) {
    window.open(id);
  }

  return (
    <div className="App">
      <div>
        <h1>
          <i className="fa-brands fa-github"></i> GIT PROFILE FINDER
        </h1>
      </div>
      <div className="container">
        <input
          onKeyUp={handleChange}
          value={name}
          className="input"
          placeholder="Enter Github username"
          onChange={(e) => setName(e.target.value)}
        />
        <button className="searchbtn" onClick={doSearch}>
          Search
        </button>
      </div>
      {users && users.length >= 1
        ? users.map((ele, key) => (
            <div key={ele.id} className="resultcontainer">
              <img
                className="avatar"
                src={ele.avatar_url}
                alt={`${ele.login} icon`}
              />
              <div className="userdetails">
                <p>{ele.login}</p>
                {/* // eslint-disable-next-line jsx-a11y/anchor-has-content */}
                <p className="link" onClick={() => openTab(ele.html_url)}>
                  URL: <u style={{ color: "blue" }}>{ele.html_url}</u>
                </p>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

export default memo(App);
