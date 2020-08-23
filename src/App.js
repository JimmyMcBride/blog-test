import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
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
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {posts?.map((post) => (
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
