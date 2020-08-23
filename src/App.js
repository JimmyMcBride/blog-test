import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";

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

function App() {
  const { data } = useQuery(query);
  const [posts, setPosts] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(
        "https://be-best-markdown-editor-stage.herokuapp.com/api/published-files/folder-name/Jimmy McBride",
        {
          headers: { token: "84e7d6e8-bb64-4bdc-bbb4-54859cb4ebe0" },
        }
      )
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err.message));
  }, []);
  console.log("data", data);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {posts?.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
