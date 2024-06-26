import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import { IoMdSearch } from "react-icons/io";
import JobCard from '../components/JobCard';
import { GrFormNextLink } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { getJobList } from '../redux/slices/jobSlice';
import { toast } from 'sonner';
import { debounce } from 'lodash';


const JobHomePage = () => {
    const accesstoken = useSelector((state) => state.auth.user?.token?.access)

    const jobState = useSelector((state) => state.job)

    const [searchTerm, setSearchTerm] = useState("")
    const dispatch = useDispatch()
    // useEffect(() => {

    //     const getData = async () => {
    //         try {

    //             await dispatch(getJobList({
    //                 token: accesstoken,

    //                 search: searchTerm
    //             })).unwrap()

    //         } catch (error) {
    //             toast.error("Unable to fetch jobs")
    //         }
    //     }
    //     getData()
    // }, [accesstoken, dispatch, searchTerm])


    //Dependencies ([accesstoken, dispatch]):
    //accesstoken: //This dependency ensures that the effect (getData function) will re-run whenever accesstoken changes.
    //dispatch: This is a function provided by Redux that dispatches actions to the Redux store. It’s a dependency because the effect depends on Redux's dispatch function to trigger the getJobList action. I

    // useEffect(() => {
    //     if (accesstoken) {
    //         console.log("Dispatching getJobList with token:", accesstoken); // Debugging line
    //         dispatch(getJobList(accesstoken));
    //     } else {
    //         console.error("No access token found"); // Debugging line
    //     }
    const fetchData = debounce(async (search) => {
        //By using debouncing, you limit the number of API calls and only fetch data after the user has stopped typing for 500 milliseconds, resulting in a more efficient and responsive application.
        try {
            await dispatch(getJobList({
                token: accesstoken,
                search: search
            })).unwrap();
        } catch (error) {
            toast.error('Unable to fetch jobs');
        }
    }, 500);

    useEffect(() => {
        if (accesstoken) {
            fetchData(searchTerm);
        }
    }, [accesstoken, searchTerm]);


    return (
        <div className='ml-5 mr-5'>
            <NavBar />

            <div>
                <p className='text-slate-200 text-2xl font-sans font-normal'>Find Your Dream Job With Us</p>
                <div className="flex items-center bg-slate-900 p-2 rounded-xl mt-3 h-12 w-full border border-sky-900 mb-3">
                    <span className="text-white mr-2 text-lg">
                        <IoMdSearch className=' ml-1' />
                    </span>
                    <input
                        type="text"
                        defaultValue={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent outline-none text-white text-sm placeholder-gray-400  w-full"
                        placeholder="Search jobs here..."
                    />
                </div>
                <div className='flex flex-row justify-between items-center mt-3'>
                    <p className='text-white font-sans font-light text-lg '>Featured Jobs</p>
                    <div className='flex flex-row items-center'><GrFormNextLink className='text-blue-300 text-lg' /><span className='text-white font-sans font-extralight text-xs ml-1'>Show All</span>
                    </div>
                </div>


                {jobState.status === "loading" ? (
                    <div className='text-white'>Loading...</div>
                ) : (
                    jobState.jobList.map((job) => {
                        return <JobCard key={job.id} job={job} />;
                    })
                )}

            </div>
        </div>

    )
}
export default JobHomePage


