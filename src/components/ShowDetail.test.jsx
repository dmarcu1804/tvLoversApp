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

//this does not work
test("should fetch all shows", () => {
  const show = [{name: 'Ted'}];
  const resp = {data: show}

  axios.get.mockResolvedValue(resp);

  console.log(resp)
})

describe("ShowDetail", () => {
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

    // ✅ Query by role (heading with text)
    const showName = await screen.findByRole("heading", { name: /breaking bad/i });
    expect(showName).toBeInTheDocument();

    // ✅ Check genre
    expect(await screen.findByText(/Drama, Crime/i)).toBeInTheDocument();

    // ✅ Check rating
    expect(await screen.findByText(/Rating : 9.5/i)).toBeInTheDocument();

    // ✅ Check summary (HTML stripped out by your component)
    expect(await screen.findByText(/A chemistry teacher turns to crime/i)).toBeInTheDocument();

    // Ensure API was called
    expect(axios.get).toHaveBeenCalledWith("https://api.tvmaze.com/shows/169");
  });
});