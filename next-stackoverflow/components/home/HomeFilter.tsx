'use client'

import { HomePageFilters } from '@/constants/filters'
import { Button } from '../ui/button'

const HomeFilter = () => {
  const active = 'recommended';

  return (
    <div className="hidden md:flex flex-row gap-4 flex-1 w-full">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => { }}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${active === filter.value ?
            'bg-primary-100 text-primary-500' :
            'bg-light-800 text-light-500 dark:bg-dark-300'} `}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  )
}

export default HomeFilter
