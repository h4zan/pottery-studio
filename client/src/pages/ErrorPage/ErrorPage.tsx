import { Link } from "react-router-dom";
import errorBg from "../../assets/img/desert.jpg";

export const ErrorPage = () => {
  return (
    <>
      <div className="error-page flex flex-col h-screen relative">
        <div
          className="w-full relative bg-cover bg-center bg-no-repeat min-h-screen"
          aria-label="Dried soil. Photo by Kelsey Dodyfrom Unsplash"
          style={{
            backgroundImage: `url(${errorBg})`,
          }}
        >
          <article className="flex flex-col justify-center absolute inset-0 items-center m-6 md:m-24">
            <section className="max-w-md flex flex-col p-6 bg-cottonCandy lg:text-2xl">
              <p>
                {" "}
                Oops! It seems like you've stumbled upon a blank canvas. There's
                nothing here at the moment, but don't worry, you're not lost in
                the dessert!
              </p>
              <p>
                {" "}
                Feel free to explore other areas of our pottery haven and
                discover the artistry that awaits.
              </p>
              <Link
                to="/"
                className="flex flex-col justify-center items-center my-3"
              >
                <button className="underline hover:bg-orange-50 ">
                  Contuine to Home Page
                </button>
              </Link>
            </section>
          </article>
        </div>
      </div>
    </>
  );
};
