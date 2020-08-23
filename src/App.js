import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";
// import ReactMarkdown from "react-markdown";
// import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
// import dark from "./syntaxTheme";
import { Wrapper, Card, Box } from "sriracha-ui";
import { Route } from "react-router";
import Home from "./Home";
import Blog from "./Blog";

// const CodeBlock = ({ language, value }) => {
//   return (
//     <SyntaxHighlighter style={dark} language={language}>
//       {value}
//     </SyntaxHighlighter>
//   );
// };

const query = gql`
  query GetPubFiles {
    getPubFiles {
      id
      title
      slug
      body
      thumbnail
      description
      publishedOn
      updatedAt
    }
  }
`;

function App() {
  const { data } = useQuery(query);
  console.log("data", data);
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/:slug" component={Blog} />
    </div>
  );
}

export default App;
