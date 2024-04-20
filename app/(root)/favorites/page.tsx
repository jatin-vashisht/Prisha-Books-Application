import Hero from '@/components/Hero'
import { currentUser } from '@clerk/nextjs';
import React from 'react'

const page = async () => {
  const user = await currentUser();
  return (
    <Hero userId={user?.id || ""} />
  )
}

export default page