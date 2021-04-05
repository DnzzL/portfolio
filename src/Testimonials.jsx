import leparisien from "./images/leparisien.png";
import lefigaro from "./images/lefigaro.png";
import jinka from "./images/jinka.png";

const Testimonials = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Seen in
            </h1>
            <div className="h-1 w-20 bg-yellow-300 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500"></p>
        </div>
        <div className="flex flex-wrap -m-4">
          <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
            <a
              href="https://www.leparisien.fr/immobilier/encadrement-des-loyers-a-paris-cette-application-epingle-les-annonces-de-location-illegales-04-02-2020-8252145.php"
              target="_blank"
            >
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={leparisien}
                />
                <p className="leading-relaxed">
                  To know directly if the advertisement of an accommodation is
                  illegal: it is possible with the application "l'Encadrement".
                  It allows to display directly on the rental sites, next to the
                  rent amount, the price at which it should legally be rented.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-yellow-300 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  Le Parisien
                </h2>
              </div>
            </a>
          </div>
          <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
            <a
              href="https://immobilier.lefigaro.fr/article/cette-application-verifie-si-votre-loyer-respecte-bien-l-encadrement_d87f2318-2317-11ea-88a9-d2e707b938cd/"
              target="_blank"
            >
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={lefigaro}
                />
                <p className="leading-relaxed">
                  A free extension for your browser retrieves the elements
                  published in the classified ads to ensure that the rent
                  displayed is legal. Simply display a real estate rental ad on
                  your screen to find out immediately if it complies with the
                  rent regulation or not.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-yellow-300 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  Le Figaro
                </h2>
              </div>
            </a>
          </div>
          <div className="lg:w-1/3 lg:mb-0 p-4">
            <a
              href="https://www.facebook.com/LouerAgile/posts/2429261067286129"
              target="_blank"
            >
              <div className="h-full text-center">
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={jinka}
                />
                <p className="leading-relaxed">
                  We recently met with the great team at Encadrement, made of
                  Aymeric and Thomas, who have developed a little Chrome/firefox
                  plugin that is very easy to install and will help you identify
                  ads that don't comply with the law.
                </p>
                <span className="inline-block h-1 w-10 rounded bg-yellow-300 mt-6 mb-4"></span>
                <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                  Jinka (ex Louer Agile)
                </h2>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;