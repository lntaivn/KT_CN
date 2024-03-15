import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Link, useParams } from "react-router-dom";

import i18next from "i18next";
import { formatDateTime, formatTimeAgo } from "../../../../service/DateService";
import { Image, Tooltip, Select, SelectItem } from "@nextui-org/react";
import { EmailAuthCredential } from "firebase/auth";
import { getSixNewsByIdCategory } from "../../../../service/StudentSetApiService";


const StudentSet = (props) => {
    const [testSchedule, setTestSchedule] = useState([]);
    const [learnBurns, setLearnBurns] = useState([]);
    const [tuition, setTuition] = useState([]);
    const [notification, setNotification] = useState([]);
    const [studentHandbook, setStudentHandbook] = useState([]);
    const [recruitment, setRecruitment] = useState([]);
    const [rules, setRules] = useState([]);
    const [form, setForm] = useState([]);
    const fetchData = async () => {
        try {
            const NewsData = await getSixNewsByIdCategory();
            setTestSchedule(NewsData.data.filter(item => item.id_category === 3));
            setLearnBurns(NewsData.data.filter(item => item.id_category === 4));
            setTuition(NewsData.data.filter(item => item.id_category === 5));
            setNotification(NewsData.data.filter(item => item.id_category === 6));
            setStudentHandbook(NewsData.data.filter(item => item.id_category === 7));
            setRecruitment(NewsData.data.filter(item => item.id_category === 8));
            setRules(NewsData.data.filter(item => item.id_category === 9));
            setForm(NewsData.data.filter(item => item.id_category === 10));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const departmentDataTest = [
        { value: '1', label: 'Department 1' },
        { value: '2', label: 'Department 2' },
        { value: '3', label: 'Department 3' },
    ];

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="bg-[#f5f5f5]">
            <div className="pt-[25px] w-full m-auto">
                <h1 className="text-center font-bold text-4xl text-[#e95a13]">SINH VIÊN SET</h1>
            </div>

            <div className="flex flex-col sm:p-[30px]  lg:flex-row lg:justify-center p-[20px] gap-[30px] xl:px-[70px] xl:justify-center ">
                <div className="w-full flex flex-col gap-[30px] sm:m-auto lg:w-full xl:w-full">
               
                    <div className="p-4 bg-[#ffffff]"> 
                        <div className="w-full p-3 border-[#e95a13] border-l-8 border-y-2  border-r-2 mb-4">
                            <h1 className="text-left text-[#e95a13] font-bold">TEST SCHEDULE</h1>
                        </div>
                        <div className="w-full py-[3px] pl-10 flex flex-col gap-[10px]">
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
                            <div><Link to={`/news/category/undergraduate/3}`} className="text-blue-500 font-medium">Read more</Link></div>
                        </div>
                    </div>
                    <div className="p-4 bg-[#ffffff]">
                        <div className="w-full p-3 border-[#e95a13] border-l-8 border-y-2  border-r-2 mb-4">
                            <h1 className="text-left text-[#e95a13] font-bold">LEARN BURNS</h1>
                        </div>
                        <div className="w-full py-[3px] pl-10 flex flex-col gap-[10px]">
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
                            <div><Link to={`/news/category/undergraduate/4`} className="text-blue-500 font-medium">Read more</Link></div>
                        </div>
                    </div>
                    <div className="p-4 bg-[#ffffff]">
                        <div className="w-full p-3 border-[#e95a13] border-l-8 border-y-2  border-r-2 mb-4">
                            <h1 className="text-left text-[#e95a13] font-bold">TUITION</h1>
                        </div>
                        <div className="w-full py-[3px] pl-10 flex flex-col gap-[10px]"> 
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
                            <div><Link to={`/news/category/undergraduate/5`} className="text-blue-500 font-medium">Read more</Link></div>
                        </div>
                    </div>
                    <div className="p-4 bg-[#ffffff]">
                        <div className="w-full p-3 border-[#e95a13] border-l-8 border-y-2  border-r-2 mb-4">
                            <h1 className="text-left text-[#e95a13] font-bold">NOTIFICATION</h1>
                        </div>
                        <div className="w-full py-[3px] pl-10 flex flex-col gap-[10px]">           
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
                            <div><Link to={`/news/category/undergraduate/6`} className="text-blue-500 font-medium">Read more</Link></div>
                        </div>
                    </div>
                    <div className="p-4 bg-[#ffffff]">
                        <div className="w-full p-3 border-[#e95a13] border-l-8 border-y-2  border-r-2 mb-4">
                            <h1 className="text-left text-[#e95a13] font-bold">STUDENT HANDBOOK</h1>
                        </div>
                        <div className="w-full py-[3px] pl-10 flex flex-col gap-[10px]">           
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
                            <div><Link to={`/news/category/undergraduate/7`} className="text-blue-500 font-medium">Read more</Link></div>
                        </div>
                        
                    </div>
                    <div className="p-4 bg-[#ffffff]">
                        <div className="w-full p-3 border-[#e95a13] border-l-8 border-y-2  border-r-2 mb-4">
                            <h1 className="text-left text-[#e95a13] font-bold">RECRUITMENT</h1>
                        </div>
                        <div className="w-full py-[3px] pl-10 flex flex-col gap-[10px]">           
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
                            <div><Link to={`/news/category/undergraduate/8`} className="text-blue-500 font-medium">Read more</Link></div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-fit flex flex-col gap-[70px] p-5 bg-[#ffffff]  sm:w-full sm: mx-auto lg:w-[400px]  xl:w-[500px] ">
                    <div className="flex flex-col gap-[20px]">
                        <div className="w-full p-3 border-[#e95a13]  border-l-8 border-y-2  border-r-2 ">
                            <h1 className="text-left text-[#e95a13] font-bold">SEARCHING ANSWERS</h1>
                        </div>
                        <Select
                            label = "Selecting a department"
                            placeholder="Select an department"
                            labelPlacement="outside"
                            className="w-full rounded-sm"
                            disableSelectorIconRotation
                            >
                            {departmentDataTest.map((department) => (
                                <SelectItem key={department.value} value={department.value}>
                                {department.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            label = "Selecting a class"
                            placeholder="Select an class"
                            labelPlacement="outside"
                            className="w-full rounded-sm"
                            disableSelectorIconRotation
                            >
                            {departmentDataTest.map((department) => (
                                <SelectItem key={department.value} value={department.value}>
                                {department.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <div className="flex flex-col gap-[20px]">
                        <div className="w-full p-3 border-[#e95a13]  border-l-8 border-y-2  border-r-2 ">
                            <h1 className="text-left text-[#e95a13] font-bold">SYLLABUS</h1>
                        </div>
                        <Select
                            label = "Selecting a department"
                            placeholder="Select an department"
                            labelPlacement="outside"
                            className="w-full rounded-sm"
                            disableSelectorIconRotation
                            >
                            {departmentDataTest.map((department) => (
                                <SelectItem key={department.value} value={department.value}>
                                {department.label}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            label = "Selecting a class"
                            placeholder="Select an class"
                            labelPlacement="outside"
                            className="w-full rounded-sm"
                            disableSelectorIconRotation
                            >
                            {departmentDataTest.map((department) => (
                                <SelectItem key={department.value} value={department.value}>
                                {department.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                    
                    <div className="flex flex-col gap-[20px]">
                        <div className="w-full p-3 border-[#e95a13]  border-l-8 border-y-2  border-r-2 ">
                            <h1 className="text-left text-[#e95a13] font-bold">FORM</h1>
                        </div>

                        <div className="w-full py-[3px] pl-10 flex flex-col gap-[10px]">           
                            {
                                form.length !== 0 ?
                                    form.map((item) => (
                                        <div key={item.id_new}>
                                        <div className="text-blue-500 font-medium" dangerouslySetInnerHTML={{ __html: item.content_vi }} />
                                    </div>
                                    ))
                                    :
                                    <p>Không có bài viết nào</p>
                            }
                        </div>
                    </div>
                   
                    <div className="flex flex-col gap-[20px]">
                        <div className="w-full p-3 border-[#e95a13] border-l-8 border-y-2  border-r-2">
                            <h1 className="text-left text-[#e95a13] font-bold">RULES</h1>
                        </div>
                        <div className="w-full py-[3px] pl-10 flex flex-col gap-[10px]">           
                            {
                                rules.length !== 0 ?
                                rules.map((item) => (
                                        <div key={item.id_new}>
                                            <Link to={`/news-detail/${item.id_new}`}>{item.title_vi}</Link>
                                        </div>
                                    ))
                                    :
                                    <p>Không có bài viết nào</p>
                            }
                        </div>
                        <div className="w-full p-5  flex justify-end">
                            <div><Link to={`/news/category/undergraduate/9`} className="text-blue-500 font-medium">Read more</Link></div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default StudentSet;


