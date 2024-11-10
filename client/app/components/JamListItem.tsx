import Link from 'next/link'
import React from 'react'

const JamListItem = ({name, member_count, date_created, link}:any) => {
  return (
    <div className='border-2 shadow-sm p-3 m--3 flex justify-between'>
        <div>
            <p className='font-bold text-lg'>{name}</p>
            <p>Members: {member_count}</p>
            <p>Created: {date_created} days ago</p>
        </div>
        <div>
            <Link href={link} className='bg-[var(--foreground)] hover:bg-gray-700 text-white p-2 rounded-lg h-full flex gap-5 items-center'>
                Open
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 6H13M9 6V18M21 10H13M21 14H13M21 18H13M3 10L5 12L3 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </Link>
        </div>
    </div>
  )
}

export default JamListItem