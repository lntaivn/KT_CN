import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import './News.css';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const News = () => {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/new')
            .then(response => {
                setNewsData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <div className='News'>
            <div className='New_Gridlayout'>
                {newsData.map(item => (
                    <div key={item.id} className='News_Card'>
                        <Link to={`/news/detail/${item.id}`}>
                            <Card
                                hoverable
                                style={{ width: 340 }}
                                cover={<img alt={item.title} src={item.image} />}
                            >
                                <Meta title={item.title} description={item.description} />
                                <div className='New_list_icon'>
                                    <div className='icon_viewCount'>
                                        <FontAwesomeIcon icon={faEye} />  {item.view_count}
                                    </div>
                                    <div className='icon_timeUpload'>
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                        {item.time_upload}
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
