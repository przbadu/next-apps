'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedOut } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { sidebarLinks } from '@/constants'

const NavContent = () => {
  const pathname = usePathname()

  return (
    <section className='flex flex-col gap-6'>
      {sidebarLinks.map(item => {
        const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route

        return (
          <div key={item.route}>
            <Link
              href={item.route}
              className={`${isActive ? 'primary-gradient rounded-lg text-light-900' : 'text-dark100_light900'} flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>{item.label}</p>
            </Link>
          </div>
        )
      })}
    </section>
  )
}

const LeftSidebar = () => {
  return (
    <section className='flex justify-between max-h-screen flex-col gap-6 pt-36 px-10 pb-6'>
      <NavContent />


      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
              <span className='primary-text-gradient'>Log In</span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
              Sign Up
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  )
}

export default LeftSidebar
