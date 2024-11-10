"use client"

import { getJamSession, JamSession } from '@/database/JamSession'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import AddMember from '@/app/components/AddMember'

const page = () => {
  const searchParams = useSearchParams()
 
  const jam_id:any = searchParams.get('jam_id')
  console.log(jam_id)

  const [currentJam, setCurrentJam] = useState<JamSession | null>(null)

  const getJam = async () => {
    const jam = await getJamSession(jam_id)
    setCurrentJam(jam)
  }

  useEffect(() => {
    getJam()
  }, [])

  return ( 
    <div>
      {currentJam?.Name}
      <AddMember jam_id={jam_id}/>
      {currentJam?.Members.map((member) => {
        return (
          <div key={member}>
            {member}
          </div>
        )
      }
      )}

    </div>
  )
}

export default page