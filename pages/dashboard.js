// Page.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import SearchBar from './SearchBar';
import DropdownSort from './DropdownSort';
import CalendarComponent from './Calendar';
import axios from 'axios';
import BaseLayout from './component/BaseLayout';

const Dashboard = () => {

  useEffect(() => {
    const fetchPolls = async () => {
    //   axios
    //     .get(`http://159.89.203.190:1000/api/vehicle`)
    //     .then(res => {
    //       setPolls(res.data.data);
    //       console.log(res.data);
    //     })
    //     .catch(error => {
    //       console.log(error.response.data.error);
    //     });
    };

    fetchPolls();
  }, []);

  return (
    <BaseLayout>
        <div>
            <Header />
            <h1>Dashboard</h1>
        </div>
    </BaseLayout>
  );
};

export default Dashboard;
