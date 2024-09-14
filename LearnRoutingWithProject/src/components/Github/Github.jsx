import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    // Method 2 . for this checkout the main.jsx
    // we can load the api in the route aswell with this method

    const data = useLoaderData()

    // **Method 1**
    // const [data, setData] = useState([])
    // useEffect(() => {
    //  fetch('https://api.github.com/users/pravinadar')
    //  .then(response => response.json())
    //  .then(data => {
    //     console.log(data);
    //     setData(data)
    //  })
    // }, [])
    
  return (
    <div className='text-center m-4 bg-orange-200 text-slate-800 font-semibold p-4 text-3xl'>Github followers: {data.followers}
    <img className='m-auto rounded-2xl shadow-lg mt-3' src={data.avatar_url} alt="Git picture" width={300} />
    </div>
  )
}

export default Github

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/pravinadar')
    return response.json()
}