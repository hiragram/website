import React from 'react';
import { GetServerSidePropsContext } from 'next';
import generateFeed from '@/libs/generate-rss-feed';

export const getServerSideProps = async ({ res }: GetServerSidePropsContext) => {
    const xml = await generateFeed();

    res.statusCode = 200;

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate"); // 1時間のキャッシュ
    res.setHeader("Content-Type", "text/xml");
    res.end(xml);

    return {
        props: {},
    };
};

const feed = () => null;
export default feed;