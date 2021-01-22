import React from "react";
import renderer from "react-test-renderer";
import Community from "./Community";

it("renders correctly", () => {
  const tree = renderer.create(<Community />);
  expect(tree).toMatchInlineSnapshot(`
    <div>
      <div
        className="mt-3 input-group"
      >
        <input
          aria-label="Search..."
          className="form-control"
          onChange={[Function]}
          placeholder="Search..."
        />
      </div>
      <div
        className="d-flex justify-content-between mt-3"
      >
        <a
          className="card-link"
          href="#"
          onClick={[Function]}
        >
          Create Announcement
        </a>
        <div
          className="text-right"
        >
          <a
            className="card-link"
            href="#"
            onClick={[Function]}
          >
            Create Event
          </a>
        </div>
      </div>
      Loading...
    </div>
  `);
});
