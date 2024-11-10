"use client"

import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { sign_in_user_by_spotify_token } from '@/database/User'
import { setSessionUserIdClient } from '@/lib/session/userSession'

const page = () => {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const [Loading, setLoading] = React.useState(true)

  const get_refresh_token = async (code: string) => {
    const req = await fetch(`/api/getAccessToken?code=${code}`, {
      method: 'GET'
    })

    console.log(req)

    const res = await req.json()
    console.log(res)

    if (res.error) {
      alert(res.error_description)
      setLoading(false)
      return
    }

    if(res.access_token === undefined) {
      alert('Error: Could not get access token')
      setLoading(false)
      return
    }

    const req_id = await fetch(`/api/get_user_profile/${res.access_token}`, {
      method: 'GET'
    })

    console.log(req)

    const res_id = await req_id.json()

    await sign_in_user_by_spotify_token(res.access_token, res_id.id)
    setSessionUserIdClient(res.access_token)
    setLoading(false)
    window.location.href = '/profile'
  }

  useEffect(() => {
    if (code) {
      get_refresh_token(code)
    }
  },[code])

  if (Loading) {
    return (
      <div className='flex w-full h-full justify-center items-center'>
        <b className='text-4xl animate-pulse'>Signing in with spotify...</b>
      </div>
    )
  }

  return (
    <div>
        <h1>Accept OAuth Link</h1>
        <p>Code: {code}</p>
    </div>
  )
}

export default page