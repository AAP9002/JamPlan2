"use client"

import { getSessionUserIdClient } from '@/lib/session/userSession'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [userId, setUserId] = useState<string | null>(null)

    useEffect(() => {
        setUserId(getSessionUserIdClient())
    },[])
  return (
    <div>
        <h1>Profile</h1>
        <p>User ID: {userId}</p>
    </div>
  )
}

export default page