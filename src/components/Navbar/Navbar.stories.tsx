import React from "react";
import Navbar from "./Navbar";
import { MemoryRouter } from "react-router-dom";
import { Meta } from "@storybook/react";

export default {
  title: "Components/Navigation Bar",
  component: Navbar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as Meta;

export const navbar = () => <Navbar />;
