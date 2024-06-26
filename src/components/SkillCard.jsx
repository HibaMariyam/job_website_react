import React from 'react'

const SkillCard = ({ skills }) => {
    return (

        <div className=' border border-gray-500 py-1 px-3 items-center rounded-2xl   bg-gray-800 text-gray-300 font-sans font-light text-xs'>{skills.name}</div>

    )
}

export default SkillCard
