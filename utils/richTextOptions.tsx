import React from "react";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import styled from "styled-components";
import NextImage from "next/image";
import ReactMarkdown from "react-markdown";
import { Node } from "@contentful/rich-text-types";
// import "prismjs/components/prism-jsx";
// import "prismjs/components/prism-typescript";
import renderRichText from "./renderRichText";

const Bold = ({ children }) => <BoldMark>{children}</BoldMark>;
const Underline = ({ children }) => <UnderlineMark>{children}</UnderlineMark>;
const Italic = ({ children }) => <ItalicMark>{children}</ItalicMark>;
const Text = ({ children }) => <TextBlock>{children}</TextBlock>;

export const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => <Bold>{text}</Bold>,
    [MARKS.UNDERLINE]: (text: string) => <Underline>{text}</Underline>,
    [MARKS.ITALIC]: (text: string) => <Italic>{text}</Italic>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => <Text>{children}</Text>,
    [BLOCKS.HEADING_1]: (node, children) => {
      if (children[0] === "Technical Discussion") {
        return (
          <Heading1 ref={node} id="discuss">
            {children}
          </Heading1>
        );
      }

      return <Heading1 ref={node}>{children}</Heading1>;
    },
    [BLOCKS.HEADING_2]: (_, children) => <Heading2>{children}</Heading2>,
    [BLOCKS.HEADING_3]: (_, children) => <Heading3>{children}</Heading3>,
    [BLOCKS.HEADING_4]: (_, children) => <Heading4>{children}</Heading4>,
    [BLOCKS.HEADING_5]: (_, children) => <Heading5>{children}</Heading5>,
    [BLOCKS.HEADING_6]: (_, children) => <Heading6>{children}</Heading6>,
    [BLOCKS.OL_LIST]: (_, children) => <Ol>{children}</Ol>,
    [BLOCKS.UL_LIST]: (_, children) => <Ul>{children}</Ul>,
    [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (_, children) => <Quote>{children}</Quote>,
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      if (node.data.target.fields.code) {
        return <Markdown className="line-numbers">{node.data.target.fields.code}</Markdown>;
      }
      if (node.data.target.fields.type === "mainText") {
        return (
          <MainText>
            <div id="heading">
              <h2>{node.data.target.fields.heading}</h2>
            </div>
            <div id="paragraph">
              <ReactMarkdown>{node.data.target.fields.paragraph}</ReactMarkdown>
            </div>
          </MainText>
        );
      }
      if (node.data.target.fields.type === "subText") {
        console.log("This", this);
        return (
          <SubText>
            <div id="heading">
              <h2>{node.data.target.fields.heading}</h2>
            </div>
            <div id="paragraph">{renderRichText(node.data.target.fields.richParagraph)}</div>
          </SubText>
        );
      }
      if (node.data.target.sys.contentType.sys.id === "mocks") {
        return (
          <MocksContainer>
            <div id="mobile-container">
              <NextImage
                src={`https:${node.data.target.fields.mobile.fields.file.url}`}
                layout="fill"
                objectFit="contain"
                alt={node.data.target.fields.mobile.fields.file.title}
              />
            </div>
            <div id="desktop-container">
              <NextImage
                src={`https:${node.data.target.fields.desktop.fields.file.url}`}
                layout="fill"
                objectFit="contain"
                alt={node.data.target.fields.desktop.fields.file.title}
              />
              <div id="shadow"></div>
            </div>
          </MocksContainer>
        );
      }
      if (node.data.target.sys.contentType.sys.id === "videoWithOptions") {
        const { poster, video, autoplay } = node.data.target.fields;
        return (
          <Video controls poster={poster.fields.file.url} autoPlay={autoplay}>
            <source src={video.fields.file.url} type="video/mp4" />
          </Video>
        );
      }
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const assetType = node.data.target.fields.file.contentType;
      switch (assetType) {
        case "video/mp4":
          return (
            <Video controls autoPlay loop muted>
              <source src={node.data.target.fields.file.url} type="video/mp4" />
            </Video>
          );
        case "image/png":
        case "image/jpeg":
        case "image/jpg":
        case "image/gif":
          return (
            <Image
              src={`https:${node.data.target.fields.file.url}`}
              height={node.data.target.fields.file.details.image.height}
              width={node.data.target.fields.file.details.image.width}
              alt={node.data.target.fields.description}
            />
          );
        default:
          return "Nothing to see here...";
      }
    },
  },
};

//--------- Styling Contentful Blocks and Marks -----------//

const BoldMark = styled.span`
  font-family: "Cal Sans";
`;

const ItalicMark = styled.span`
  font-style: italic;
`;
const UnderlineMark = styled.span`
  text-decoration: underline;
`;

const TextBlock = styled.p`
  /* margin-top: 50px; */
  /* width: 80%; */
`;

const Image = styled(NextImage)`
  width: 100vw;
  border-radius: 10px;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

const Heading1 = styled.h1`
  font-size: 50px;
  @media screen and (max-width: 500px) {
    font-size: 30px;
  }
`;
const Heading2 = styled.h2``;
const Heading3 = styled.h3``;
const Heading4 = styled.h4``;
const Heading5 = styled.h5``;
const Heading6 = styled.h6``;

const Ol = styled.ol`
  padding-left: 20px;
  p {
    margin: 0;
  }
`;
const Ul = styled.ul`
  width: 100%;
  p {
    color: red;
    margin: 0;
  }
`;
const Quote = styled.h4`
  font-style: italic;
  padding-left: 20px;
  box-sizing: border-box;
  border-left: 2px solid black;
`;

const Markdown = styled(ReactMarkdown)`
  width: 700px;
`;

const Video = styled.video`
  width: 60%;
  margin: 30px 0;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const MainText = styled.section`
  width: 60%;
  margin-top: 30px;
  display: flex;

  #heading {
    width: 30%;
  }
  #paragraph {
    width: 70%;
  }
  h2 {
    width: 100%;
  }
  p {
    width: 100%;
    padding-left: 40px;
  }
  @media screen and (max-width: 1000px) {
    width: 100vw;
    padding: 50px;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
    p {
      padding: 0;
    }
    #paragraph,
    #heading {
      width: 100%;
    }
  }
`;

const SubText = styled.section`
  width: 80%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;

  h2 {
    width: 100%;
    margin: 0;
    color: ${({ theme }) => theme.highlight};
  }
  p {
    width: 100%;
  }
`;

const MocksContainer = styled.section`
  position: relative;
  padding-left: 45vw;
  padding-bottom: 50px;
  display: flex;
  background-color: ${({ theme }) => theme.background};

  #desktop-container {
    position: relative;
    height: 1100px;
    width: 1500px;
  }

  #mobile-container {
    position: absolute;
    z-index: 100;
    height: 600px;
    width: 300px;
    bottom: 150px;
  }

  @media screen and (max-width: 1100px) {
    width: 100vw;
    height: 500px;
    padding-left: 0;
    justify-content: center;
    align-items: center;
    padding: 20px 0;

    #desktop-container {
      width: 400px;
      height: 300px;
    }

    #mobile-container {
      position: relative;
      bottom: 0;
      width: 150px;
      height: 300px;
    }
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
