import React from "react";
import { BsInstagram, BsGithub, BsLinkedin } from "react-icons/bs";
import styled from "styled-components";

export default function Social() {
  const socialButtons = [
    { icon: BsInstagram, link: "http://google.com" },
    { icon: BsGithub, link: "http://google.com" },
    { icon: BsLinkedin, link: "http://google.com" },
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
