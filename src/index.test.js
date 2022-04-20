import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom
let container

describe("index.html", () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;
  });

  it("renders the page heading", () => {
    expect(container.querySelector("h1")).not.toBeNull();
    expect(getByText(container, "Welcome to Challenge")).toBeInTheDocument();
  });

  it("renders a button", () => {
    expect(container.querySelector("button")).not.toBeNull();
    expect(getByText(container, "Click here to challenge")).toBeInTheDocument();
  });

  it("renders an empty challenge result by default", () => {
    let challengeResult = container.querySelector("#result-container");
    expect(challengeResult.innerHTML).toEqual("");
  });

  it("renders a new challenge status when the button is clicked", async () => {
    const button = getByText(container, "Click here to challenge");

    fireEvent.click(button);
    let challengeResult = container.querySelector("#result-container");
    expect(challengeResult.innerHTML).not.toEqual("");
  });
});
