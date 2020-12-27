import { GetStaticProps, GetStaticPaths } from 'next';

import { User } from '../../../interfaces';
import { sampleUserData } from '../../../utils/sample-data';
import Layout from '../../../components/Layouts/Layout';
import ListDetail from '../../../components/ListDetail';
import {
  getLocalizationProps,
  LanguageProvider,
} from '../../../Context/LangContext';
import useTranslation from '../../../hooks/useTranslation';

type Props = {
  item?: User;
  errors?: string;
};

const StaticPropsDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${
        item ? item.name : 'User Detail'
      } | Next.js + TypeScript Example`}
    >
      {item && <ListDetail item={item} />}
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const paths = sampleUserData.map((user) => ({
    params: { id: user.id.toString(), lang: locale },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params, ctx }) => {
  try {
    const id = params?.id;
    const item = sampleUserData.find((data) => data.id === Number(id));
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    const localization = getLocalizationProps(ctx, 'common');
    return {
      props: {
        localization,
        item,
      },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
