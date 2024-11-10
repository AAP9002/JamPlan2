import React from 'react'
import Image from 'next/image'

const SongItem = ({image_uri, name, artist}:any) => {
  return (
    <div>
        <Image src={image_uri} alt={name} height={50} width={50} />
        <h1>{name}</h1>
        <h2>{artist}</h2>
    </div>
  )
}

export default SongItem