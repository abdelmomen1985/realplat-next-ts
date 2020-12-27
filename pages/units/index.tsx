import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Layout from "../../components/Layouts/Layout";
import { GetStaticProps } from "next";
import { useApollo, initializeApollo } from "../../lib/apolloClient";
import Carousel from "react-elastic-carousel";

export const allUnits = gql`
  query MyQuery {
    units(limit: 10) {
      id
      bathrooms
      bedrooms
      bua
      sk_city
      fin_total
      fin_monthly_payment
      fin_down_payment
      compound {
        name(path: "ar")
        developer {
          name(path: "ar")
          media(path: "card_icon")
        }
      }
      delivery_month
      delivery_year
      media(path: "photos")
      slug_ar
    }
  }
`;

export type Unit = {
  id: string;
  bathrooms: number;
  bedrooms: number;
  bua: number;
  compound: {
    name: string;
    developer: {
      name: string;
      media: any;
    };
  };
  delivery_month: string | number;
  delivery_year: string | number;
  media: any;
  slug_ar: string;
  sk_city: any;
  fin_total: number;
  fin_monthly_payment: number;
  fin_down_payment: number;
};

const MyCard = ({ unit }: { unit: any }) => (
  <div className="w-1/3 flex">
    <div className="m-2 max-w-sm rounded overflow-hidden shadow-lg flex-1">
      <Carousel
        pagination={false}
        showArrows={false}
        enableAutoPlay={true}
        autoPlaySpeed={1000}
      >
        {unit.media.map((image: any) => {
          return (
            <img
              key={image}
              className="w-full"
              style={{ maxHeight: "250px" }}
              src={image}
              alt="unit image"
            />
          );
        })}
      </Carousel>

      <div className="px-6 py-4">
        <h4 className="text-purple-500 mb-2">{unit.sk_city.name_ar}</h4>
        <p className="text-gray-700 text-base">
          Compound: {unit.compound.name}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Bedrooms: {unit.bedrooms}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Bathrooms: {unit.bathrooms}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Bua: {unit.bua}
        </span>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span>Total Price: {unit.fin_total} Usd</span>
      </div>
      {/* <p>{unit.slug_ar}</p> */}
    </div>
  </div>
);
const UnitsPage = ({ units }: { units: Unit[] }) => {
  return (
    <Layout title="Realstate Brand">
      <div className="flex flex-wrap ">
        {units &&
          units.map((unit: any) => <MyCard key={unit.id} unit={unit} />)}
      </div>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const client = initializeApollo();
  const resp = await client.query({ query: allUnits });
  //const { data } = useQuery(allCompounds);
  const units: Unit[] = resp?.data.units;
  console.log(resp.data.units);
  return { props: { units } };
};

export default UnitsPage;
