import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import { sortTech } from "../../utils/sortTech";
import { TechList } from "../../utils/sortTech";

type TechProps = {
  techList: TechList;
  setTech: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Tech({ techList, setTech }: TechProps) {
  const tech = sortTech(techList);

  return (
    <Wrapper initial={{ x: 100 }} animate={{ x: 0 }} exit={{ x: 100, opacity: 0 }}>
      <h2>Accurate as of June 2022</h2>
      <p id="desc">
        These are the technologies I've used over the years from least to most. The most used are what I work with
        daily, the least used are what I've had some exposure to (e.g. on small projects / learning).
      </p>
      <Container>
        <Sidebar>
          <h6>Most used</h6>
          <h6>Least used</h6>
        </Sidebar>
        {new Array(6).fill(0).map((_, index) => {
          return (
            <div key={index} id={`mid${index}`}>
              {tech[index].map((item) => (
                <Image key={item.fields.description} src={item.fields.file.url} />
              ))}
            </div>
          );
        })}
      </Container>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "150px" }}>
        <Return onClick={() => setTech(false)} data-testid="close">
          <AiFillCloseCircle size={35} />
        </Return>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  top: 0;
  width: 100%;
  h2 {
    padding-left: 30px;
  }
  h6 {
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
  }
`;

const Container = styled.section`
  height: 280px;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 0.4fr 1.3fr;
  grid-template-rows: repeat(6, auto);
  gap: 0px 0px;
  grid-template-areas:
    "sidebar mid5"
    "sidebar mid4"
    "sidebar mid3"
    "sidebar mid2"
    "sidebar mid1"
    "sidebar mid0";

  #mid5 {
    grid-area: mid5;
  }
  #mid0 {
    grid-area: mid0;
  }
  #sidebar {
    grid-area: sidebar;
  }
  #mid1 {
    grid-area: mid1;
  }
  #mid2 {
    grid-area: mid2;
  }
  #mid3 {
    grid-area: mid3;
  }
  #mid4 {
    grid-area: mid4;
  }

  div {
    padding-left: 20px;
    display: flex;
    align-items: center;
  }
`;

const Sidebar = styled.div`
  border-right: 3px solid ${({ theme }) => theme.highlight};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-area: sidebar;
  padding: 20px 0;
  p {
    margin: 0 !important;
  }
`;

const Image = styled.img`
  width: 45px;
  margin: 5px;
`;

const Return = styled.button`
  background: none;
  border: none;
  display: flex;
  cursor: pointer;
  color: ${({ theme }) => theme.highlight};
`;
