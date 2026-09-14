"use client"
import React from 'react'
import { ReactNode } from 'react'
import QueryProvider from './query.provider'
import GoogleAuthProdiver from './google-auth.prodiver'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleAuthProdiver>
      <QueryProvider>{children}</QueryProvider>
    </GoogleAuthProdiver>
  )
}

export default Providers