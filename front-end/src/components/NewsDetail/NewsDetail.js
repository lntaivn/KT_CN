
import React , { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./NewsDetail.css"
const NewsDetail = () => {
  const { glug } = useParams();

  const [newsDetailData, setNewsDetailData] = useState([]);
    useEffect(() => {
      axios.get(`http://localhost:8000/news/detail/${glug}`)
      .then(response => {
              setNewsDetailData(response.data);
            })
            .catch(error => {
                console.error('Loi ;', error);
            });
    }, []);

    return (
      <div className='newsDetail'>
        <div className='newsDetail_left'>

        
          <div key={newsDetailData.id}>
            <h2 className='newsDetail_left_title'>{newsDetailData.title}</h2>
            <div>
              {newsDetailData.time_upload}
            </div>
            <div dangerouslySetInnerHTML={{ __html: newsDetailData.content }}></div>

          </div>
        </div>

        <div>
          <div className='New_Relative'>
            <div className='New_Relative_tital'>
              <h2> Tin liên quan</h2>
            </div>
            <div className='New_Relative_top5'>

            </div>
          </div>


          <div>
            
          </div>




          <div>
            
          </div>
        </div>
      </div>
    );
};

export default NewsDetail;
