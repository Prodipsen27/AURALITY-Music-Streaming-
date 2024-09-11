import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create the API slice
export const apiCoreApi = createApi({
  reducerPath: 'shazamCoreApi', // Unique key for this slice of the state in the store
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://spotify23.p.rapidapi.com', // Base URL for the API
    prepareHeaders: (headers) => {
      // Set required headers, including the API key
      headers.set('x-rapidapi-key', '46e5a6b812msh3c92a6747b63cf9p1d1e0ajsncf21310ff06d');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Define an endpoint for fetching top chart recommendations
    getTopCharts: builder.query({
      query: () => '/recommendations/?limit=50&seed_tracks=0VjIjW4GlUZAMYd2vXMi3b',
    }),
    getTop100: builder.query({
      query: () => '/recommendations/?limit=100&seed_tracks=0VjIjW4GlUZAMYd2vXMi3b',
    }),

    // Endpoint for fetching song details by song ID
    getSongDetails: builder.query({
      query: ({ songid }) => `/${'track_lyrics' || 'tracks'}/?${'id' || 'ids'}=${songid}`,
    }),
    getTrackDetails: builder.query({
      query: ({ songid }) => `/${'tracks'}/?${'ids'}=${songid}`,
    }),
    // Endpoint for fetching artist details by artist ID
    getArtistDetails: builder.query({
      query: (id) => `/artists/?ids=${id}`,
    }),
    getArtistSongDetails: builder.query({
      query: (id) => ` /artist_singles/?id=${id}&offset=0&limit=10`,
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `/recommendations/?limit=10&seed_tracks=${songid}&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical`,
    }),
    getSongsByCountry: builder.query({
      query: (country) => `/recommendations/?limit=50&seed_genres=classical,${country}`,
    }),
    getGenre: builder.query({ query: (genre) => `/recommendations/?limit=50&seed_genres=${genre.toLowerCase()}`,
    }),
    getSearch: builder.query({ query: (searchTerm) => `/search/?q=${searchTerm}&type=multi&offset=0&limit=20&numberOfTopResults=2`,
    }),
  }),
});

// Export the automatically generated hook for the queries
export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetArtistDetailsQuery,
  useGetTrackDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistSongDetailsQuery,
  useGetSongsByCountryQuery,
  useGetTop100Query,
  useGetGenreQuery,
  useGetSearchQuery,
} = apiCoreApi;
