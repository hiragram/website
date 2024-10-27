import { ReactNode } from 'react';
import Header from '@/components/header';
import Head from 'next/head';

import { Analytics } from "@vercel/analytics/react"

type Props = { children: ReactNode }

const Layout = ({ children }: Props) => {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>{children}</main>
        </div>
    );
}

export default Layout;