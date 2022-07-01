import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { GoSearch } from "react-icons/go";
import Topics from "./Topics";
import { AiFillCloseCircle } from "react-icons/ai";
import Link from "next/link";
import withScrollTo from "../hocs/withScrollTo";

const topics = ["react", "typescript", "javascript", "aws", "compsci", "animation", "design", "css", "go", "next"];

const dummyPosts2 = [
  {
    title: "Converting a JavaScript app to TypeScript.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nobis, ipsam, ducimus sint amet doloribus perspiciatis architecto ullam est fuga error? Doloremque odio a maxime magnam magni commodi consectetur",
  },
  {
    title: "The amazing world of Nextjs.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nobis, ipsam, ducimus sint amet doloribus perspiciatis architecto ullam est fuga error? Doloremque odio a maxime magnam magni commodi consectetur",
  },
  {
    title: "How to use Styled Components in a next app using SSG.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nobis, ipsam, ducimus sint amet doloribus perspiciatis architecto ullam est fuga error? Doloremque odio a maxime magnam magni commodi consectetur",
  },
  {
    title: "Some title for the latest blog post.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nobis, ipsam, ducimus sint amet doloribus perspiciatis architecto ullam est fuga error? Doloremque odio a maxime magnam magni commodi consectetur",
  },
];

type BlogRecentProps = {
  menuFixed: boolean;
};

export default function BlogRecent({ menuFixed }: BlogRecentProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  return (
    <Container data-testid="hero" isMenuFixed={menuFixed}>
      <div id="wrapper">
        <motion.div id="recent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Recent>
            <h6 className="heading">
              Recently Published <span id="selected">{selectedTopic && `${selectedTopic}`}</span>
            </h6>
            {dummyPosts2.map((post, index) => {
              return (
                <LongCard key={index}>
                  <h2 className="title">{post.title}</h2>
                  <h4 className="date">Published date</h4>
                  <p>{post.desc}</p>
                  <h4>Read More</h4>
                </LongCard>
              );
            })}
          </Recent>
        </motion.div>
        <motion.div
          id="col1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h6 className="heading">Common Topics</h6>
          <ul>
            <Topics
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              topics={topics}
              menuFixed={menuFixed}
            />
          </ul>
          <Search>
            <div id="icon-wrapper">
              <GoSearch size={18} />
            </div>

            <input type="text" placeholder="Search" />
          </Search>
        </motion.div>
      </div>
    </Container>
  );
}

type ContainerProps = {
  isMenuFixed: boolean;
};

const Container = styled.section<ContainerProps>`
  width: 100vw;
  display: flex;
  scroll-behavior: smooth !important;
  align-items: center;
  padding: 0 12vw;
  position: relative;

  p {
    margin: 0;
    font-size: 20px !important;
    line-height: 30px !important;
  }
  #wrapper {
    display: flex;
    width: 80vw;
  }

  #col1 {
    height: 100vh;
    padding-top: 50px;
    width: 30vw;
    position: absolute;
    top: 0;
    right: 0;
    ${({ isMenuFixed }) =>
      isMenuFixed &&
      `
        position: fixed;
     
      `};
  }
  #recent {
    padding-top: 50px;
    height: 300vh;
    width: 60vw;
    padding-right: 150px;

    h1 {
      font-size: 5vh;
      margin-top: 0;
    }
  }

  .heading {
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  ul {
    /* list-style: none; */
    padding-left: 0;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Search = styled.div`
  margin-top: 50px;
  font-size: 20px;
  display: flex;
  align-items: center;
  position: relative;

  #icon-wrapper {
    position: absolute;
    padding-top: 2px;
    left: 10px;
  }

  input {
    height: 40px;
    width: 250px;
    border: ${({ theme }) => `2px solid ${theme.highlight}`};
    background-color: ${({ theme }) => theme.secondary_background};
    border-radius: 10px;
    padding-left: 40px;
    color: ${({ theme }) => theme.primary_text};
    font-size: 17px;
  }
`;

const Recent = styled.section`
  min-height: 100vh;
  width: 100%;

  #selected {
    color: ${({ theme }) => theme.highlight};
  }

  h3 {
    text-transform: uppercase;
  }
`;

const LongCard = styled.div`
  margin-bottom: 50px;

  &:hover {
    cursor: pointer;
    .title {
      color: ${({ theme }) => theme.highlight};
    }
  }

  h2 {
    margin: 0;
  }

  h4 {
    margin-top: 5px;
  }
`;
