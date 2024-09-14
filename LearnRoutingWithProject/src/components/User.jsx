import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const {userid}=useParams()
  return (
    <>
    <div className='text-4xl text-slate-900 bg-slate-300 font-bold p-2'>

    User: {userid}
    </div>
    </>
  )
}

export default User
