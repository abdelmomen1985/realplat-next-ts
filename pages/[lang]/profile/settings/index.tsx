import React, { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next';
import { Layout } from '../../../../components/exports'
import ProfileHero from '../../../../components/Profile/ProfileHero'
import { getLocalizationProps } from './../../../../Context/LangContext';
import ProfileTabs from './../../../../components/Profile/ProfileTabs';
import AccountSettings from './../../../../components/Profile/ProfileTabs/AccountSettings';
import PersonalInfo from './../../../../components/Profile/ProfileTabs/PersonalInfo';
import ProfileNotifications from './../../../../components/Profile/ProfileTabs/ProfileNotifications';

const UserSettingsPage = () => {
  const [currentTap, setCurrentTap] = useState<number>(1)
  return (
    <Layout>
      <ProfileHero />
      <ProfileTabs currentTap={currentTap} setCurrentTap={setCurrentTap} >
        {currentTap === 1 && <AccountSettings />}
        {currentTap === 2 && <PersonalInfo />}
        {currentTap === 3 && <AccountSettings />}
        {currentTap === 4 && <ProfileNotifications />}
      </ProfileTabs>
    </Layout>
  )
}

export default UserSettingsPage;
export const getStaticProps: GetStaticProps = async (ctx) => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const localization = getLocalizationProps(ctx, 'common');
  return {
    props: {
      localization,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['en', 'ar'].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
