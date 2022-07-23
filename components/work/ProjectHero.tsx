import styled from "styled-components";
import { motion } from "framer-motion";
import { BiSubdirectoryRight } from "react-icons/bi";
import { BsArrowDown } from "react-icons/bs";
import Button from "../shared/Button";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { Project } from "types/Project";

type Props = {
  project: Project;
};

const ProjectHero = ({ project }: Props) => {
  const openProjectNewTab = (link: string) => {
    parent.open(link);
  };

  return (
    <Container data-testid="hero">
      <div id="wrapper">
        <motion.div
          id="col1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h6 className="title">Technologies</h6>
          <ul>
            {project.fields.tech.data.map((tech: { type: string; sub: string[] }, index: number) => {
              return (
                <div key={index}>
                  <h4>{tech.type}</h4>
                  {tech.sub.length > 0 && (
                    <ul id="sublist">
                      {tech.sub.map((sub, index) => {
                        return (
                          <Sub key={index}>
                            <BiSubdirectoryRight size={20} />
                            <h4>{sub}</h4>
                          </Sub>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </ul>
          <Link href="#discuss" style={{ textDecoration: "none" }} replace={true}>
            <Jump>
              <h5>Jump to Technical Discussion</h5>
              <BsArrowDown />
            </Jump>
          </Link>
        </motion.div>
        <motion.div id="col2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h1>{project.fields.headline}</h1>
          <p>{project.fields.description}</p>
          <Links>
            {project.fields.link && (
              <Button secondary handleClick={openProjectNewTab} link={project.fields.link}>
                Launch Project
              </Button>
            )}
            {project.fields.github && (
              <Button secondary handleClick={openProjectNewTab} link={project.fields.github}>
                View Source <BsGithub />
              </Button>
            )}
          </Links>
        </motion.div>
      </div>
    </Container>
  );
};

export default ProjectHero;

const Container = styled.section`
  min-height: 80vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-top: 200px; */

  p {
    margin: 0;
    font-size: 20px !important;
    line-height: 30px !important;
  }
  #wrapper {
    display: flex;
    padding: 150px 0 50px 0;
  }

  #col1 {
    width: 400px;
  }
  #col2 {
    width: 40vw;
    min-height: 400px;

    h1 {
      font-size: 5vh;
      margin-top: 0;
    }
  }

  .title {
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  ul {
    /* list-style: none; */
    padding-left: 0;
    h4 {
      margin: 7px 0;
      font-family: var(--secondary_font);
    }
  }
  #sublist {
    padding-left: 20px;
    h4 {
      margin: 7px 0;
      font-family: var(--secondary_font);
    }
  }

  @media screen and (max-width: 1100px) {
    #wrapper {
      width: 100vw;
      flex-direction: column;
      justify-content: flex-start;
      padding: 50px 0;
    }
    #col1 {
      order: 2;
      padding-left: 10vw;
      height: auto;
      width: 100vw;
    }
    #col2 {
      width: 100vw;
      padding: 100px 10vw 0 10vw;

      order: 1;
    }
  }
`;

const Sub = styled.div`
  display: flex;
  align-items: center;
  h4 {
    margin: 2px !important;
  }
`;

const Links = styled.div`
  margin-top: 50px;
  display: flex;
  button {
    margin-right: 30px;
  }
  @media screen and (max-width: 1100px) {
    margin-top: 20px;
    button {
      font-size: 12px;
    }
  }
`;

const Jump = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.highlight};

  h5 {
    margin-right: 10px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
