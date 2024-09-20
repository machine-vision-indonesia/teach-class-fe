import BlankLayout from '@/@core/layouts/BlankLayout'
import LoginPage from '@/components/complexes/login/components/Login'
import { getLayout } from '@/layouts/Layout'
import React, { ReactNode } from 'react'

const Login = () => <LoginPage />

Login.getLayout = (page: ReactNode) => getLayout(<BlankLayout>{page}</BlankLayout>)

export default Login
