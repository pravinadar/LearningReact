import React from 'react'
import { useContext } from 'react'
import UserContext from '../Context/UserContext'

function Profile() {

  const { User } = useContext(UserContext)

  return (
    <div>
      <h1>Profile</h1>
      {User ? (
        <>
          <p>Username: {User.Username}</p>
          <p>Password: {User.Password}</p>
        </>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  )
}

export default Profile
