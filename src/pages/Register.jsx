import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from '../components/Loader'

function Register() {
    useEffect(() => {
        // Simulate a network request or some async operation
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Adjust the timeout as needed
    }, []);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        fullName: "",
        password: "",
        avatar: null,
        coverImage: null,
    });

    const [registerError, setRegisterError] = useState(null)

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;

        if (type === 'file') {
            // For file inputs (avatar or cover image)
            setFormData({
                ...formData,
                [name]: files[0],  // Store the selected file
            });
        } else {
            // For text inputs
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        // Create a FormData object
        const formToSend = new FormData();
        formToSend.append('email', formData.email);
        formToSend.append('username', formData.username);
        formToSend.append('fullName', formData.fullName);
        formToSend.append('password', formData.password);
        formToSend.append('avatar', formData.avatar);        // Append avatar file
        formToSend.append('coverImage', formData.coverImage); // Append cover image file

        try {
            const response = await axios.post('/api/users/register', formToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Automatically handled, but this is for clarity
                },
            })
            console.log(response.data)
            setIsLoading(false)
            setRegisterError(response.data.message)
            if (response.data.success == true) {
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            setRegisterError(error.response.data.message)
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            {!registerError ? (
                ""
            ) : (
                <div
                    role="alert"
                    className="mb-4 absolute flex w-full p-3 text-sm text-white bg-orange-600 rounded-md"
                >
                    {registerError}
                    <button
                        className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5"
                        type="button"
                        onClick={() => {
                            setRegisterError("");
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-5 w-5"
                        // stroke-width="2"
                        >
                            <path
                                // stroke-linecap="round"
                                // stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>
            )}

            {isLoading ?
                <Loader /> :
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="" alt="logo" />
                        Stream Tube
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
                            </h1>

                            <form className="space-y-4 md:space-y-6" method="post" onSubmit={handleSubmit} >
                                <div className="flex gap-4">
                                    <div>
                                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Username</label>
                                        <input type="text" name="username" id="username" onChange={handleChange} value={formData.username} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email</label>
                                        <input type="email" name="email" id="email" onChange={handleChange} value={formData.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div>
                                        <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Full Name</label>
                                        <input type="fullName" name="fullName" id="fullName" onChange={handleChange} value={formData.fullName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jhon Doe" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" onChange={handleChange} value={formData.password} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div>
                                        <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Avatar</label>
                                        <input type="file" name="avatar" id="avatar" accept="image/*" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Avatar" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="coverImage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Cover Image</label>
                                        <input type="file" name="coverImage" id="coverImage" accept="image/*" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Avatar" required="" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>}
        </section>
    )
}

export default Register;