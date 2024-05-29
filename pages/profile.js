// Page.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import SearchBar from '../src/app/component/SearchBar';
import DropdownSort from '../src/app/component/DropdownSort';
import CalendarComponent from '../src/app/component/Calendar';
import axios from 'axios';
import BaseLayout from '../src/app/component/BaseLayout';
import Cookies from 'js-cookie';

const Dashboard = () => {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token)
        const fetchPolls = async () => {
            axios
                .get(`http://159.89.203.190:1000/api/vehicle`, { headers: { 'Authorization': `Bearer ${token}`, } })
                .then(res => {
                    setPolls(res.data.data);
                    console.log(res.data);
                })
                .catch(error => {
                    console.log(error);
                });
        };

        fetchPolls();
    }, []);

    return (
        <BaseLayout>
            <div>
                <Header />
                <div>
                    <div className="poll-list">
                        <h1>Profile</h1>
                    </div>

                </div>
            </div>
        </BaseLayout>
    );
};

export default Dashboard;
