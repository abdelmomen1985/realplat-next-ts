import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Layout from "../components/Layout";

export const allCompounds = gql`
  query MyQuery {
    compounds {
      name
      media
    }
  }
`;
const MyCard = ({ compound }: { compound: any }) => (
  <div className="w-1/3 flex">
    <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg flex-1">
      <img
        className="w-full"
        style={{ maxHeight: "250px" }}
        src={compound.media.card_icon}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <h1 className="text-purple-500 mb-2"> {compound.name.ar}</h1>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  </div>
);
const IndexPage = () => {
  const { data } = useQuery(allCompounds);
  console.log(data);
  return (
    <Layout title="Realstate Brand">
      <div className="flex flex-wrap ">
        {data?.compounds &&
          data.compounds.map((compound: any) => (
            <MyCard key={compound.name.ar} compound={compound} />
          ))}
      </div>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
