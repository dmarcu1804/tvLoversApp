import {
  apiBaseUrl,
  peopleSearchEndpoint,
  showLookupEndpoint,
  showSearchEndpoint,
  showsEndpoint,
  singleSearchEndpoint,
  alternateShowsEndpoint,
  castEndpoint,
} from './endpoints';

// export const showSearchUrl = (query) =>
//   `${apiBaseUrl}${showSearchEndpoint.replace('{query}', query)}`;
export const singleSearchUrl = (query) =>
  `${apiBaseUrl}${singleSearchEndpoint.replace('{query}', query)}`;
export const peopleSearchUrl = (query) =>
  `${apiBaseUrl}${peopleSearchEndpoint.replace('{query}', query)}`;
export const showLookupUrl = (id) =>
  `${apiBaseUrl}${showLookupEndpoint.replace('{id}', id)}`;

export const scheduleUrl = (params) => {
  let url = `${apiBaseUrl}${scheduleEndpoint}`;
  if (params.country) url = url.replace('{country}', params.country);
  if (params.date) url = url.replace('{date}', params.date);
  return url;
};

export const showDetailsEndpoint = '/shows/{id}?embed=episodes';
export const webScheduleEndpoint = '/schedule/web?date={date}';
export const fullScheduleEndpoint = '/schedule/full?date={date}';
export const topShowsEndpoint = '/shows?page={page}';

// export const showDetailsUrl = (id) =>
//   `${apiBaseUrl}${showDetailsEndpoint.replace('{id}', id)}`;
export const webScheduleUrl = (date) =>
  `${apiBaseUrl}${webScheduleEndpoint.replace('{date}', date)}`;
export const fullScheduleUrl = (date) =>
  `${apiBaseUrl}${fullScheduleEndpoint.replace('{date}', date)}`;
export const topShowsUrl = (page, params) => {
  let url = `${apiBaseUrl}${topShowsEndpoint.replace('{page}', page)}`;
  if (params.genre) url += `&genre=${params.genre}`;
  if (params.rating) url += `&rating=${params.rating}`;
  if (params.premiered) url += `&premiered=${params.premiered}`;
  if (params.language) url += `&language=${params.language}`;
  return url;
};

export const getShows = async () => {
  let url = `${apiBaseUrl}${showsEndpoint}`;
  const response = await fetch(url);
  return await response.json();
};

export const getSearchedShows = async (query) => {
  const url = `${apiBaseUrl}${showSearchEndpoint.replace('{query}', query)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.map((item) => item.show);
};

export const getShowDetails = async (id) => {
  const url = `${apiBaseUrl}${showDetailsEndpoint.replace('{id}', id)}`;
  const response = await fetch(url);
  return await response.json();
};

export const getCast = async (id) => {
  if (!id) return [];
  const url = `${apiBaseUrl}${castEndpoint.replace('{id}', id)}`;
  const response = await fetch(url);
  return await response.json();
};

export const getAlternateShows = async (id) => {
  if (!id) return null;
  const url = `${apiBaseUrl}${alternateShowsEndpoint.replace('{id}', id)}`;
  const response = await fetch(url);
  return await response.json();
};

export const getPeople = async (query) => {
  if (!query) return [];
  const url = `${apiBaseUrl}${peopleSearchEndpoint.replace('{query}', query)}`;
  const response = await fetch(peopleSearchUrl(query));
  return await response.json();
};
