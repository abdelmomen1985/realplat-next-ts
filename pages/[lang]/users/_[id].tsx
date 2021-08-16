import { GetServerSideProps } from 'next';
import Layout from '../../../components/Layouts/Layout';
import ListDetail from '../../../components/ListDetail';
import { getLocalizationProps } from '../../../Context/LangContext';
import { User } from '../../../interfaces';
import { sampleUserData } from '../../../utils/sample-data';

type Props = {
	item?: User;
	errors?: string;
};

const UserDetail = ({ item, errors }: Props) => {
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

/*
export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  // TODO get locale dynamicaly
  const paths = sampleUserData.map((user) => ({
    params: { id: user.id.toString(), lang: user.lang },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({
  params,
  context,
}: any) => {
  try {
    const id = params?.id;
    const item = sampleUserData.find((data) => data.id === Number(id));
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    const localization = getLocalizationProps(context, "common");
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
*/
export const getServerSideProps: GetServerSideProps = async (context) => {
	try {
		const id = context.params?.id;
		const item = sampleUserData.find((data) => data.id === String(id));
		// By returning { props: item }, the StaticPropsDetail component
		// will receive `item` as a prop at build time
		const localization = getLocalizationProps(context, 'common');
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
export default UserDetail;
