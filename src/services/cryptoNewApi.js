import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const { REACT_APP_CRYPTO_RAPIDAPI_HOST_COIN } = process.env;
// const { REACT_APP_RAPIDAPI_KEY_COIN } = process.env;
const cryptoNewsHeaders = {
    'X-RapidAPI-Key': '06ead552a0mshb220ae65d4b617ep1d3ddfjsnf2714c62aa59',
    'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
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