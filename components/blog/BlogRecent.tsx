import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import readingTime from "reading-time";
import { useRouter } from "next/router";
import { fetcher } from "utils";
import { PacmanLoader } from "react-spinners";
import moment from "moment";
import Link from "next/link";
import { motion } from "framer-motion";
import { GoSearch } from "react-icons/go";
import Topics from "./Topics";
import { IPost, IPostFields } from "types/generated/contentful";
import { Entry } from "contentful";
import { AiFillCloseCircle } from "react-icons/ai";
import * as z from "zod";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { postFilter } from "utils/postFilter";

const InputSchema = z.string().min(2);
type Input = z.infer<typeof InputSchema>;

type Topics = IPostFields["topic"];

type BlogRecentProps = {
  menuFixed: boolean;
  posts: IPost[];
  topics: Topics[];
};

export default function BlogRecent({ menuFixed, posts, topics }: BlogRecentProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [visiblePosts, setVisibilePosts] = useState<(Entry<IPost> | IPost)[]>(posts);
  const [searching, setSearching] = useState<boolean>(false);
  const [input, setInput] = useState<Input>("");
  const [message, setMessage] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const router = useRouter();
  const inputRef = useRef(null);

  const filterPosts = (topic: string) => {
    const filteredPosts = postFilter(posts, topic);
    setSelectedTopic(topic);
    setVisibilePosts(filteredPosts);
  };

  const resetAllPosts = () => {
    setSelectedTopic("");
    setVisibilePosts(posts);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    //closes mobile keyboard on return
    const inputBox = inputRef!.current! as HTMLInputElement;
    inputBox.blur();

    //check if input adheres to the schema (min length 2)
    if (!InputSchema.safeParse(input).success) {
      setMessage("Must search with at least 2 letters");
      setShowMessage(true);
    } else {
      try {
        setSearching(true);
        const data = await fetcher(`/contentfulsearch?search=${input}`);
        if (data.results.length === 0) {
          setMessage("No results returned for that query");
          setShowMessage(true);
        } else {
          setVisibilePosts(data.results);
          setSelectedTopic(`Search results for ${input}`);
          router.replace("#recent");
        }
      } catch (e) {
        console.error(e);
      } finally {
        setSearching(false);
      }
    }

    setInput("");
    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };

  return (
    <Container data-testid="hero" isMenuFixed={menuFixed}>
      <div id="wrapper">
        <motion.div id="recent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Recent>
            <h6 className="heading">
              Recently Published <span id="selected">{selectedTopic && `${selectedTopic}`}</span>
              {selectedTopic?.includes("Search") && (
                <Close onClick={resetAllPosts} animate={{ transform: "rotate(360deg)" }} transition={{ duration: 1 }}>
                  <AiFillCloseCircle size={25} />
                </Close>
              )}
            </h6>
            {visiblePosts.map((post: IPost, index: number) => {
              return (
                <Link href={`/blog/${post.fields.slug}`} key={index}>
                  <LongCard>
                    <h2 className="title">{post.fields.title}</h2>
                    <div id="info-container">
                      <h4 className="info">{moment.utc(post.fields.date).format("Do MMMM YYYY")}</h4>

                      <h4 className="info">{readingTime(documentToPlainTextString(post.fields.body)).text}</h4>
                    </div>
                    <p>{post.fields.excerpt}</p>
                    <h4>Read More</h4>
                  </LongCard>
                </Link>
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
              filterPosts={filterPosts}
              resetAllPosts={resetAllPosts}
              selectedTopic={selectedTopic}
              topics={topics}
              menuFixed={menuFixed}
            />
          </ul>
          <Search>
            <div id="icon-wrapper">
              {searching ? (
                <div style={{ marginTop: "-10px" }}>
                  <PacmanLoader loading={searching} size={10} color="#9b9b9b" />
                </div>
              ) : (
                <GoSearch size={18} />
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                placeholder={searching ? "" : "Search Topic"}
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </form>
          </Search>
          <h4>Hit Enter to search</h4>
        </motion.div>
      </div>
      <Message $showMessage={showMessage} opacity={showMessage ? 1 : 0}>
        <h4>{message}</h4>
      </Message>
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
  justify-content: center;
  padding: 0 12vw;
  position: relative;
  background-color: ${({ theme }) => theme.background};

  p {
    margin: 0;
    font-size: 20px !important;
    line-height: 30px !important;
  }
  #wrapper {
    display: flex;
    width: 80vw;
    /* width: 80vw; */
  }

  #col1 {
    height: 100vh;
    padding-top: 50px;
    width: 30vw;
    position: relative;
    top: 0;
    right: 0;
    ${({ isMenuFixed }) => isMenuFixed && `position: sticky;`};

    h4 {
      font-family: var(--secondary_font);
    }
  }

  #recent {
    padding-top: 50px;
    height: 300vh;
    width: 75vw;
    /* padding-right: 200px; */

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
    padding-left: 0;
    &:hover {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 800px) {
    padding: 0 20px;
    #wrapper {
      flex-direction: column;
      width: 100vw;
    }
    #col1 {
      position: relative;
      order: 1;
      width: 100vw;
      padding: 10px 20px;
      height: max-content;

      ul {
        display: flex;
      }
    }

    #recent {
      order: 2;
      width: 100vw;
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
  width: 60vw;
  padding-right: 10vw;

  #selected {
    color: ${({ theme }) => theme.highlight};
  }

  h3 {
    text-transform: uppercase;
  }
  @media screen and (max-width: 800px) {
    width: 100vw;
    padding: 0 20px;
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

  #info-container {
    display: flex;
    height: 30px;
  }

  .info {
    opacity: 0.5;
    margin-right: 20px;
    font-family: "SF-Display-Light";
  }

  h2 {
    margin: 0;
  }

  h4 {
    margin-top: 5px;
  }
  p {
    font-size: 17px !important;
  }
  /* @media screen and (max-width: 800px) {
    padding: 0 20px
  } */
`;

const Close = styled(motion.span)`
  margin: 0 10px;
  margin-top: -5px;
  position: absolute;
  height: 25px;
  transform-origin: center;
`;

type MessageProps = {
  $showMessage: boolean;
  opacity: number;
};
const Message = styled(motion.div)<MessageProps>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 60px;
  transition: all 1s;
  bottom: ${({ $showMessage }) => ($showMessage ? "0" : "-50px")};
  opacity: ${({ opacity }) => opacity};
  background-color: ${({ theme }) => theme.highlight};
  color: black;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  @media screen and (max-width: 800px) {
    bottom: none;
    top: ${({ $showMessage }) => ($showMessage ? 0 : "-50px")};
  }
`;
