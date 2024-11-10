"use client"

import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { sign_in_user_by_spotify_token } from '@/database/User'
import { setSessionUserIdClient } from '@/lib/session/userSession'

const page = () => {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

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