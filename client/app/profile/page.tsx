"use client"

import { getSessionUserIdClient } from '@/lib/session/userSession'
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
  return (
    <div>
        <h1>Profile</h1>
        <p>User ID: {userId}</p>
    </div>
  )
}

export default page