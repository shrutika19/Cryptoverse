import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const { REACT_APP_CRYPTO_RAPIDAPI_HOST_COIN } = process.env;
// const { REACT_APP_RAPIDAPI_KEY_COIN } = process.env;

const cryptoApiHeaders = {
    'X-RapidAPI-Key': '06ead552a0mshb220ae65d4b617ep1d3ddfjsnf2714c62aa59',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'


const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
        }),
    })
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi