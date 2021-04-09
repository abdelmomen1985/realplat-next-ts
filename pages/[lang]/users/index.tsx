import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../../../components/Layouts/Layout";
import List from "../../../components/List";
import { getLocalizationProps } from "../../../Context/LangContext";
import { User } from "../../../interfaces";
import { sampleUserData } from "../../../utils/sample-data";
type Props = {
  items: User[];
};

const WithStaticProps = ({ items }: Props) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Users List</h1>
    <p>
      Example fetching data from inside <code>getStaticProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export const getStaticProps: GetStaticProps = async (ctx) => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const items: User[] = sampleUserData;
  const localization = getLocalizationProps(ctx, "common");
  return {
    props: {
      localization,
      items,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["en", "ar"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
export default WithStaticProps;
