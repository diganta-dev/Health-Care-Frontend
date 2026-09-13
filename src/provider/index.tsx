"use client"
import React from 'react'
import { ReactNode } from 'react'
import QueryProvider from './query.provider'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>{children}</QueryProvider>
  )
}

export default Providers