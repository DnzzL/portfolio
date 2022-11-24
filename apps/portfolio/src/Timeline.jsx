import tsp from "./assets/images/tsp.png";
import dcu from "./assets/images/dcu.svg";
import mention from "./assets/images/mention.png";
import ornikar from "./assets/images/ornikar.png";

const Timeline = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-6 mx-auto flex flex-wrap">
        <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-yellow-300 text-white relative z-10 title-font font-medium text-sm">
            1
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <img className="object-scale-down w-24 h-24" src={tsp} />
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                Télécom SudParis
              </h2>
              <p className="leading-relaxed">
                Major in Statistical Modelling and Applications
              </p>
              <span className="inline-block rounded bg-yellow-50 text-yellow-500 text-xs font-medium tracking-widest my-">
                2015 - 2018
              </span>
            </div>
          </div>
        </div>
        <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-yellow-300 text-white relative z-10 title-font font-medium text-sm">
            2
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <img className="object-scale-down w-24 h-24" src={dcu} />
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                Dublin City University
              </h2>
              <p className="leading-relaxed">
                Data Science, Cybersecurity, Cloud technologies
              </p>
              <span className="inline-block rounded bg-yellow-50 text-yellow-500 text-xs font-medium tracking-widest my-">
                2017 - 2017
              </span>
            </div>
          </div>
        </div>
        <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-yellow-300 text-white relative z-10 title-font font-medium text-sm">
            3
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <img className="object-scale-down w-24 h-24" src={mention} />
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                Mention
              </h2>
              <p className="leading-relaxed">
                Data Scientist: sentiment analysis, entity recognition,
                knowledge graph
              </p>
              <span className="inline-block rounded bg-yellow-50 text-yellow-500 text-xs font-medium tracking-widest my-">
                2018 - 2020
              </span>
            </div>
          </div>
        </div>
        <div className="flex relative pb-10 sm:items-center md:w-2/3 mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-yellow-300 text-white relative z-10 title-font font-medium text-sm">
            4
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <img className="object-scale-down w-24 h-24" src={ornikar} />
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">
                Ornikar
              </h2>
              <p className="leading-relaxed">
                Data Scientist: dbt stack, driving theory exam success
                prediction
              </p>
              <span className="inline-block rounded bg-yellow-50 text-yellow-500 text-xs font-medium tracking-widest my-">
                2020 - Currently
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Timeline;
