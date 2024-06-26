import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import axios from 'axios';
import { AuthContext } from '../src/app/AuthContext';

const AddPoll = () => {
  const { user, setUser } = useContext(AuthContext);

  const [question, setQuestion] = useState('');
  const [startDateTime, setStartDateTime] = useState(new Date().toISOString().slice(0, -8)); // Set default to current time
  const [endDateTime, setEndDateTime] = useState('');
  const [choices, setChoices] = useState(['', '']);

  const handleAddChoice = () => {
    setChoices([...choices, '']);
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  const router = useRouter();

  const handlePollSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is logged in
    if (!user) {
      console.log('You are not logged in');
      return;
    }

    // Format the date and time strings
    const startDateTimeFormatted = `${startDateTime}:00`;
    const endDateTimeFormatted = `${endDateTime}:00`;

    try {
      // Submit the poll data to the backend
      const response = await axios.post(
        'http://localhost:8001/poll/createPoll',
        {
          question: question,
          startdate: startDateTimeFormatted,
          expiredate: endDateTimeFormatted,
          answer: choices,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Reset the form
      setQuestion('');
      setStartDateTime('');
      setEndDateTime('');
      setChoices(['', '']);

      // Go back to the index page or any other desired page
      router.push('/');
    } catch (error) {
      console.log('Error submitting poll:', error);
    }
  };

  return (
    <div className="card">
      <Header />
      <h1>Add Poll</h1>
      {user ? (
        <form onSubmit={handlePollSubmit}>
          <label>
            Question:
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </label>
          <label>
            Start Date & Time:
            <input
              type="datetime-local"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              required
            />
          </label>
          <label>
            End Date & Time:
            <input
              type="datetime-local"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              required
            />
          </label>
          <label>
            Choices:
            {choices.map((choice, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddChoice}>
              Add Choice
            </button>
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>You are not logged in</p>
      )}
    </div>
  );
};

export default AddPoll;
