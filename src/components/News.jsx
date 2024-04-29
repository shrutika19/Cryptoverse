import React, { useState } from 'react';
import { Card, Typography, Row, Col, Avatar, Select } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../services/cryptoApi'
import { useGetCryptoNewsQuery } from '../services/cryptoNewApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 16 });
    const { data } = useGetCryptosQuery(100);

    if (!cryptoNews) return <Loader />; // Return null if data is not available yet


    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder="Select a Crypto"
                        optionFilterProp='children'
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
                    </Select>
                </Col>
            )}
            {cryptoNews.data.slice(0, simplified ? 6 : 16).map((news, i) => ( // Iterate over the array of news articles
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card
                        hoverable
                        className='news-card'
                        cover={
                            <img
                                alt="news thumbnail"
                                src={news.thumbnail ? news.thumbnail : demoImage}
                            />
                        }                    >
                        <a href={news.url} target='_blank' rel='noreferrer'>
                            <div className='news-content'>
                                <Title level={4} className='news-title'>{news.title}</Title>
                                <Text className='news-description'>{news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}</Text> <br />
                                <Text className='news-date' style={{ fontStyle: 'italic', color: 'gray' }}>
                                    {moment(news.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                </Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default News;
