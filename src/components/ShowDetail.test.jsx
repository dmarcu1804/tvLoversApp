import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import React from "react";
import ShowDetail from "./ShowDetail";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter, Routes, Route } from "react-router-dom";

jest.mock("axios");

describe("ShowDetail - API Response Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays show after pulled from API", async () => {
    // Mock API responses
    axios.get.mockImplementation((url) => {
      if (url.includes("/cast")) {
        return Promise.resolve({ data: [] });
      }
      return Promise.resolve({
        data: {
          id: 169,
          name: "Breaking Bad",
          genres: ["Drama", "Crime"],
          rating: { average: 9.5 },
          image: null,
          summary: "<p>A chemistry teacher turns to crime.</p>",
          premiered: "2008-01-20",
        },
      });
    });

    render(
      <MemoryRouter initialEntries={["/shows/169"]}>
        <Routes>
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // ✅ Check show name is displayed
    const showName = await screen.findByRole("heading", { name: /breaking bad/i });
    expect(showName).toBeInTheDocument();

    // ✅ Check genres are displayed
    expect(await screen.findByText(/Drama, Crime/i)).toBeInTheDocument();

    // ✅ Check rating is displayed
    expect(await screen.findByText(/Rating : 9.5/i)).toBeInTheDocument();

    // ✅ Check summary (HTML stripped out by component)
    expect(await screen.findByText(/A chemistry teacher turns to crime/i)).toBeInTheDocument();

    // ✅ Verify API was called with correct URL
    expect(axios.get).toHaveBeenCalledWith("https://api.tvmaze.com/shows/169");
  });

  it("fetches and displays cast information from API", async () => {
    const mockCast = [
      {
        person: { name: "Bryan Cranston" },
      },
      {
        person: { name: "Aaron Paul" },
      },
    ];

    axios.get.mockImplementation((url) => {
      if (url.includes("/cast")) {
        return Promise.resolve({ data: mockCast });
      }
      return Promise.resolve({
        data: {
          id: 169,
          name: "Breaking Bad",
          genres: ["Drama", "Crime"],
          rating: { average: 9.5 },
          image: null,
          summary: "<p>A chemistry teacher turns to crime.</p>",
        },
      });
    });

    render(
      <MemoryRouter initialEntries={["/shows/169"]}>
        <Routes>
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // ✅ Verify cast API was called
    await screen.findByRole("heading", { name: /breaking bad/i });
    expect(axios.get).toHaveBeenCalledWith("https://api.tvmaze.com/shows/169/cast");

    // ✅ Verify cast names are displayed
    expect(await screen.findByText(/Bryan Cranston/i)).toBeInTheDocument();
    expect(await screen.findByText(/Aaron Paul/i)).toBeInTheDocument();
  });

  it("displays loading message while fetching data", () => {
    axios.get.mockImplementation(() => {
      return new Promise(() => {}); // Never resolves
    });

    render(
      <MemoryRouter initialEntries={["/shows/169"]}>
        <Routes>
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // ✅ Check loading message is shown
    expect(screen.getByText(/Loading…/i)).toBeInTheDocument();
  });

  it("handles missing show image gracefully", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/cast")) {
        return Promise.resolve({ data: [] });
      }
      return Promise.resolve({
        data: {
          id: 169,
          name: "Breaking Bad",
          genres: ["Drama"],
          rating: { average: 9.5 },
          image: null, // No image
          summary: "<p>A chemistry teacher turns to crime.</p>",
        },
      });
    });

    render(
      <MemoryRouter initialEntries={["/shows/169"]}>
        <Routes>
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // ✅ Verify image element exists (should use null image fallback)
    const image = await screen.findByAltText(/pic/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("tvApp_null_big.jpeg");
  });

  it("handles show with image URL from API", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/cast")) {
        return Promise.resolve({ data: [] });
      }
      return Promise.resolve({
        data: {
          id: 169,
          name: "Breaking Bad",
          genres: ["Drama"],
          rating: { average: 9.5 },
          image: {
            original: "https://example.com/breaking-bad.jpg",
          },
          summary: "<p>A chemistry teacher turns to crime.</p>",
        },
      });
    });

    render(
      <MemoryRouter initialEntries={["/shows/169"]}>
        <Routes>
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // ✅ Verify image is displayed with correct URL
    const image = await screen.findByAltText(/pic/i);
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("breaking-bad.jpg");
  });

  it("removes HTML tags from summary text", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/cast")) {
        return Promise.resolve({ data: [] });
      }
      return Promise.resolve({
        data: {
          id: 169,
          name: "Breaking Bad",
          genres: ["Drama"],
          rating: { average: 9.5 },
          image: null,
          summary: "<p>A <strong>chemistry teacher</strong> turns to <em>crime</em>.</p>",
        },
      });
    });

    render(
      <MemoryRouter initialEntries={["/shows/169"]}>
        <Routes>
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // ✅ Verify HTML is stripped and only text remains
    await screen.findByRole("heading", { name: /breaking bad/i });
    expect(screen.getByText(/A chemistry teacher turns to crime/i)).toBeInTheDocument();
    // Verify strong and em tags are not rendered
    expect(screen.queryByRole("strong")).not.toBeInTheDocument();
  });

  it("makes correct API calls for different show IDs", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/cast")) {
        return Promise.resolve({ data: [] });
      }
      return Promise.resolve({
        data: {
          id: 456,
          name: "Game of Thrones",
          genres: ["Drama"],
          rating: { average: 9.2 },
          image: null,
          summary: "<p>Medieval fantasy series.</p>",
        },
      });
    });

    render(
      <MemoryRouter initialEntries={["/shows/456"]}>
        <Routes>
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByRole("heading", { name: /game of thrones/i });

    // ✅ Verify correct URLs were called
    expect(axios.get).toHaveBeenCalledWith("https://api.tvmaze.com/shows/456");
    expect(axios.get).toHaveBeenCalledWith("https://api.tvmaze.com/shows/456/cast");
  });

  it("displays show with no genres", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/cast")) {
        return Promise.resolve({ data: [] });
      }
      return Promise.resolve({
        data: {
          id: 789,
          name: "Test Show",
          genres: [], // No genres
          rating: { average: 8.0 },
          image: null,
          summary: "<p>A test show.</p>",
        },
      });
    });

    render(
      <MemoryRouter initialEntries={["/shows/789"]}>
        <Routes>
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // ✅ Verify show displays even without genres
    const showName = await screen.findByRole("heading", { name: /test show/i });
    expect(showName).toBeInTheDocument();
    expect(await screen.findByText(/A test show/i)).toBeInTheDocument();
  });

  it("handles API errors gracefully", async () => {
    axios.get.mockRejectedValue(new Error("API Error"));
    
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    render(
      <MemoryRouter initialEntries={["/shows/169"]}>
        <Routes>
          <Route path="/shows/:id" element={<ShowDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // ✅ Verify loading state remains while API fails
    expect(screen.getByText(/Loading…/i)).toBeInTheDocument();
    
    // ✅ Verify error was logged
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});