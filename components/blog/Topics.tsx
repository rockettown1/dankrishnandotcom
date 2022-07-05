import styled from "styled-components";
import Link from "next/link";
import { AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";

type TopicProps = {
  selectedTopic: string;
  setSelectedTopic: React.Dispatch<React.SetStateAction<string>>;
  topics: string[];
  menuFixed: boolean;
};

export default function Topic({ selectedTopic, setSelectedTopic, topics, menuFixed }: TopicProps) {
  return (
    <div>
      {topics.map((topic, index) => {
        return (
          <Wrapper key={index} selected={topic === selectedTopic}>
            {menuFixed ? (
              <Link href="#recent" replace={true}>
                <h4 id="topic" onClick={() => setSelectedTopic(topic)}>
                  {topic}
                </h4>
              </Link>
            ) : (
              <h4 id="topic" onClick={() => setSelectedTopic(topic)}>
                {topic}
              </h4>
            )}
            {topic === selectedTopic &&
              (menuFixed ? (
                <Link href="#recent" replace={true}>
                  <Close
                    onClick={() => setSelectedTopic(null)}
                    animate={{ transform: "rotate(360deg)" }}
                    transition={{ duration: 1 }}
                  >
                    <AiFillCloseCircle size={25} />
                  </Close>
                </Link>
              ) : (
                <Close
                  onClick={() => setSelectedTopic(null)}
                  animate={selectedTopic && { transform: "rotate(360deg)" }}
                  transition={{ duration: 1 }}
                >
                  <AiFillCloseCircle size={25} />
                </Close>
              ))}
          </Wrapper>
        );
      })}
    </div>
  );
}

const Wrapper = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  h4 {
    width: 120px;
    margin: 0;
    padding: 6px;

    border-radius: 5px;
    font-family: var(--secondary_font);
    ${({ theme, selected }) => selected && `color: ${theme.highlight}`};
    &:hover {
      color: ${({ theme }) => theme.highlight};
    }
  }
`;

const Close = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.highlight};
  margin-left: -30px;
  height: 25px;
  transform-origin: center;
`;
