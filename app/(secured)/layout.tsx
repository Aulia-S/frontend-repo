'use client'

import { CheckAuth } from '@/components/auth'
import Layout from '@/components/layout'

interface Props {
  children: React.ReactNode
}

export default function SecuredLayout({ children }: Props) {
  return (
    <>
      <CheckAuth />
      <Layout>{children}</Layout>
    </>
  )
}
