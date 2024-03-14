import { Link } from "react-router-dom";
import bg from "../../assets/img/anna-nekrashevich.jpg";
import featrImg from "../../assets/img/yana-hurska.jpg";
import featrSecondImg from "../../assets/img/yana-hurska-1.jpg";
import wkshpIntroImg from "../../assets/img/arthouse-studio.jpg";
import wkshpSecondIntroImg from "../../assets/img/pew-nguyen.jpg";

export const Home = () => {
  return (
    <>
      {" "}
      <div className="max-h-screen min-h-screen">
        <div
          className="absolute top-0 left-0 w-screen h-full bg-cover bg-center bg-no-repeat "
          aria-label="Overhead Shot of White Vases on a Beige Surface. Photo by Anna Nekrashevich from Pexels
          "
          style={{
            backgroundImage: `url(${bg})`,
          }}
        >
          {" "}
          <span className="sr-only">
            Decorative stones, vases, and a bowl arranged.
          </span>
        </div>
      </div>
      <article className="home flex flex-col -mt-24">
        <section className="workshop-intro bg-white ">
          <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="font-light sm:text-lg md:text-xl">
              <h2 className="font-semibold mb-4 tracking-tight ">
                Molding Art, Firing Passions.{" "}
              </h2>
              <p className="mb-4 ">
                Step into a realm of curated excellence at Grése Studio, where
                the art of pottery becomes an immersive experience in
                refinement. Our workshops are a celebration of elevated
                craftsmanship. Elevate your creative pursuits in an atmosphere
                of refined elegance.
              </p>
              <p>
                Our limited-seating workshops offer personalized attention,
                exquisite materials, and an ambiance designed to inspire the
                connoisseur within you.
              </p>
              <Link
                className="mt-3 underline text-xs font-medium uppercase tracking-wide"
                to="/workshops"
              >
                <button className="font-semibold underline md:text-xl">
                  Read More
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <img
                className="w-full rounded-lg"
                src={wkshpIntroImg}
                alt="A person cutting clay with a tool at a pottery workshop.Photo by ArtHouse Studio from Pexels."
              />
              <img
                className="mt-4 w-full lg:mt-10 rounded-lg"
                src={wkshpSecondIntroImg}
                alt="A person shaping clay with a brush at a pottery workshop.Photo by Pew Nguyen from Unsplash."
              />
            </div>
          </div>
        </section>
        <section className="featured-products mb-16">
          <aside>
            <div className="group relative block">
              <div className="relative h-[350px] sm:h-[450px]">
                <img
                  src={featrImg}
                  alt="Three vases displayed on a table. Photos by Yana Hurska from Unpslash."
                  className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                />

                <img
                  src={featrSecondImg}
                  alt="Three vases displayed on a table closeup. Photos by Yana Hurska from Unpslash."
                  className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                />
              </div>

              <div className="absolute inset-0 flex flex-col items-start justify-end p-4 bg-textBckgColor">
                <p className="font-medium marker:selection:mt-1.5 max-w-[40ch] text-xs md:text-xl ">
                  Explore handcrafted elegance with our curated collections.
                  Discover timeless pottery pieces that effortlessly infuse
                  sophistication into any space.
                </p>
                <Link
                  className="mt-1 inline-block underline text-xs font-medium uppercase tracking-wide"
                  to="/products"
                >
                  <button className="font-semibold underline md:text-xl">
                    Shop now
                  </button>
                </Link>
              </div>
            </div>
          </aside>
        </section>
      </article>
    </>
  );
};
