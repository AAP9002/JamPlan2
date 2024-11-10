"use client"

import { getJamSession, JamSession } from '@/database/JamSession'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import AddMember from '@/app/components/AddMember'
import GeminiResponse from '@/app/components/GeminiResponse'

const page = () => {
  const [loading, setLoading] = useState<boolean>(true)

  const searchParams = useSearchParams()
 
  const jam_id:any = searchParams.get('jam_id')
  console.log(jam_id)

  const [currentJam, setCurrentJam] = useState<JamSession | null>(null)

  const getJam = async () => {
    const jam = await getJamSession(jam_id)
    setCurrentJam(jam)
    setLoading(false)
  }

  useEffect(() => {
    getJam()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return ( 
    <div className='p-10 m--10 max-w-[1100px] mx-auto'>
      <p className='font-bold text-4xl'>{currentJam?.Name}</p>
      <AddMember jam_id={jam_id}/>
      <div className='flex gap-5 pb-5'>
        {currentJam?.Members.map((member) => {
          return (
            <div key={member} className='bg-slate-600 p-2 rounded text-white '>
              {member}
            </div>
          )
        })}
      </div>
      

      <GeminiResponse users={currentJam?.Members?currentJam?.Members:[]}/>

    </div>
  )
}

export default page