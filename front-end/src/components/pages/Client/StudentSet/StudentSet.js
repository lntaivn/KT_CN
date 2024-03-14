import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Link, useParams } from "react-router-dom";

import i18next from "i18next";
import { formatDateTime, formatTimeAgo } from "../../../../service/DateService";
import { Image, Tooltip } from "@nextui-org/react";
import { EmailAuthCredential } from "firebase/auth";
import { getSixNewsByIdCategory } from "../../../../service/StudentSetApiService";


const StudentSet = (props) => {
    const [testSchedule, setTestSchedule] = useState([]);
    const [learnBurns, setLearnBurns] = useState([]);
    const [tuition, setTuition] = useState([]);
    const [notification, setNotification] = useState([]);
    const [studentHandbook, setStudentHandbook] = useState([]);
    const [recruitment, setRecruitment] = useState([]);

    const fetchData = async () => {
        try {
            const NewsData = await getSixNewsByIdCategory();
            setTestSchedule(NewsData.data.filter(item => item.id_category === 3));
            setLearnBurns(NewsData.data.filter(item => item.id_category === 4));
            setTuition(NewsData.data.filter(item => item.id_category === 5));
            setNotification(NewsData.data.filter(item => item.id_category === 6));
            setStudentHandbook(NewsData.data.filter(item => item.id_category === 7));
            setRecruitment(NewsData.data.filter(item => item.id_category === 8));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="bg-[#f5f5f5]">
            <div className="p-5 bg-[#ffffff] w-full">
                <h1 className="text-center font-medium	">SINH VIÊN SET</h1>
            </div>

            <div className="flex flex-col sm:p-[30px]  lg:flex-row lg:justify-center p-[20px] gap-[30px] xl:px-[70px] xl:justify-center ">
                <div className="w-full sm:m-auto lg:w-full xl:w-full bg-[#ffffff] p-4">
               
                    <div> 
                        <div className="w-full p-5 bg-[#e95a13] ">
                            <h1 className="text-white text-left font-medium	">TEST SCHEDULE</h1>
                        </div>
                        <div className="w-full py-5 pl-10 flex flex-col gap-[10px]">
                            {
                                testSchedule.length !== 0 ?
                                    testSchedule.map((item) => (
                                        <div key={item.id_new}>
                                            <Link to={`/news-detail/${item.id_new}`}>{item.title_vi}</Link>
                                        </div>
                                    ))
                                    : 
                                    <p>Không có bài viết nào</p>
                            }
                        </div>
                        <div className="w-full py-5 flex justify-end">
                            <Link to={`/news/category/undergraduate/3}`} className="text-yellow-500 font-medium">Read more</Link>
                        </div>
                    </div>
                    <div>
                        <div className="w-full p-5 bg-[#e95a13] ">
                            <h1 className="text-white text-left font-medium	">LEARN BURNS</h1>
                        </div>
                        <div className="w-full py-5 pl-10 flex flex-col gap-[10px]">
                            {
                                learnBurns.length !== 0 ?
                                    learnBurns.map((item) => (
                                        <div key={item.id_new}>
                                            <Link to={`/news-detail/4`}>{item.title_vi}</Link>
                                        </div>
                                    ))
                                    :
                                    <p>Không có bài viết nào</p>
                            }
                        </div>
                        <div className="w-full py-5 flex justify-end">
                            <Link to={`/news/category/undergraduate/4`} className="text-yellow-500 font-medium">Read more</Link>
                        </div>
                    </div>
                    <div>
                        <div className="w-full p-5 bg-[#e95a13] ">
                            <h1 className="text-white text-left font-medium	">TUITION</h1>
                        </div>
                        <div className="w-full py-5 pl-10 flex flex-col gap-[10px]"> 
                            {
                                tuition.length !== 0 ?
                                    tuition.map((item) => (
                                        <div key={item.id_new}>
                                            <Link to={`/news-detail/${item.id_new}`}>{item.title_vi}</Link>
                                        </div>
                                    ))
                                    :
                                    <p>Không có bài viết nào</p>
                            }
                        </div>
                        <div className="w-full py-5 flex justify-end">
                            <Link to={`/news/category/undergraduate/5`} className="text-yellow-500 font-medium">Read more</Link>
                        </div>
                    </div>
                    <div>
                        <div className="w-full p-5 bg-[#e95a13] ">
                            <h1 className="text-white text-left font-medium	">NOTIFICATION</h1>
                        </div>
                        <div className="w-full py-5 pl-10 flex flex-col gap-[10px]">           
                            {
                                notification.length !== 0 ?
                                    notification.map((item) => (
                                        <div key={item.id_new}>
                                            <Link to={`/news-detail/${item.id_new}`}>{item.title_vi}</Link>
                                        </div>
                                    ))
                                    :
                                    <p>Không có bài viết nào</p>
                            }
                        </div>
                        <div className="w-full py-5 flex justify-end">
                            <Link to={`/news/category/undergraduate/6`} className="text-yellow-500 font-medium">Read more</Link>
                        </div>
                    </div>
                    <div>
                        <div className="w-full p-5 bg-[#e95a13] ">
                            <h1 className="text-white text-left font-medium	">STUDENT HANDBOOK</h1>
                        </div>
                        <div className="w-full py-5 pl-10 flex flex-col gap-[10px]">           
                            {
                                studentHandbook.length !== 0 ?
                                    studentHandbook.map((item) => (
                                        <div key={item.id_new}>
                                            <Link to={`/news-detail/${item.id_new}`}>{item.title_vi}</Link>
                                        </div>
                                    ))
                                    :
                                    <p>Không có bài viết nào</p>
                            }
                        </div>
                        <div className="w-full py-5 flex justify-end">
                            <Link to={`/news/category/undergraduate/7`} className="text-yellow-500 font-medium">Read more</Link>
                        </div>
                        
                    </div>
                    <div>
                        <div className="w-full p-5 bg-[#e95a13] ">
                            <h1 className="text-white text-left font-medium	">RECRUITMENT</h1>
                        </div>
                        <div className="w-full py-5 pl-10 flex flex-col gap-[10px]">           
                            {
                                recruitment.length !== 0 ?
                                    recruitment.map((item) => (
                                        <div key={item.id_new}>
                                            <Link to={`/news-detail/${item.id_new}`}>{item.title_vi}</Link>
                                        </div>
                                    ))
                                    :
                                    <p>Không có bài viết nào</p>
                            }
                        </div>
                        <div className="w-full p-5  flex justify-end">
                            <Link to={`/news/category/undergraduate/8`} className="text-yellow-500 font-medium">Read more</Link>
                        </div>
                    </div>
                </div>
                <div className="w-full p-3 bg-[#ffffff]  sm:w-full sm: mx-auto lg:w-[400px]  xl:w-[500px]  ">
                    <div className="w-full p-5 bg-[#e95a13] ">
                        <h1 className="text-white text-left font-medium">TEST SCHEDULE</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentSet;


