import React from 'react'

export default function Profile({ userData }) {
  return (
    <div>
      <div>
        <h3 className='h2'>
          Hello {userData?.name}
        </h3>
      </div>
    </div>
  )
}
