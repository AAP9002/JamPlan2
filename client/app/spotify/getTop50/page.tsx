"use client"

import React, { useEffect, useState } from 'react'
import { getSessionUserIdClient } from '@/lib/session/userSession'
import SongItem from '@/app/components/SongItem'
import { getUserBySpotifyToken, updateUser } from '@/database/User'


const page = () => {
    const [shortResults, setShortResults] = useState<any>(null)
    const [medResults, setMedResults] = useState<any>(null)
    const [longResults, setLongResults] = useState<any>(null)

    const recordOnUserRecordShort = async (data:any) => {
        const spotify_token:any = getSessionUserIdClient()

       const user = await getUserBySpotifyToken(spotify_token)
        console.log(user)

        const modUser = {
            ...user,
            song_list_short_term: JSON.stringify(data)
        }

        if(user)
            await updateUser(user.id, modUser)
    }
    const recordOnUserRecordMed = async (data:any) => {
        const spotify_token:any = getSessionUserIdClient()

       const user = await getUserBySpotifyToken(spotify_token)
        console.log(user)

        const modUser = {
            ...user,
            song_list_medium_term: JSON.stringify(data)
        }

        if(user)
            await updateUser(user.id, modUser)
    }

    const recordOnUserRecordLong = async (data:any) => {
        const spotify_token:any = getSessionUserIdClient()

       const user = await getUserBySpotifyToken(spotify_token)
        console.log(user)

        const modUser = {
            ...user,
            song_list_long_term: JSON.stringify(data)
        }

        if(user)
            await updateUser(user.id, modUser)
    }

    const getTop50Short = async () => {
        const spotify_token = getSessionUserIdClient()

        const req = await fetch(`/api/get50/${spotify_token}`, {
            method: 'GET'
        })

        console.log(req)

        const res = await req.json()
        console.log(res)
        await recordOnUserRecordShort(res)
        return res
    }

    const getTop50med = async () => {
        const spotify_token = getSessionUserIdClient()

        const req = await fetch(`/api/get50Medium/${spotify_token}`, {
            method: 'GET'
        })

        console.log(req)

        const res = await req.json()
        console.log(res)
        await recordOnUserRecordMed(res)
        return res
    }

    const getTop50long = async () => {
        const spotify_token = getSessionUserIdClient()

        const req = await fetch(`/api/get50Long/${spotify_token}`, {
            method: 'GET'
        })

        console.log(req)

        const res = await req.json()
        console.log(res)
        await recordOnUserRecordLong(res)
        return res
    }

    const run_all_gets = async () => {
        setShortResults(await getTop50Short())
        setMedResults(await getTop50med())
        setLongResults(await getTop50long())
    }

    useEffect(() => {
        run_all_gets()
    },[])

  return (
    <div className='flex mx-auto gap-3 justify-between max-w-[1300px] w-full'>
        <div>
            <p className='font-bold text-lg'>Last 3 months</p>
            {shortResults && shortResults.items.map((track: any) => {
                return (
                    <div key={track.id}>
                        <SongItem image_uri={track.album.images[0].url} name={track.name} artist={track.artists[0].name} />
                    </div>
                )
            })
        }
        </div>
        <div>
            <p className='font-bold text-lg'>Last 6 months</p>
            {medResults && medResults.items.map((track: any) => {
                return (
                    <div key={track.id}>
                        <SongItem image_uri={track.album.images[0].url} name={track.name} artist={track.artists[0].name} />
                    </div>
                )
            })
        }
        </div>
        <div >
            <p className='font-bold text-lg'>Last Year</p>
            {longResults && longResults.items.map((track: any) => {
                return (
                    <div key={track.id}>
                        <SongItem image_uri={track.album.images[0].url} name={track.name} artist={track.artists[0].name} />
                    </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default page