'use client'

import React from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'

interface Props {
  route: string;
  placeholder: string;
  iconPosition: 'LEFT' | 'RIGHT';
  otherClasses?: string;
  imgSrc?: string;
}


const SearchImage = ({ imgSrc }: { imgSrc?: string }) => (
  <Image
    src={imgSrc || '/assets/icons/search.svg'}
    alt='search'
    width={20}
    height={20}
    layout='cursor-pointer'
  />
)

const LocalSearch = ({ route, iconPosition = 'LEFT', imgSrc, placeholder, otherClasses }: Props) => {
  console.log(route)
  return (
    <div className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-xl px-4 ${otherClasses}`}>
      {iconPosition === 'LEFT' ? <SearchImage imgSrc={imgSrc} /> : null}
      <Input
        type='search'
        placeholder={placeholder}
        value=''
        onChange={() => { }}
        className={`paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none`}
      />
      {iconPosition === 'RIGHT' ? <SearchImage imgSrc={imgSrc} /> : null}
    </div>
  )
}

export default LocalSearch
