"use clint"

import { getAllUsers } from '@/database/User'
import React, { useEffect, useState } from 'react'
import { getJamSession, updateJamSession } from '@/database/JamSession'

const AddMember = ({jam_id}:any) => {
    const [users, setUsers] = useState<any[]>([])
    const [selectedUser, setSelectedUser] = useState<string>('')

    const getUsers = async () => {
        const users = await getAllUsers()
        setUsers(users)
    }

    useEffect(() => {
        getUsers()
    },[]);

    const addMember = async () => {
        const currentJam = await getJamSession(jam_id)

        if (!currentJam) {
            console.log('Jam not found')
            return
        }

        let newMembers = [...currentJam.Members, selectedUser]

        // remove duplicates
        const uniqueMembers = new Set(newMembers)
        newMembers = Array.from(uniqueMembers)
        const updatedJam = {...currentJam, Members: newMembers}

        await updateJamSession(jam_id, updatedJam)
        window.location.reload()
    }



    return (
        <div className='w-fit ml-auto flex gap-5'>
            <select onChange={(e: any) => setSelectedUser(e.target.value)}>
                <option value="">Select a user</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.id}</option>
                ))}
            </select>
            <button onClick={addMember} className='bg-[var(--foreground)] hover:bg-gray-700 text-white w-fit ml-auto p-3 rounded-lg m-3 flex items-center gap-5'>Add Member To Jam</button>
        </div>
    );
}

export default AddMember