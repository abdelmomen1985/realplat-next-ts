import React from "react";

const ServicesSection = () => {
  return (
    <section className="w-full py-2 px-3 my-2">
      <h2 className="text-main text-center text-2xl md:text-4xl font-semibold">
        How Can mellw help ...
      </h2>
      <div className="my-10 grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-1 gap-5 ">
        <div className="w-4/5 mx-auto flex flex-wrap flex-col justify-center items-center">
          <img src="images/guide-svgs/new-projects.svg" style={{ width: '90px', height: '90px' }} className="max-w-full" />
          <h3 className="text-main text-3xl text-center my-3 font-semibold">
            New Projects
          </h3>
          <small className="text-xs text-center text-black text-opacity-50 my-2">
            With over 1 million+ homes for sale available on the website, Trulia
            can match you with a house you will want to call home.
          </small>
          <button className="btn-primary">Discover Projects</button>
        </div>
        <div className="w-4/5 mx-auto flex flex-wrap flex-col justify-center items-center">
          <img src="images/guide-svgs/value.svg" style={{ width: '90px', height: '90px' }} className="max-w-full" />
          <h3 className="text-main text-3xl text-center my-3 font-semibold">
            Best Value
          </h3>
          <small className="text-xs text-center text-black text-opacity-50 my-2">
            With over 1 million+ homes for sale available on the website, Trulia
            can match you with a house you will want to call home.
          </small>
          <button className="btn-primary">Discover Projects</button>
        </div>
        <div className="w-4/5 mx-auto flex flex-wrap flex-col justify-center items-center">
          <img src="images/guide-svgs/opportunities.svg" style={{ width: '90px', height: '90px' }} className="max-w-full" />
          <h3 className="text-main text-3xl text-center my-3 font-semibold">
            Endless Opportunities
          </h3>
          <small className=" text-xs text-center text-black text-opacity-50 my-2">
            With over 1 million+ homes for sale available on the website, Trulia
            can match you with a house you will want to call home.
          </small>
          <button className="btn-primary">Discover Projects</button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
