

function CustomerFeedbackList({ feedback }) {
    const getEmoji = (rating) => {
        const emojis = ['🥲', '😕', '😐', '🙂', '🤩'];
        return emojis[rating - 1] || '';
    };


    if (!feedback.length) return <p className="text-gray-500 text-center mt-4">No feedback yet.</p>;

    return (
        <ul className="mt-6 space-y-4 w-1/2 mx-auto">
            {feedback.slice(0, 10).map(item => (
                <li key={item.id} className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">
                    <span className="mt-2 text-gray-700"> Customer:{item.customer_name}</span >
                    <p className="mt-1 text-sm text-gray-400">Rating: {getEmoji(item.customer_rating)}
                    </p>

                    <p className="mt-2 text-gray-700">
                        <span>Message:</span>
                        <br />
                        {item.customer_message}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                        Submitted at: {new Date(item.created_at).toLocaleString()}
                    </p>

                </li>
            ))}
        </ul>
    );

}


export default CustomerFeedbackList;