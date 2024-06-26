import React from 'react'
// import Logo from '../assets/stuverse.png'
import { MdBusinessCenter } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';


const JobCard = ({ job }) => {
    //{ job } is using object destructuring in the function parameter. It extracts the job property from the props object passed to JobCard
    const navigate = useNavigate()
    const timeAgo = formatDistanceToNow(new Date(job.createdAt), { addSuffix: true });

    return (
        <div className='flex flex-col border-gray-600 border bg-zinc-900/50 rounded-3xl mt-2 p-4'>
            <div className='flex flex-row items-center'>
                <img src={job.image} alt="company logo" className='w-14 h-14 rounded-full object-cover border border-gray-600' />
                <div className='flex flex-col ml-2'>
                    <h1 className='text-slate-200 font-sans font-weight-400 text-sm'>{job.title}</h1>
                    <p className='text-gray-400 fonfont-sans font-light text-xs '>{job.companyName}</p>
                </div>

            </div>
            <div className='flex gap-2 mt-3'>
                <div className='flex flex-row border border-gray-500 py-1 px-2 items-center rounded-2xl   bg-gray-800'><MdBusinessCenter className='text-gray-300 text-lg ' /><span className='text-gray-300 font-sans font-light text-xs ml-1  '>{job.jobType}</span></div>
                <div className='flex flex-row border border-gray-500 py-1 px-2 items-center rounded-2xl   bg-gray-800'><MdWorkOutline className='text-gray-300 text-lg ' /><span className='text-gray-300 font-sans font-light text-xs ml-1  '>{job.jobLocationType}</span></div>
            </div >
            <div className='flex items-center mt-3'><FaLocationDot className='text-gray-300 text-tiny' /><span className='ml-1 text-gray-300 text-xs font-sans'>{job.place}</span></div>
            <hr className="mt-3  mx-1 border-gray-600 mb-3" />
            <div className='flex flex-row justify-between items-center '>
                <p className='text-gray-400 fonfont-sans font-light text-xs '>{timeAgo}</p>
                <button className='flex items-center justify-center w-8 h-8 bg-blue-300 rounded-full' onClick={() => {
                    navigate(`/job/${job.id}`)
                }}>
                    <MdNavigateNext className='text-gray-900' />
                </button>



            </div>
        </div>

    )
}

JobCard.propTypes = {
    job: PropTypes.object
}

export default JobCard
