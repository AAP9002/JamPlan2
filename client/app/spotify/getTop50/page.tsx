"use client"

import React, { useEffect, useState } from 'react'
import { getSessionUserIdClient } from '@/lib/session/userSession'
import SongItem from '@/app/components/SongItem'


const page = () => {
    const [result, setResult] = useState<any>(null)

    const getTop50 = async () => {
        const spotify_token = getSessionUserIdClient()

        const req = await fetch(`/api/get50/${spotify_token}`, {
            method: 'GET'
        })

        console.log(req)

        const res = await req.json()
        console.log(res)
        setResult(res)
    }

    useEffect(() => {
        getTop50()   
    },[])
  return (
    <div>
        {result && result.items.map((track: any) => {
            return (
                <div key={track.id}>
                    <SongItem image_uri={track.album.images[0].url} name={track.name} artist={track.artists[0].name} />
                </div>
            )
        })
    }
    </div>
  )
}

export default page