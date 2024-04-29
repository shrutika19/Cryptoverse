import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const { REACT_APP_CRYPTO_RAPIDAPI_HOST_COIN } = process.env;
const { REACT_APP_RAPIDAPI_KEY_COIN } = process.env;
const cryptoNewsHeaders = {
    'X-RapidAPI-Key': REACT_APP_RAPIDAPI_KEY_COIN,
    'X-RapidAPI-Host': REACT_APP_CRYPTO_RAPIDAPI_HOST_COIN
}


const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com/v1'

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders })

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: (count) => createRequest(`/coindesk?count=${count}`),
        })
    })
})


export const { useGetCryptoNewsQuery } = cryptoNewsApi