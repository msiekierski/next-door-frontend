import React from "react";
import Comment from "./Comment";

export default {
  title: "Components/Post/Comment",
  component: Comment,
  argTypes: {
    author: {
      control: "text",
    },
    date: {
      control: "date",
    },
    description: {
      control: "text",
    },
  },
};

export const comment = (args: any) => <Comment {...args} />;
comment.args = {
  author: "Michał Sznajder",
  date: 0,
  description: "i disagree",
};
