import Link from "next/link";
import React from "react";

interface Props {
  tag: {
    _id: string;
    name: string;
  };
}

const Tag = ({ tag }: Props) => {
  return <Link href={`/tags/${tag._id}`}>{tag.name}</Link>;
};

export default Tag;
