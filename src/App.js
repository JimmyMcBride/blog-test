import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";

function App() {
  const query = gql`
    query GetPubFiles {
      getPubFiles {
        id
        title
        slug
        body
        publishedOn
        updatedAt
      }
    }
  `;
  const { data } = useQuery(query);
  console.log("data", data);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* {posts?.map((post) => (
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))} */}
      </header>
    </div>
  );
}

export default App;
