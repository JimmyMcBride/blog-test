import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import dark from "./syntaxTheme";
import { Wrapper, Card, Box } from "sriracha-ui";

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter style={dark} language={language}>
      {value}
    </SyntaxHighlighter>
  );
};

const query = gql`
  query GetPubFileBySlug($slug: String!) {
    getPubFileBySlug(slug: $slug) {
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

export default function Blog() {
  const { slug } = useParams();
  const { data } = useQuery(query, {
    variables: {
      slug,
    },
  });
  console.log("data", data);
  return (
    <Wrapper>
      <a href="/">
        <img src={logo} className="App-logo" alt="logo" />
      </a>

      <Card
        key={data?.getPubFileBySlug.id}
        maxW="88rem"
        shade
        as="a"
        href={`/${data?.getPubFileBySlug.slug}`}
      >
        <Box>
          <ReactMarkdown
            className="markdown-body"
            escapeHtml={false}
            source={data?.getPubFileBySlug.body}
            renderers={{ code: CodeBlock }}
          />
        </Box>
      </Card>
    </Wrapper>
  );
}
