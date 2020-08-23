import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "@apollo/client";
import { Wrapper, Card, Box, Flex } from "sriracha-ui";

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

export default function Home() {
  const { data } = useQuery(query);
  console.log("data", data);
  return (
    <Wrapper>
      <img src={logo} className="App-logo" alt="logo" />
      <Flex wrap>
        {data?.getPubFiles.map((post) => (
          <Card key={post.id} maxW="40rem" sink as="a" href={`/${post.slug}`}>
            <h2>{post.title}</h2>
            <Box>
              <img src={post.thumbnail} alt="banner" />
            </Box>
            <p>{post.description}</p>
          </Card>
        ))}
      </Flex>
    </Wrapper>
  );
}
