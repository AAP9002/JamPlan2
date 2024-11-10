"use client"

import { getSessionUserIdClient } from '@/lib/session/userSession'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [userId, setUserId] = useState<string | null>(null)

    const [userData, setUserData] = useState<any>(null)

    const getSpotifyProfile = async () => {
        const spotify_token = getSessionUserIdClient()

        const req = await fetch(`/api/get_user_profile/${spotify_token}`, {
            method: 'GET'
        })

        console.log(req)

        const res = await req.json()

        console.log(res)
        setUserData(res)
    }

    useEffect(() => {
      getSpotifyProfile()
    },[])
  
    if(userData === null){
      return(
        <div>
          <p>Loading...</p>
        </div>
      )
    }
  
  return (
    <div>
      <div className='flex flex-col gap-10 mx-auto w-fit'>
        <Image src={userData.images[0].url} alt="profile image" height={400} width={400} className='rounded-[300px] shadow-md'/>
        <div className='flex flex-col'>
          <p className='text-4xl'>Hello {userData.display_name}!</p>
          <small>{userData.email}</small>
        </div>
        </div>
        
    </div>
  )
}

export default page