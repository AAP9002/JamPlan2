"use client"

import { getJamSession, JamSession } from '@/database/JamSession'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

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
      <div>Add New Member</div>
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