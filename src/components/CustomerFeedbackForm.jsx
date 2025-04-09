import { useState } from 'react';
import api from '../services/api';

function CustomerFeedbackForm({ onSubmit }) {
    const [customer_name, setName] = useState('');
    const [customer_rating, setRating] = useState(5);
    const [customer_message, setCustomerFeedback] = useState('');
    const [errors, setErrors] = useState([]);

    // Map emoji to their respective ratings
    // Needs to be refactored
    const emojiRatings = [
        { emoji: '🥲', description: 'Terrible', value: 1 },
        { emoji: '😕', description: 'Pretty Bad', value: 2 },
        { emoji: '😐', description: 'Neutral', value: 3 },
        { emoji: '🙂', description: 'Satisfied', value: 4 },
        { emoji: '🤩', description: 'Excellent', value: 5 },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            await api.post(`/feedback`,{
                customer_name,
                customer_rating,
                customer_message
            });
            setName('');
            setRating(5);
            setCustomerFeedback('');
            onSubmit(); // refresh feedback list
        } catch (err) {
            console.log(err)
            if (err.response && err.response.data.errors) {
                setErrors(Object.values(err.response.data.errors).flat()); // Capture all validation errors
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className='max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4'>
            
            {errors.length > 0 && (
                <div className="text-left bg-red-100 text-red-700 border border-red-400 p-3 rounded">
                    <ul className="list-disc list-inside text-sm list-none">
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <label htmlFor="customer_name">Name: </label>
            <input className='w-full border border-gray-300 rounded px-3 py-2' value={customer_name} name="customer_name" onChange={e => setName(e.target.value)} placeholder="Your name" />
            <br />

            <label htmlFor="customer_rating" className="block font-medium mb-1"> How happy are you with this app ?</label>
            <select  className="flex gap-2" value={customer_rating} name="customer_rating" onChange={e => setRating(e.target.value)}>
                {emojiRatings.map(({ emoji, description, value }) =>
                    <option key={value} value={value}
                        onClick={() => setRating(value)}
                    >{emoji} : {description} - {value}</option>)}
            </select>
            <br />

            <label htmlFor="customer_message" className="block font-medium mb-1">Feedback Message: </label>
            <br />
            <textarea className="w-full border border-gray-300 rounded px-3 py-2 resize-none" value={customer_message} name="customer_message" onChange={e => setCustomerFeedback(e.target.value)} placeholder="Your comments" />
            <br />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Submit</button>
        </form>
    );

}

export default CustomerFeedbackForm;