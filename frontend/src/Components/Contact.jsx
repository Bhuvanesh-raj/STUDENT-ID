import React, { useState } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import contactImg from "../images/contactImg.jpg";

const Contact = () => {
    const axiosPrivate = useAxiosPrivate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post('/contact/send', formData);
            setResponseMessage(response.data);
        } catch (error) {
            setResponseMessage(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="flex items-center justify-center p-2">
            <div className="flex items-center justify-center p-2 w-3/4 max-w-4xl bg-white shadow-lg rounded-lg space-x-10">
                <div className="w-1/2">
                    <img src={contactImg} alt="Contact Us" className="w-full h-auto" />
                </div>
                <div className="w-1/2 p-4">
                    <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
                    <p className="mb-4 font-bold">We would love to hear from you. Please send your queries our way!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="text-xl mb-2 font-semibold">
                            <label htmlFor="name" className="block mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="text-xl mb-2 font-semibold">
                            <label htmlFor="email" className="block mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="text-xl mb-2 font-semibold">
                            <label htmlFor="message" className="block mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>
                        <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                            Send
                        </button>
                    </form>
                    {responseMessage && <p className="mt-4">{responseMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default Contact;
