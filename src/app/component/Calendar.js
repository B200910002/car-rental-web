// components/CalendarComponent.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css'; // import styles

const CalendarComponent = ({selectedDateRange, setSelectedDateRange}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const onDateChange = (date) => {
        setSelectedDateRange(date);
        closeModal();
    };

    return (
        <div>
            <div
                onClick={openModal}
                className="py-2 px-4 border rounded calendar"
            >
                {selectedDateRange[0].toLocaleDateString()} - {selectedDateRange[1].toLocaleDateString()}
            </div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Select a Date"
                className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
            >
                <div className="flex flex-col items-center text-black">
                    <Calendar onChange={onDateChange} value={selectedDateRange} selectRange={true} />
                </div>
            </Modal>
        </div>
    );
};


export default CalendarComponent;
