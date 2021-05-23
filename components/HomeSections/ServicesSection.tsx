import React from "react";

const ServicesSection = () => {
  return (
    <section className="w-full py-2 px-3 my-2">
      <h2 className="text-main text-center text-2xl md:text-4xl font-semibold">
        How Can mellw help ...
      </h2>
      <div className="my-7 grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-1 gap-5 ">
        <div className="flex flex-wrap flex-col justify-center items-center">
          <img src="images/new-projects.png" className="max-w-full" />
          <h3 className="text-main text-2xl text-center my-3 font-medium">
            New Projects
          </h3>
          <small className="text-xs text-center text-black text-opacity-50 my-2">
            With over 1 million+ homes for sale available on the website, Trulia
            can match you with a house you will want to call home.
          </small>
          <button className="btn-primary">Discover Projects</button>
        </div>
        <div className="flex flex-wrap flex-col justify-center items-center">
          <img src="images/value.png" className="max-w-full" />
          <h3 className="text-main text-2xl text-center my-3 font-medium">
            Best Value
          </h3>
          <small className="text-xs text-center text-black text-opacity-50 my-2">
            With over 1 million+ homes for sale available on the website, Trulia
            can match you with a house you will want to call home.
          </small>
          <button className="btn-primary">Discover Projects</button>
        </div>
        <div className="flex flex-wrap flex-col justify-center items-center">
          <img src="images/oportunities.png" className="max-w-full" />
          <h3 className="text-main text-2xl text-center my-3 font-medium">
            Endless Oportunities
          </h3>
          <small className="text-xs text-center text-black text-opacity-50 my-2">
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
