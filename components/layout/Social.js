import React from "react";
import { BsInstagram, BsGithub, BsLinkedin } from "react-icons/bs";
import styled from "styled-components";

export default function Social() {
  const socialButtons = [
    { icon: BsInstagram, link: "https://www.instagram.com/rockettown/" },
    { icon: BsGithub, link: "https://github.com/rockettown1" },
    { icon: BsLinkedin, link: "https://www.linkedin.com/in/dan-krishnan-1595a3172/" },
  ];
  return (
    <>
      {socialButtons.map((item, index) => {
        return (
          <External href={item.link} tabIndex="1" key={index}>
            <item.icon />
          </External>
        );
      })}
    </>
  );
}

const External = styled.a`
  text-decoration: none;
  color: inherit;
  &::focus,
  &::active {
    text-decoration: none;
  }
  &:hover {
    color: ${({ theme }) => theme.highlight};
  }
`;
