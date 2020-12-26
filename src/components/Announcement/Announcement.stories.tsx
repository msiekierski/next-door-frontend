import React from "react";
import Announcement from "./Announcement";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Components/Post/Announcement",
  component: Announcement,
  argTypes: {
    announcementType: {
      control: {
        type: "select",
        options: ["primary", "warning", "info"],
      },
    },
    title: {
      control: "text",
    },
    creationDate: {
      control: {
        type: "date",
      },
    },
  },
};

export const announcement = (args: any) => <Announcement {...args} />;
announcement.args = {
  announcementType: "primary",
  title: "Announcement",
  author: "Adam",
  description: "I need money",
  creationDate: new Date(),
};
