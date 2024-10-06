import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContextProvider"
import Cookies from "js-cookie";
import axios from "axios";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import Sidebar from "../components/SideBar";

function UserProfile() {
    useEffect(() => {
        // Simulate a network request or some async operation
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Adjust the timeout as needed
    }, []);
    const { user } = useContext(AuthContext)
    const { username } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [upCiMessage, setupCiMessage] = useState('');
    const [updateCoverFormVisible, setUpdateCoverFormVisible] = useState(false)
    const [userSubs, setUserSubs] = useState({ subscribers: '', subscribedTo: '' })

    async function updateCoverImage(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('coverImage', selectedFile);
        try {
            const response = await axios.patch('/api/users/update-cover-image', formData, {
                headers: {
                    Authorization: `${Cookies.get('authToken')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            Cookies.set("user", JSON.stringify(response.data.data), { expires: 7 });
            setUpdateCoverFormVisible(false)
            setupCiMessage(response.data.message)
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
    }
    useEffect(() => {
        axios.get(`/api/users/c/${username}`, {
            headers: {
                Authorization: `${Cookies.get('authToken')}`,
                // 'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
            // console.log(response.data);
            setUserSubs(prevState => ({
                ...prevState,
                subscribedTo: response.data.data.channelsSubscribedToCount,
                subscribers: response.data.data.subscribersCount
            }))
        }).catch((error) => {
            console.log(error);
        })
    }, [username])
    return (
        <>
            {upCiMessage === '' ? "" :
                <div
                    role="alert"
                    className="mb-4 absolute flex w-full p-3 text-sm text-white bg-green-600 rounded-md"
                >
                    {upCiMessage}
                    <button
                        className="flex items-center justify-center transition-all w-8 h-8 rounded-md text-white hover:bg-white/10 active:bg-white/10 absolute top-1.5 right-1.5"
                        type="button"
                        onClick={() => {
                            setupCiMessage("");
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>}

            <div className="p-4 sm:ml-64">
                {isLoading ?
                    <Loader /> :

                    <div className="flex justify-center">
                        <Sidebar />
                        <div className="max-w-screen-md">
                            <section className="relative pb-4">
                                <div className="relative w-full">
                                    <img src={user.coverImage} alt="cover-image" className="w-full h-80 " />
                                    <button onClick={() => setUpdateCoverFormVisible(true)} className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </button>
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                                        <img src={user.avatar} alt="user-avatar-image" className="w-52 h-52 border-4 border-solid border-white rounded-full " />
                                    </div>
                                </div>
                                <div className="w-full max-w-7xl mx-auto px-6 md:px-8 mt-28">
                                    <h3 className="text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-3">{user.fullName}</h3>
                                    {/* <p className="font-normal text-base leading-7 text-gray-500 text-center mb-8">A social media influencer and singer</p> */}
                                </div>

                                <div className="bg-white overflow-hidden shadow rounded-lg border">

                                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                        <dl className="sm:divide-y sm:divide-gray-200">
                                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Username
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    {user.username}
                                                </dd>
                                            </div>
                                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Email address
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    {user.email}
                                                </dd>
                                            </div>
                                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Account Creation
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    {new Date(user.createdAt).toLocaleString()}
                                                </dd>
                                            </div>
                                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Subscribed to
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    {userSubs?.subscribedTo}
                                                </dd>
                                            </div>
                                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                                <dt className="text-sm font-medium text-gray-500">
                                                    Subscriptions
                                                </dt>
                                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                                    {userSubs?.subscribers}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>}
                {!updateCoverFormVisible ? "" :
                    <div id="popup-modal" tabIndex="-1" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden ">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button onClick={() => setUpdateCoverFormVisible(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-4 md:p-5 text-center">
                                    <form onSubmit={updateCoverImage} action="#" method="post">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                                        <input onChange={(e) => setSelectedFile(e.target.files[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="coverImage" name="coverImage" type="file" />
                                        <button data-modal-hide="popup-modal" type="submit" className=" mt-3 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                            Change Cover Image
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                }</div>
        </>
    )
}

export default UserProfile