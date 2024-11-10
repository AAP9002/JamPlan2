import React from 'react'
import JamListItem from '../components/JamListItem'

const page = () => {
  return (
    <div className='max-w-[1000px] m-auto'>
        <div className='bg-[var(--foreground)] hover:bg-gray-700 text-white w-fit ml-auto p-3 rounded-lg m-3 flex items-center gap-5'>
            Create New Group
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50" fill='#fff'>
                <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M37,26H26v11h-2V26H13v-2h11V13h2v11h11V26z"></path>
            </svg>
        </div>
        <div className='flex flex-col gap-10'>
            <JamListItem name="Jam Group 1" member_count="3" date_created="2" link="/jams/session/1"/>
            <JamListItem name="Jam Group 2" member_count="4" date_created="4" link="/jams/session/2"/>
            <JamListItem name="Jam Group 3" member_count="5" date_created="5" link="/jams/session/3"/>
            <JamListItem name="Jam Group 4" member_count="6" date_created="2" link="/jams/session/4"/>
        </div>
    </div>
  )
}

export default page