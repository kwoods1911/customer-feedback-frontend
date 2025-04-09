import { useState, useEffect } from 'react';
import api from './services/api';
import CustomerFeedbackForm from './components/CustomerFeedbackForm';
import CustomerFeedbackList from './components/CustomerFeedbackList';

function App() {
  const [feedback, setFeedback] = useState([]);
  const [filter, setFilter] = useState('');

  const emojiRatings = [
    { emoji: '🥲', description: 'Terrible', value: 1 },
    { emoji: '😕', description: 'Pretty Bad', value: 2 },
    { emoji: '😐', description: 'Neutral', value: 3 },
    { emoji: '🙂', description: 'Satisfied', value: 4 },
    { emoji: '🤩', description: 'Excellent', value: 5 },
];


  const fetchFeedback = async () => {
    try {
      const res = await api.get(`/feedback${filter ? '?rating=' + filter : ''}`);
      setFeedback(res.data);
    } catch (err) {
      console.error('Error fetching feedback:', err);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [filter]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 container mt-4 mx-auto p-4">

      <div class="text-center">
        <h1 class="text-center text-3xl mt-4 mb-4 underline">LilyPad Customer Feedback</h1>
        <span>Dont be shy tell us how we did !</span>
        <CustomerFeedbackForm onSubmit={fetchFeedback} />
      </div>




      <div class="text-center mt-2">
        <h2 class="text-2xl">Filter Feedback</h2>
        <p class="text-center">Select a rating to filter feedback:</p>

        <select className="mt-2 gap-2" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>

          {emojiRatings.map(({ emoji, description, value }) =>
                    <option key={value} value={value}
                        onClick={() => setRating(value)}
                    >{emoji} : {description} - {value}</option>)}

        </select>
        <div class="text-left">
          <CustomerFeedbackList feedback={feedback} />
        </div>
      </div>





    </div>
  );

}

export default App
