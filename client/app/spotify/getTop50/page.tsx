"use client"

import React, { useEffect, useState } from 'react'
import { getSessionUserIdClient } from '@/lib/session/userSession'


const page = () => {
    const [result, setResult] = useState<any>(null)

    const getTop50 = async () => {
        const spotify_token = getSessionUserIdClient()

        const req = await fetch(`/api/get50/${spotify_token}`, {
            method: 'GET'
        })

        console.log(req)

        const res = await req.json()
        setResult(res)
    }

    useEffect(() => {
        getTop50()   
    },[])
  return (
    <div>
        {result}
    </div>
  )
}

export default page