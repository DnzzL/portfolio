import typescript from "./images/typescript.svg";
import vue from "./images/vue.png";
import python from "./images/python.png";
import encadrement from "./images/encadrement.png";
import nodejs from "./images/nodejs.png";
import angular from "./images/angular.png";
import velibetter from "./images/velibetter.png";
import react from "./images/react.png";
import molkky from "./images/molkky.jpeg";
import spookyAuthor from "./images/spooky_author.png";

const Projects = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              My projects
            </h1>
            <div className="h-1 w-20 bg-yellow-300 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500"></p>
        </div>
        <div className="flex flex-wrap -m-4">
          <div className="xl:w-1/4 md:w-1/2 p-4">
            <a href="https://www.encadrement-loyers.fr" target="_blank">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={encadrement}
                  alt="content"
                />
                <div className="md:w-64 md:mb-0 mb-6 flex frex-wrap flex-row content-around">
                  <img
                    className="w-6 h-6 mb-2 mr-3"
                    src={typescript}
                    alt="user image"
                  />
                  <img
                    className="w-6 h-6 mb-2 mr-3"
                    src={vue}
                    alt="user image"
                  />
                  <img
                    className=" w-6 h-6 mb-2"
                    src={nodejs}
                    alt="user image"
                  />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Encadrement Loyers
                </h2>
                <p className="leading-relaxed text-base">
                  This is to inform and warn future tenants that some rents do
                  not respect the rent control.{" "}
                  <span className="font-medium">With Aymeric Dominique.</span>
                </p>
              </div>
            </a>
          </div>
          <div className="xl:w-1/4 md:w-1/2 p-4">
            <a href="https://www.velibetter.fr" target="_blank">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={velibetter}
                  alt="content"
                />
                <div className="md:w-64 md:mb-0 mb-6 flex frex-wrap flex-row content-around">
                  <img
                    className="w-6 h-6 mb-2 mr-3"
                    src={typescript}
                    alt="user image"
                  />
                  <img
                    className="w-6 h-6 mb-2 mr-3"
                    src={angular}
                    alt="user image"
                  />
                  <img
                    className=" w-6 h-6 mb-2"
                    src={python}
                    alt="user image"
                  />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Velibetter
                </h2>
                <p className="leading-relaxed text-base">
                  We wanted to create a more user-friendly alternative and with
                  timeseries predictions.{" "}
                  <span className="font-medium">With Aymeric Dominique.</span>
                </p>
              </div>
            </a>
          </div>
          <div className="xl:w-1/4 md:w-1/2 p-4">
            <a href="https://github.com/DnzzL/molkky" target="_blank">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={molkky}
                  alt="content"
                />
                <div className="md:w-64 md:mb-0 mb-6 flex frex-wrap flex-row content-around">
                  <img
                    className="w-6 h-6 mb-2 mr-3"
                    src={typescript}
                    alt="user image"
                  />
                  <img className="w-6 h-6 mb-2" src={react} alt="user image" />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Mölkky Companion
                </h2>
                <p className="leading-relaxed text-base">
                  PWA to keep track of point and misses during a play of Molkky:
                  works offline, supports undoing a play.
                </p>
              </div>
            </a>
          </div>
          <div className="xl:w-1/4 md:w-1/2 p-4">
            <a
              href="https://www.kaggle.com/tlegrand/happy-halloween"
              target="_blank"
            >
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={spookyAuthor}
                  alt="content"
                />
                <div className="md:w-64 md:mb-0 mb-6 flex frex-wrap flex-row content-around">
                  <img className="w-6 h-6 mb-2" src={python} alt="user image" />
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                  Kaggle: Spooky Author Identification
                </h2>
                <p className="leading-relaxed text-base">
                  The challenge was to predict the author of excerpts from
                  horror stories by E.A. Poe, M Shelley, and HP Lovecraft.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Projects;
