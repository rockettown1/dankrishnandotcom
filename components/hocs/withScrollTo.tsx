import Link from "next/link";
import React from "react";

export default function withScrollTo(Component: React.FunctionComponent, id: string) {
  return (
    <Link href={`#${id}`} replace={true} passHref>
      <Component />
    </Link>
  );
}
