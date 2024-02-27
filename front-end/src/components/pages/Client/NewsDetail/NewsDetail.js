import React, { useEffect, useState } from "react";
import { GetNewViEnById } from "../../../../service/ApiService";
import { useTranslation } from 'react-i18next';

import { Link, useParams } from "react-router-dom";

import i18next from "i18next";

const NewsDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();


  const [newsDetailData, setNewsDetailData] = useState([]);
  const getDetailNews = async () => {
    try {
        const response = await GetNewViEnById(i18next.language, id);
        console.log("newsDetailData:", response.data);
        setNewsDetailData(response.data);
    } catch (error) {
        console.error("Error fetching newsDetailData:", error);
    }
};

useEffect(() => {
  getDetailNews();
}, [i18next.language]);

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
