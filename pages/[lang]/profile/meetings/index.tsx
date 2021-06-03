import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next';
import { getLocalizationProps } from './../../../../Context/LangContext';
import DatePicker from './../../../../components/common/DatePicker/DatePicker';

const MeetingsPage = () => {
  return (
    <div className="grid grid-cols-5 gap-3 mx-auto my-3 px-5 py-2">
      <DatePicker />
      <div className="mx-auto rounded border shadow-md mt-5 col-span-3 w-full">
        <h3>Hello from table</h3>
      </div>
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

