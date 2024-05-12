'use client'
import { type Metadata } from 'next'
import Image from 'next/image'

import { Card } from '../../components/Card'
import { SimpleLayout } from '../../components/SimpleLayout'
import logoPlanetaria from '../../images/logos/planetaria.svg'
import bookmarksJson from '@/scripts/bookmarks.json'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import clsx from 'clsx'

const projects = [
  {
    name: 'Aceternity',
    description:
      'Copy paste the most trending components and use them in your websites ',
    link: { href: 'https://ui.aceternity.com/', label: 'aceternity.com' },
    logo: logoPlanetaria,
  },
]

function LinkIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ClockIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-alarm-clock-check"
      {...props}
    >
      <circle cx="12" cy="13" r="8" />
      <path d="M5 3 2 6" />
      <path d="m22 6-3-3" />
      <path d="M6.38 18.7 4 21" />
      <path d="M17.64 18.67 20 21" />
      <path d="m9 13 2 2 4-4" />
    </svg>
  )
}

export default function Projects() {
  const FILTER_KEY = 'folder'
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabs = bookmarksJson.map((item) => item.group)
  const [bookmarks, setBookmarks] = useState<any[]>([])

  const activeTab = useMemo(
    () => searchParams.get(FILTER_KEY) || bookmarksJson[0]?.group,
    [searchParams],
  )

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  useEffect(() => {
    const result: any[] =
      bookmarksJson.find((bookmark) => bookmark.group === activeTab)
        ?.children || []
    setBookmarks(result)
  }, [searchParams])

  return (
    <SimpleLayout
      title="Bookmarks"
      intro="Through the grind of daily work and life, I've gathered a collection of incredibly useful web and app tools. Listed here are my top picks that have significantly boosted my productivity."
    >
      <div className="mb-16">
        <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab}
              className={clsx(
                tab === activeTab
                  ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300'
                  : 'text-gray-500 hover:bg-orange-100 hover:text-orange-600 dark:hover:bg-orange-900/40 dark:hover:text-orange-300',
                'cursor-pointer rounded-md px-3 py-2 text-sm font-medium',
              )}
              aria-current={tab === activeTab ? 'page' : undefined}
              onClick={() => {
                router.push(
                  pathname + '?' + createQueryString(FILTER_KEY, tab),
                  { scroll: false },
                )
              }}
            >
              {tab}
            </a>
          ))}
        </nav>
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {bookmarks.map((bookmark) => (
          <Card as="li" key={bookmark.name}>
            <div className="h-16">
              <div className="flex justify-center gap-x-4">
                <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                  <img src={bookmark.icon} className="z-10 h-4 w-4" />
                </div>
                <h2 className="break-all text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  <Card.Link href={bookmark.href} target="_blank">
                    {bookmark.name}
                  </Card.Link>
                </h2>
              </div>
            </div>
            {/*<Card.Description>{bookmark.description}</Card.Description>*/}
            <p className="relative z-10 mt-8 flex w-full justify-between gap-x-4 text-sm font-medium text-zinc-400 transition">
              <span>{/*{new URL(bookmark.href).host}*/}</span>
              <span className="flex items-center">
                <span className="ml-2">
                  {new Date(Number(bookmark.addDate) * 1000).toLocaleDateString(
                    'en-US',
                    {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    },
                  )}
                </span>
              </span>
            </p>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
