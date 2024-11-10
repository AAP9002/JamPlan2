"use client"

import React, { useEffect } from 'react'
import JamListItem from './components/JamListItem'
import { createJamSession, getAllJamSessions, JamSession } from '@/database/JamSession'
import { getSessionUserIdClient } from '@/lib/session/userSession'
import { getUserBySpotifyToken } from '@/database/User'

const page = () => {

  const [jams, setJams] = React.useState<JamSession[]>([])

  const load_jams = async () => {
    const jams = await getAllJamSessions()
    setJams(jams)
  }

  useEffect(() => {
    load_jams()
  },[])

  const getUserId = async () => {
    const token = getSessionUserIdClient()
    const user = await getUserBySpotifyToken(token?token:"")
    console.log(user)
    return user?.id
  }


  const create_new_session = async () => {
    const current_user_id = await getUserId()

    const random_id = (Math.random()*1000000000).toString()
    const new_session:JamSession = {
      id: random_id,
      createdAt: new Date(),
      Members: [current_user_id?current_user_id:""],
      Songs: [],
      Name: 'New Jam Group'
    }
    await createJamSession(new_session)

    window.location.href = `/jams/session?jam_id=${random_id}`
  }




  return (
    <div className='max-w-[1000px] m-auto'>
        <button className='bg-[var(--foreground)] hover:bg-gray-700 text-white w-fit ml-auto p-3 rounded-lg m-3 flex items-center gap-5' onClick={()=>{create_new_session()}}>
            Create New Group
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50" fill='#fff'>
                <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M37,26H26v11h-2V26H13v-2h11V13h2v11h11V26z"></path>
            </svg>
        </button>
        <div className='flex flex-col gap-10'>
            {jams.map((jam) => {
                return (
                  <div key={jam.id}>
                    <JamListItem name={jam.Name} member_count={jam.Members.length} date_created={"Today"} link={`/jams/session?jam_id=${jam.id}`}/>
                  </div>
                )
            }
            )}
        </div>
    </div>
  )
}

export default page