import { getUser } from '@/database/User'
import React, {useEffect, useState} from 'react'

const getUserHistories = async (user_id:string) => {
    const user = await getUser(user_id)
    // console.log(user)

    console.log("grabbed user")

    if (user === null) {
        return {s:[],m:[],l:[]}
    }

    if (user.song_list_short_term === undefined || user.song_list_medium_term === undefined || user.song_list_long_term === undefined) {
        return {s:[],m:[],l:[]}
    }
    
    const short_term = JSON.parse(user.song_list_short_term)
    const medium_term = JSON.parse(user.song_list_medium_term)
    const long_term = JSON.parse(user.song_list_long_term)

    const short_term_song_name_list = short_term.items.map((song:any) => song.name)
    const medium_term_song_name_list = medium_term.items.map((song:any) => song.name)
    const long_term_song_name_list = long_term.items.map((song:any) => song.name)

    console.log("hiiiiiiiiiiiiiiiiii")
    console.log(short_term_song_name_list)

    return {s:short_term_song_name_list, m:medium_term_song_name_list, l:long_term_song_name_list}
}

const get_lists = async (user_ids:any[]) => {
    let short:any = []
    let medium:any = []
    let long:any = []

    console.log("user_ids")
    console.log(user_ids)

    for (let i = 0; i < user_ids.length; i++) {
        const user = await getUserHistories(user_ids[i])
        short = short.concat([user.s])
        medium = medium.concat([user.m])
        long = long.concat([user.l])
    }

    return {
        short_term:short,
        medium_term:medium,
        long_term:long}
}
    

const GeminiResponse = ({users}:{users:any[]}) => {
    const [output1, setOutput1] = useState<string>('')
    const [output2, setOutput2] = useState<string>('')

    const call_api = async () => {
        const body = await get_lists(users)

        console.log(body)

        const req = await fetch(`/api/getAI`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          })
      
          console.log(req)
      
          const res = await req.json()
          console.log(res)

            setOutput1(res.out1)
            setOutput2(res.out2)
        
    }
    

    useEffect(() => {
        call_api()
    },[])

  return (
    <div className=' flex gap-10'>
        <div>
            <p className='font-bold text-xl w-1/2'>In the past:</p>
            <p>{output1}</p>
        </div>
        <div>
            <p className='font-bold text-xl w-1/2'>Your Future Jams:</p>
            <p>{output2}</p>
        </div>
    </div>
  )
}

export default GeminiResponse