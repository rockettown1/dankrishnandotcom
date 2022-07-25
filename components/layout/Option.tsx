import styled from "styled-components";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { handleKeyboardSelect } from "utils/handleKeyboardSelect";

type Props = {
  linkName: string;
};

export default function Option({ linkName }: Props) {
  const router = useRouter();
  return (
    <Link href={`/${linkName.toLowerCase()}`} scroll={false}>
      <Heading
        $active={router.pathname.includes(linkName.toLowerCase())}
        tabIndex={1}
        role="link"
        onKeyDown={(e) => handleKeyboardSelect(e, () => router.push(`/${linkName.toLowerCase()}`))}
      >
        {linkName}
      </Heading>
    </Link>
  );
}

type HeadingProps = {
  $active: boolean;
};

const Heading = styled(motion.h2)<HeadingProps>`
  color: ${({ theme, $active }) => ($active ? theme.primary_text : theme.secondary_text)};
  border-bottom: 1px solid ${({ theme, $active }) => ($active ? theme.primary_text : "none")};
  font-size: 3vh;
`;
