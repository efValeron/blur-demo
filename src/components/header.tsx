'use client'

import { useState } from 'react'

import { Logo } from '@/components/icons/logo'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import useAuth from '@/lib/useAuth'
import { ChartLine, House, LogIn, LogOut, Menu, NotepadText, UserPlus, Wallet } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()

  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const links = [
    {
      title: 'Home',
      href: '/',
      icon: <House className={'size-5'} />,
    },
    {
      title: 'Rates',
      href: '/rates',
      icon: <ChartLine className={'size-5'} />,
    },
    ...(isAuthenticated
      ? [
          {
            title: 'Wallet',
            href: '/wallet',
            icon: <Wallet className={'size-5'} />,
          },
          {
            title: 'Transactions',
            href: '/transactions',
            icon: <NotepadText className={'size-5'} />,
          },
        ]
      : []),
  ]

  return (
    <header
      className={
        'sticky top-0 flex h-16 w-full items-center justify-between gap-4 bg-accent px-10 text-accent-foreground md:h-20 md:justify-normal md:px-14 lg:gap-8 lg:px-20'
      }
    >
      <Link href={'/'} className={'flex items-center gap-2 text-lg font-semibold'}>
        <Logo className={'h-6'} />
        <span className={'sr-only'}>Blur Inc</span>
      </Link>
      <nav className={'ml-6 hidden gap-4 md:flex md:flex-1'}>
        {links.map(({ title, href, icon }) => (
          <>
            <Link
              key={href}
              href={href}
              className={`${
                pathname == href ? 'text-accent-foreground' : 'text-accent-foreground/60'
              } flex items-center gap-3 duration-150 hover:text-accent-foreground lg:px-4 lg:py-2 lg:text-lg`}
            >
              {icon}
              <span>{title}</span>
            </Link>
          </>
        ))}
      </nav>
      {isAuthenticated ? (
        <Button
          variant={'outline'}
          className={'hidden rounded-xl font-medium md:flex lg:ml-auto lg:px-6'}
          onClick={logout}
        >
          <LogOut className={'mr-2 size-4 stroke-[2.25px]'} /> Log out
        </Button>
      ) : (
        <>
          <Button
            asChild
            variant={'outline'}
            className={'hidden rounded-xl font-medium md:flex lg:ml-auto lg:px-6'}
          >
            <Link href={'/auth/login'}>
              <LogIn className={'mr-2 size-4 stroke-[2.25px]'} /> Sign In
            </Link>
          </Button>
          <Button
            asChild
            variant={'outline'}
            className={'hidden rounded-xl font-medium md:flex lg:ml-auto lg:px-6'}
          >
            <Link href={'/auth/signup'}>
              <UserPlus className={'mr-2 size-4 stroke-[2.25px]'} /> Sign Up
            </Link>
          </Button>
        </>
      )}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant={'ghost'} size={'icon'} className={'shrink-0 md:hidden'}>
            <Menu className={'size-8'} />
            <span className={'sr-only'}>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'}>
          <nav className={'grid gap-6 text-lg font-medium'}>
            <Link href={'/'} className={'mb-4 flex items-center gap-2 text-lg font-semibold'}>
              <Logo className={'h-6 fill-accent/85'} />
              <span className={'sr-only'}>Blur Inc</span>
            </Link>
            {links.map(({ title, href, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsSheetOpen(false)}
                className={`${
                  pathname == href ? 'text-foreground' : 'text-muted-foreground'
                } flex items-center gap-3 duration-150 hover:text-foreground`}
              >
                {icon}
                <span>{title}</span>
              </Link>
            ))}
            <Separator />
            {isAuthenticated ? (
              <Button
                variant={'outline'}
                onClick={() => {
                  setIsSheetOpen(false)
                  logout()
                }}
                className={'flex rounded-xl font-medium lg:px-6'}
              >
                <LogOut className={'mr-2 size-4'} /> Log out
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  variant={'outline'}
                  onClick={() => setIsSheetOpen(false)}
                  className={'flex rounded-xl font-medium lg:px-6'}
                >
                  <Link href={'/auth/login'}>
                    <LogIn className={'mr-2 size-4 stroke-[2.25px]'} /> Sign In
                  </Link>
                </Button>
                <Button
                  asChild
                  variant={'outline'}
                  onClick={() => setIsSheetOpen(false)}
                  className={'flex rounded-xl font-medium lg:px-6'}
                >
                  <Link href={'/auth/signup'}>
                    <UserPlus className={'mr-2 size-4 stroke-[2.25px]'} /> Sign Up
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
