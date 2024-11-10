"use client"

import { useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  return (
    <div>
        <h1>Accept OAuth Link</h1>
        <p>Code: {code}</p>
    </div>
  )
}

export default page