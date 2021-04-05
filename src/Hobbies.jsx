import formulaOne from "@images/formula1.jpeg";
import aviron from "@images/aviron.jpeg";
import metz from "@images/metz.jpeg";

const Hobbies = () => {
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-10 mx-auto flex flex-wrap">
        <div class="lg:w-2/3 mx-auto">
          <div class="flex flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4">
            <img
              alt="gallery"
              class="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
              src={formulaOne}
            />
            <div class="text-center relative z-10 w-full">
              <h2 class="text-2xl text-gray-900 font-medium title-font mb-2">
                Motorsports
              </h2>
              <p class="leading-relaxed">
                I'm a big fan of motorsports, and especially Formula 1 and I'm
                taking part in sim racing events in my free time.
              </p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-2">
            <div class="px-2 w-1/2">
              <div class="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative">
                <img
                  alt="gallery"
                  class="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
                  src={aviron}
                />
                <div class="text-center relative z-10 w-full">
                  <h2 class="text-xl text-gray-900 font-medium title-font mb-2">
                    Sports
                  </h2>
                  <p class="leading-relaxed">
                    I enjoy cycling and I used to row and took part in several
                    France championships.
                  </p>
                </div>
              </div>
            </div>
            <div class="px-2 w-1/2">
              <div class="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative">
                <img
                  alt="gallery"
                  class="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
                  src={metz}
                />
                <div class="text-center relative z-10 w-full">
                  <h2 class="text-xl text-gray-900 font-medium title-font mb-2">
                    Metz
                  </h2>
                  <p class="leading-relaxed">
                    Random Fact: I come from Metz, in the east of France, only
                    recently have I been living in Paris.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hobbies;
