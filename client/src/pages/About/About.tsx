import aboutFirstImg from "../../assets/img/cassidy-phillips.jpg";
import aboutSecondImg from "../../assets/img/yan-krukau.jpg";

export const About = () => {
  return (
    <>
      <div className="about">
        <h2 className="font-bold flex justify-center px-4">
          Welcome to Grés: Where Creativity Takes Form
        </h2>
        <article className="flex justify-center flex-col items-center py-6 px-4 lg:px-2 ">
          <section className="flex flex-col md:flex-row py-6 px-4 lg:justify-around ">
            <div className="w-full aspect-square relative  lg:w-2/5">
              <img
                src={aboutFirstImg}
                className="w-full h-full object-fill"
                alt="Woman standing while making clay pot during daytime.Photo by Cassidy Phillips from Unsplash. 
              "
              />
            </div>

            <aside className="inline-block max-w-[400px]  overflow-hidden py-2 px-4 lg:text-lg xl:text-xl">
              <p>
                Immerse yourself in the world of pottery at Grés, a unique
                pottery studio nestled in the heart of Stockholm. Discover the
                art of ceramics in an environment where sophistication meets
                craftsmanship, and each creation is a masterpiece in itself.
              </p>

              <p className=" py-3 ">
                Absorb the scents of the earthy clay and witness the
                transformation of formless material into functional and artistic
                wonders, providing a multisensory experience that goes beyond
                sight and touch.
              </p>
            </aside>
          </section>

          <section className="flex flex-col md:flex-row-reverse py-6 px-4  lg:justify-around">
            <div className="w-full aspect-square relative lg:w-2/5">
              <img
                src={aboutSecondImg}
                alt="Person Making Clay Bowl.Photo by Yan Krukau from Pexels."
                className="w-full h-full object-cover "
              />
            </div>
            <aside className="inline-block max-w-[400px] overflow-hidden px-3 py-4 lg:text-lg xl:text-xl">
              <p>
                Join the Grés Community: Whether you're a curious beginner or an
                experienced potter, Grés welcomes you to join our vibrant
                community. Unearth the artist within, find inspiration in every
                lump of clay, and let Grés be the canvas for your pottery
                masterpiece.
              </p>
              <p className="pt-3 ">
                Discover the art of pottery at Grés Pottery Studio – where
                passion meets clay.
              </p>
            </aside>
          </section>
        </article>
      </div>
    </>
  );
};
