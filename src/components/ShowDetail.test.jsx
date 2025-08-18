import React from "react";
import ShowDetail from './ShowDetail';
import { screen, render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios';
import nullImageBig from '.././tvApp_null_big.jpeg'
import {
  fetchingShowDisplay, showDetailText, summaryFormat, ratingFormat, starringFormat
} from ".././elements.module.css";

jest.mock('axios')

describe('ShowDetail', () => {
    it('display show after pulled from API', async () => {
        axios.get.mockResolvedValue({ data: {name:'Breaking Bad', id: 169} });

        render(<ShowDetail />);

        fireEvent.change(screen.getByPlaceholderText(/show id/i), {
            target: {value: '169'}
        });

        fireEvent.click(screen.getByText(/fetch show/i));

        const showName = await screen.findByTestId('show-name')
        expect(showName).toHaveTextContent('Breaking Bad')

        expect(axios.get).toHaveBeenCalledWith(
            'https://api.tvmaze.com/shows/169'
        );
    })
})