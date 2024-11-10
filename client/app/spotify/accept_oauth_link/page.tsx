"use client"

import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { sign_in_user_by_spotify_token } from '@/database/User'
import { setSessionUserIdClient } from '@/lib/session/userSession'

const page = () => {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  const get_refresh_token = async (code: string) => {
    const req = await fetch(`/api/accept_oauth_link/${code}`, {
      method: 'POST'
    })

    const res = await req.json()
    console.log(res)
  }

  useEffect(() => {
    if (code) {
      sign_in_user_by_spotify_token(code)
      setSessionUserIdClient(code)
    }
  },[code])

  return (
    <div>
        <h1>Accept OAuth Link</h1>
        <p>Code: {code}</p>
    </div>
  )
}

export default page