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

const Page = () => {
  const [polls, setPolls] = useState([]);
  const [days, setDays] = useState(1);
  const [selectedDateRange, setSelectedDateRange] = useState([new Date(), new Date()]);

  useEffect(() => {
    const fetchPolls = async () => {
      axios
        .get(`http://159.89.203.190:1000/api/vehicle`)
        .then(res => {
          setPolls(res.data.data);
          console.log(res.data);
        })
        .catch(error => {
          console.log(error.response.data.error);
        });
    };

    const calcDays = () => {
      setDays(selectedDateRange[1].getDate() - selectedDateRange[0].getDate() + 1);
    };

    fetchPolls();
    calcDays();
  }, [selectedDateRange]);

  const sortOptions = [
    { label: 'A to Z', value: 'aToZ' },
    { label: 'Z to A', value: 'zToA' },
  ];

  const handleSort = (selectedOption) => {
    // Perform sorting logic based on selectedOption
    console.log('Sorting by:', selectedOption);
  };

  const router = useRouter();
  const { page } = router.query;
  const currentPage = parseInt(page, 6) || 1;

  const pollsPerPage = 6;
  const totalPages = Math.ceil(polls.length / pollsPerPage);

  const getPollsForPage = (page) => {
    const startIndex = (page - 1) * pollsPerPage;
    const endIndex = startIndex + pollsPerPage;
    return polls.slice(startIndex, endIndex);
  };


  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handlePageChange = (pageNumber) => {
    router.push(`/${pageNumber}`);
  };

  return (
    <div>
      <Header />
      <div>
        <div className="poll-list">
          <div className='flex justify-between'>
            <SearchBar />
            <CalendarComponent selectedDateRange={selectedDateRange} setSelectedDateRange={setSelectedDateRange} />
            <div>
              Эрэмбэлэх <DropdownSort options={sortOptions} onSelectSort={handleSort} />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {getPollsForPage(currentPage).map((poll) => (
              <div key={poll.id} className="poll-item">
                <div className="flex justify-between">
                  <div className=''>
                    <div className="text-sm text-gray-500">{poll.make.charAt(0).toUpperCase() + poll.make.slice(1)}</div>
                    <div className="font-bold">{poll.model.toUpperCase()}</div>
                  </div>
                  <div className="flex items-center text-xl font-bold">{poll.year.substring(0, 4)}</div>
                </div>
                <div className="flex item-center bg-gray-200 rounded-lg overflow-hidden w-52 h-28">
                  <img src={poll.image} alt={`Image ${poll.id}`} className="w-full h-full object-cover" />
                </div>
                <div className='flex justify-between'>
                  <div>
                    <p className='text-sm'>1 өдөр: {poll.price_per_day} ₮</p>
                    <hr class="border-1 border-gray-400 w-full  my-0" />
                    <p className='text-sm'>Нийт: {poll.price_per_day * days} ₮</p>
                  </div>
                  <div className='flex items-center'>
                    {/* <button type="submit"
                  onClick={() => window.location.href = `/booking/${poll.id}`}
                > */}
                    {/* Захиалах */}
                    {/* </button> */}
                    <Link href={`/booking/${poll.id}`} passHref className="bg-appColor hover:bg-appColor-dark text-white rounded sm:py-1 sm:px-3">
                      Захиалах
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination links */}
      <div className="pagination">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={pageNumber === currentPage ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
