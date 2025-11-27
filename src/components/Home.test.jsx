import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import React from "react";
import Home from "./Home";
import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

describe("Home - Search Button Tests", () => {
  const mockHandleInput = jest.fn();
  const mockHandleSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the search button", () => {
    render(
      <MemoryRouter>
        <Home
          handleInput={mockHandleInput}
          handleSearch={mockHandleSearch}
          inputValue=""
          shows={[]}
          showNameSearch=""
        />
      </MemoryRouter>
    );

    // ✅ Check that search button is created
    const searchButton = screen.getByRole("button", { name: /search/i });
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveTextContent("search");
  });

  it("search button is clickable and calls handleSearch", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Home
          handleInput={mockHandleInput}
          handleSearch={mockHandleSearch}
          inputValue="Breaking Bad"
          shows={[]}
          showNameSearch=""
        />
      </MemoryRouter>
    );

    // ✅ Click the search button
    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);

    // ✅ Verify handleSearch was called
    expect(mockHandleSearch).toHaveBeenCalled();
  });

  it("displays initial search results message", () => {
    render(
      <MemoryRouter>
        <Home
          handleInput={mockHandleInput}
          handleSearch={mockHandleSearch}
          inputValue=""
          shows={[]}
          showNameSearch=""
        />
      </MemoryRouter>
    );

    // ✅ Check initial message is displayed
    expect(screen.getByText(/Please enter your fave show above and hit 'search'/i)).toBeInTheDocument();
  });

  it("displays search results header when shows are found", () => {
    const mockShows = [
      {
        show: {
          id: 1,
          name: "Breaking Bad",
          image: null,
          genres: ["Drama"],
        },
      },
    ];

    render(
      <MemoryRouter>
        <Home
          handleInput={mockHandleInput}
          handleSearch={mockHandleSearch}
          inputValue="Breaking Bad"
          shows={mockShows}
          showNameSearch="Breaking Bad"
        />
      </MemoryRouter>
    );

    // ✅ Check search results header is displayed with show name
    expect(screen.getByText(/Search Results for/i)).toBeInTheDocument();
    // ✅ Verify the search term appears in the results header
    const resultHeaders = screen.getAllByText(/Breaking Bad/i);
    expect(resultHeaders.length).toBeGreaterThanOrEqual(1);
  });

  it("input field is functional and calls handleInput", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Home
          handleInput={mockHandleInput}
          handleSearch={mockHandleSearch}
          inputValue=""
          shows={[]}
          showNameSearch=""
        />
      </MemoryRouter>
    );

    // ✅ Get input field
    const input = screen.getByPlaceholderText(/enter your fave show name/i);
    expect(input).toBeInTheDocument();

    // ✅ Type in the input field
    await user.type(input, "Game of Thrones");

    // ✅ Verify handleInput was called
    expect(mockHandleInput).toHaveBeenCalled();
  });

  it("search button has correct type attribute", () => {
    render(
      <MemoryRouter>
        <Home
          handleInput={mockHandleInput}
          handleSearch={mockHandleSearch}
          inputValue=""
          shows={[]}
          showNameSearch=""
        />
      </MemoryRouter>
    );

    // ✅ Verify button has submit type
    const searchButton = screen.getByRole("button", { name: /search/i });
    expect(searchButton).toHaveAttribute("type", "submit");
  });

  it("input field displays current value", () => {
    render(
      <MemoryRouter>
        <Home
          handleInput={mockHandleInput}
          handleSearch={mockHandleSearch}
          inputValue="The Office"
          shows={[]}
          showNameSearch=""
        />
      </MemoryRouter>
    );

    // ✅ Verify input shows the provided value
    const input = screen.getByPlaceholderText(/enter your fave show name/i);
    expect(input).toHaveValue("The Office");
  });
});
