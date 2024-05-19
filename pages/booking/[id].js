import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../Header';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
//anything
const Booking = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useContext(AuthContext);
  const [poll, setPoll] = useState();
  const [answers, setAnswers] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (id) {
      axios
        .get(`http://159.89.203.190:1000/api/vehicle/${id}`)
        .then(res => {
          setPoll(res.data.data);
          console.log(res.data);
        })
        .catch(error => {
          console.log(error.response.data.error);
        });
    }
  }, [id]);


  // replace with comment data logic
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [comment, setComment] = useState('');
  // const [comments, setComments] = useState([
  //   { username: 'John Doe', comment: 'Lorem ipsum dolor sit amet.', datetime_posted: '2023-06-05 09:30:00' },
  //   { username: 'Jane Smith', comment: 'Fusce sagittis urna in diam luctus eleifend.', datetime_posted: '2023-06-06 14:45:00' },
  // ]);

  const handleAnswerSelection = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8001/attendance/${id}/createPollAttendance/${selectedAnswer}`, {
      //answerId: selectedAnswer,
    }, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    setSelectedAnswer('');
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    axios({
      url: `http://localhost:8001/comment/createComment/${id}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      data: {
        comment: comment,
      },
    })
      .then((res) => {
        login(res.data.token); // call the login function from AuthContext
        console.log(res);
      })
      .catch((err) => {
        //setErrorMessage("Comment add failed"); // Set error message
        console.log(err);
      });
    setComment('');
  };

  const handleViewResults = () => {
    router.push(`/poll/${id}/result`);
  };

  return (
    poll ?
      <div className="container">
        <Header />
        <h1 className="text-3xl font-bold mb-4">Poll Details</h1>
        <form onSubmit={handleAnswerSubmit}>
          <div className='flex justify-between'>
            <div className="">
              <div>{poll.plate_number}</div>
              <div>{poll.make}</div>
              <div>{poll.model}</div>
              <div>{poll.year.substring(0, 4)}</div>
              <div></div>
            </div>
            <div className="">
              <div>1 өдрийн {poll.price_per_day} ₮</div>
              <div>Өдөрт {poll.kilometer_per_Day} км явах</div>
              <div>1 км хэтрэх тутамд {poll.price_exceed_per_kilometer} ₮</div>
              <div>НИЙТ ДҮН {poll.year.substring(0, 4)} ₮</div>
              <div></div>
            </div>
          </div>

          {selectedAnswer && (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAnswerSubmit}>
              Submit Answer
            </button>
          )}

          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleViewResults}
          >
            View results
          </button>
        </form>
        <div className="comment-container">
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <div className="mb-4">
              <label htmlFor="comment">Write comment</label>
              <textarea
                id="comment"
                className="text-input"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Enter your comment"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

            >
              Add Comment
            </button>
          </form>

          <div className="comment-list">
            <h3 className="text-lg font-bold mb-2">Comments:</h3>
            {comments.map((comment, index) => (
              <div key={index} className="mb-4 comment-item">
                <div className="username font-bold">{comment.username}</div>
                <div>{comment.comment}</div>
                <div>{comment.createdAt}</div>
                <div className="datetime-posted text-sm text-gray-500">{comment.datetime_posted}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      : "loading..."
  );

};

export default Booking;
