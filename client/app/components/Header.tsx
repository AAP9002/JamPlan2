import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import LOGO from '@/public/logo.png'

const Header = () => {
  return (
    <div className='bg-[var(--accent)] p-4 text-black border-b-4 shadow-md flex justify-center text-white' >
      <div className='flex justify-between w-full items-center max-w-[1000px] flex-wrap'>
        <Image src={LOGO} alt='logo' width={200} height={70} className='rounded-md'/> 
        <div className=' flex w-[400px] justify-between p-3'>
          <Link href='/'>Home</Link>
          <Link href='/jams'>Your Jams</Link>
          <Link href='/tunes'>Tunes</Link>
          <Link href='/profile'>Profile</Link>
        </div>
      </div>
    </div>
  )
}

export default Header