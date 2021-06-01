import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next';
import { getLocalizationProps } from './../../../../Context/LangContext';

const MeetingsPage = () => {
  return (
    <div>
      Meetings page
    </div>
  )
}

export default MeetingsPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const localization = getLocalizationProps(ctx, "common");
  return {
    props: {
      localization,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["en", "ar"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};

