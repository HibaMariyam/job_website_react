import React, { useEffect } from 'react'
import { GrFormPrevious } from 'react-icons/gr'
import { MdBusinessCenter, MdDeleteOutline, MdOutlineEdit } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getJobDetails } from '../redux/slices/jobSlice'
import { toast } from 'sonner'
import SkillCard from '../components/SkillCard'
import { Button } from '@nextui-org/react'


const DetailPage = () => {
    const navigate = useNavigate()
    const accesstoken = useSelector((state) => state.auth.user?.token?.access)

    const jobState = useSelector((state) => state.job)

    const dispatch = useDispatch()

    const { id } = useParams()
    //Extracting `id` from URL params
    useEffect(() => {

        const getDetails = async () => {
            try {
                await dispatch(getJobDetails({ token: accesstoken, id: id })).unwrap()

            } catch (error) {
                toast.error("Unable to fetch job details")
            }
        }
        getDetails()
    }, [accesstoken, dispatch])

    if (jobState.status === "loading") { return <div className='text-white'>Loading...</div> }
    if (jobState.status === "failure" || !jobState.selectedJob) {
        return <div className='text-white'>
            No job found
        </div>
    }

    return (

        <>
            <div>
                <div className="flex  items-center pt-4 pl-2 pr-2">
                    <div >
                        <button
                            onClick={() => {
                                navigate("/home")
                            }}
                            className='mt-2'>
                            <GrFormPrevious className="text-white text-lg" />
                        </button>

                        <div className="flex-grow"></div> { }
                    </div>
                    <div className="flex-grow flex justify-center">
                        <p className='text-slate-300 font-sans font-weight-300 text-lg'>Job Details</p>
                    </div>
                    <div className="flex justify-end">
                        <div className="flex-grow"></div> { }
                        <MdOutlineEdit className="text-white text-lg mr-1" />
                        <MdDeleteOutline className="text-white text-lg mr-1 ml-4" />
                    </div>
                </div >

                <div className='p-4'>
                    <div className='flex flex-row '>
                        <img src={jobState.selectedJob.image} alt="company logo" className='w-24 h-24 rounded-lg object-cover border border-gray-600' />
                        <div className='flex flex-col mt-2 ml-3'>
                            <h1 className='text-slate-300 font-sans font-weight-400 text-sm mb-1'>{jobState.selectedJob.companyName}</h1>
                            <p className='text-gray-400 fonfont-sans font-light text-xs '>{jobState.selectedJob.place}</p>
                            <div className='flex border border-gray-500 py-1 px-2  items-center rounded-lg  mt-2 bg-gray-800 w-fit'><MdBusinessCenter className='text-gray-300 text-lg ' /><span className='text-gray-300 font-sans font-light text-xs ml-1  '>{jobState.selectedJob.jobType}</span></div>
                        </div>
                    </div>
                    <hr className="mt-3  mx-1 border-gray-600 mb-3" />
                    <h1 className='text-slate-300 font-sans font-weight-400 text-sm mb-1'>Skills Required:</h1>

                    <div className='flex flex-row flex-wrap gap-2 mt-3'>
                        {jobState.selectedJob.skills.map((skill) => {
                            return <SkillCard key={skill.id} skills={skill} />
                        })}

                    </div>


                    <p className='text-slate-300 font-sans font-light text-2xl mb-1 mt-3'>{jobState.selectedJob.title}</p>

                    <p className='text-slate-300 font-sans font-light text-md mb-1 mt-3'>About the Role</p>

                    <p className='text-slate-300 font-sans font-light text-xs mb-1 mt-3'>{jobState.selectedJob.description}</p>
                    <Button className="fixed bottom-4 left-2 right-2 w-auto h-10 bg-slate-800 text-white rounded-3xl flex items-center justify-center hover:bg-slate-700">
                        Apply Now
                    </Button>

                </div>


            </div>

        </>

    )
}

export default DetailPage
