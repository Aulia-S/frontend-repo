'use client'

import { useAuth } from '@/store/auth/hooks'
import { redirect, usePathname } from 'next/navigation'

export default function Auth() {
  const auth = useAuth()
  const pathname = usePathname()

  if (pathname === '/' && auth.data.user) {
    redirect('/main')
  }

  return null
}

export function CheckAuth() {
  const auth = useAuth()
  const pathname = usePathname()

  if (!auth?.data?.user) {
    redirect('/')
  }

  return null
}
