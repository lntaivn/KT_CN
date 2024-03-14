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
            const testScheduleData = await getSixNewsByIdCategory(3);
            const learnBurnsData = await getSixNewsByIdCategory(4);
            const tuitionData = await getSixNewsByIdCategory(5);
            const notificationData = await getSixNewsByIdCategory(6);
            const studentHandbookData = await getSixNewsByIdCategory(7);
            const recruitmentData = await getSixNewsByIdCategory(8);
            setTestSchedule(testScheduleData.data);
            setLearnBurns(learnBurnsData.data);
            setTuition(tuitionData.data);
            setNotification(notificationData.data);
            setStudentHandbook(studentHandbookData.data);
            setRecruitment(recruitmentData.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <div className="w-full flex flex-col sm:flex-row sm:bg-green-500">
                <div>
                    <h1 className="text-center">SINH VIÊN SET</h1>
                    <div>
                        <h1>TEST SCHEDULE</h1>
                        {

                            testSchedule.length !== 0 ?
                                testSchedule.map((item) => (
                                    <div key={item.id_new}>
                                        <Link to={`/news/${item.id_new}`}>{item.title_vi}</Link>
                                    </div>
                                ))
                                : 
                                <p>Không có bài viết nào</p>
                        }
                    </div>
                    <div>
                        <h1>LEARN BURNS</h1>
                        {
                            learnBurns.length !== 0 ?
                                learnBurns.map((item) => (
                                    <div key={item.id_new}>
                                        <Link to={`/news/${item.id_new}`}>{item.title_vi}</Link>
                                    </div>
                                ))
                                :
                                <p>Không có bài viết nào</p>
                        }
                    </div>
                    <div>
                        <h1>TUITION</h1>
                        {
                            tuition.length !== 0 ?
                                tuition.map((item) => (
                                    <div key={item.id_new}>
                                        <Link to={`/news/${item.id_new}`}>{item.title_vi}</Link>
                                    </div>
                                ))
                                :
                                <p>Không có bài viết nào</p>
                        }
                    </div>
                    <div>
                        <h1>NOTIFICATION</h1>
                        {
                            notification.length !== 0 ?
                                notification.map((item) => (
                                    <div key={item.id_new}>
                                        <Link to={`/news/${item.id_new}`}>{item.title_vi}</Link>
                                    </div>
                                ))
                                :
                                <p>Không có bài viết nào</p>
                        }
                    </div>
                    <div>
                        <h1>STUDENT HANDBOOK</h1>
                        {
                            studentHandbook.length !== 0 ?
                                studentHandbook.map((item) => (
                                    <div key={item.id_new}>
                                        <Link to={`/news/${item.id_new}`}>{item.title_vi}</Link>
                                    </div>
                                ))
                                :
                                <p>Không có bài viết nào</p>
                        }
                    </div>
                    <div>
                        <h1>RECRUITMENT</h1>
                        {
                            recruitment.length !== 0 ?
                                recruitment.map((item) => (
                                    <div key={item.id_new}>
                                        <Link to={`/news/${item.id_new}`}>{item.title_vi}</Link>
                                    </div>
                                ))
                                :
                                <p>Không có bài viết nào</p>
                        }
                    </div>
                </div>
                <div className="w-[500px] bg-green-500">
                    h1
                </div>
            </div>
        </div>
    )
}

export default StudentSet;


