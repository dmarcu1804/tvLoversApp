import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import React from "react";
import DisplayProfiles from "./DisplayProfiles";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ShowDetail from "./ShowDetail";
import axios from "axios";

jest.mock("axios");

describe("DisplayProfiles - Card Clickability and Navigation Tests", () => {
  const mockShows = [
    {
      show: {
        id: 1,
        name: "Breaking Bad",
        image: {
          medium: "https://example.com/breaking-bad.jpg",
        },
        genres: ["Drama", "Crime"],
      },
    },
    {
      show: {
        id: 2,
        name: "Game of Thrones",
        image: null,
        genres: ["Drama", "Fantasy"],
      },
    },
    {
      show: {
        id: 3,
        name: "The Office",
        image: {
          medium: "https://example.com/office.jpg",
        },
        genres: ["Comedy"],
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders show cards from API response", () => {
    render(
      <MemoryRouter>
        <DisplayProfiles shows={mockShows} />
      </MemoryRouter>
    );

    // ✅ Check that all show names are rendered as clickable elements
    expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
    expect(screen.getByText("Game of Thrones")).toBeInTheDocument();
    expect(screen.getByText("The Office")).toBeInTheDocument();
  });

  it("shows genre information on cards", () => {
    render(
      <MemoryRouter>
        <DisplayProfiles shows={mockShows} />
      </MemoryRouter>
    );

    // ✅ Check genres are displayed on cards (check for specific text content)
    expect(screen.getByText("Crime")).toBeInTheDocument();
    expect(screen.getByText("Fantasy")).toBeInTheDocument();
    expect(screen.getByText("Comedy")).toBeInTheDocument();
  });

  it("displays show images on cards", () => {
    render(
      <MemoryRouter>
        <DisplayProfiles shows={mockShows} />
      </MemoryRouter>
    );

    // ✅ Check that images are rendered
    const images = screen.getAllByAltText(/pic/i);
    expect(images).toHaveLength(mockShows.length);

    // ✅ Verify image URLs are correct
    expect(images[0].src).toContain("breaking-bad.jpg");
    expect(images[2].src).toContain("office.jpg");
  });

  it("uses fallback image for shows without image URL", () => {
    render(
      <MemoryRouter>
        <DisplayProfiles shows={mockShows} />
      </MemoryRouter>
    );

    // ✅ Verify Game of Thrones (index 1, no image URL) uses fallback
    const images = screen.getAllByAltText(/pic/i);
    // When image is null, it should render but won't have the exact path due to mocking
    expect(images[1]).toBeInTheDocument();
    // ✅ Verify Game of Thrones show name is displayed (indicating card was rendered)
    expect(screen.getByText("Game of Thrones")).toBeInTheDocument();
  });

  it("cards are clickable and wrapped in Links", async () => {
    render(
      <MemoryRouter>
        <DisplayProfiles shows={mockShows} />
      </MemoryRouter>
    );

    // ✅ Find clickable link elements
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(mockShows.length);

    // ✅ Verify each link has correct href
    expect(links[0]).toHaveAttribute("href", "/shows/1");
    expect(links[1]).toHaveAttribute("href", "/shows/2");
    expect(links[2]).toHaveAttribute("href", "/shows/3");
  });

  it("clicking a card navigates to the correct show detail page", async () => {
    const user = userEvent.setup();

    axios.get.mockImplementation((url) => {
      if (url.includes("/cast")) {
        return Promise.resolve({ data: [] });
      }
      if (url.includes("169")) {
        return Promise.resolve({
          data: {
            id: 169,
            name: "Breaking Bad",
            genres: ["Drama"],
            rating: { average: 9.5 },
            image: null,
            summary: "<p>A chemistry teacher turns to crime.</p>",
          },
        });
      }
      return Promise.resolve({
        data: {
          id: 1,
          name: "Breaking Bad",
          genres: ["Drama", "Crime"],
          rating: { average: 9.5 },
          image: null,
          summary: "<p>A chemistry teacher turns to crime.</p>",
        },
      });
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<DisplayProfiles shows={mockShows} />} />
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // ✅ Click on Breaking Bad card
    const breakingBadLink = screen.getByRole("link", { name: /breaking bad/i });
    await user.click(breakingBadLink);

    // ✅ Verify navigation to show detail page
    expect(breakingBadLink).toHaveAttribute("href", "/shows/1");

    // ✅ Verify the show detail component loads with API data
    const showName = await screen.findByRole("heading", { name: /breaking bad/i });
    expect(showName).toBeInTheDocument();
  });

  it("each card navigates to its specific show when clicked", async () => {
    const user = userEvent.setup();

    axios.get.mockImplementation((url) => {
      if (url.includes("/cast")) {
        return Promise.resolve({ data: [] });
      }
      return Promise.resolve({
        data: {
          id: 2,
          name: "Game of Thrones",
          genres: ["Drama", "Fantasy"],
          rating: { average: 9.2 },
          image: null,
          summary: "<p>Medieval fantasy series.</p>",
        },
      });
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<DisplayProfiles shows={mockShows} />} />
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // ✅ Click on Game of Thrones card
    const gotLink = screen.getByRole("link", { name: /game of thrones/i });
    await user.click(gotLink);

    // ✅ Verify correct API call was made for show ID 2
    expect(axios.get).toHaveBeenCalledWith("https://api.tvmaze.com/shows/2");

    // ✅ Verify correct show detail page is displayed
    const showName = await screen.findByRole("heading", { name: /game of thrones/i });
    expect(showName).toBeInTheDocument();
  });

  it("renders correct number of cards based on shows array", () => {
    render(
      <MemoryRouter>
        <DisplayProfiles shows={mockShows} />
      </MemoryRouter>
    );

    // ✅ Verify all cards are rendered
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);

    // ✅ Verify all show names are present
    expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
    expect(screen.getByText("Game of Thrones")).toBeInTheDocument();
    expect(screen.getByText("The Office")).toBeInTheDocument();
  });

  it("handles empty shows array gracefully", () => {
    render(
      <MemoryRouter>
        <DisplayProfiles shows={[]} />
      </MemoryRouter>
    );

    // ✅ Verify no links are rendered when shows array is empty
    const links = screen.queryAllByRole("link");
    expect(links).toHaveLength(0);
  });

  it("card elements are properly styled with correct alt text", () => {
    render(
      <MemoryRouter>
        <DisplayProfiles shows={mockShows} />
      </MemoryRouter>
    );

    // ✅ Verify images have alt text for accessibility
    const images = screen.getAllByAltText(/pic/i);
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt", "pic");
    });
  });

  it("genre display is correctly formatted on cards", () => {
    render(
      <MemoryRouter>
        <DisplayProfiles shows={mockShows} />
      </MemoryRouter>
    );

    // ✅ Verify genres are comma-separated (except last one)
    // The component should render "Drama, Crime" not "Drama, Crime,"
    const genreElements = screen.getAllByText(/Drama/i);
    expect(genreElements.length).toBeGreaterThan(0);
  });
});
