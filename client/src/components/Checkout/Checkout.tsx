import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import errorMsgImg from "../../assets/img/pexels-karolina-grabowska-.jpg";
import { GiColumnVase, GiPorcelainVase } from "react-icons/gi";

export const Checkout = () => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const successParam = urlParams.get("success");

    if (successParam === "true") {
      setIsPaymentSuccessful(true);
    } else {
      setIsPaymentSuccessful(false);
    }
  }, []);

  return (
    <>
      <div className="collections flex flex-col lg:h-[500px]">
        <section className="relative w-full mx-auto flex items-center overflow-hidden">
          <img
            src={errorMsgImg}
            alt="A display of earthtone vases. Photo by Karolina Grabowska from Pexels"
            className="w-full h-auto object-cover"
          />
        </section>
      </div>

      <div className="flex min-h-96  flex-col">
        {isPaymentSuccessful === true && (
          <div className="px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:py-32 ">
            <div className="flex items-center justify-center">
              <div className="p-4 rounded outline outline-gray-100 ">
                <div className="flex flex-col items-center space-y-2">
                  <GiColumnVase className="text-vaseColor w-8 h-8 md:w-12 md:h-12" />
                  <h1 className="text-2xl md:font-bold">Thank you!</h1>
                  <p className="lg:text-2xl max-w-[300px] md:max-w-[500px]">
                    Your order has been received! Check your email for a link to
                    the guide.
                  </p>{" "}
                  <Link
                    to="/"
                    className="flex flex-col justify-center items-center my-3"
                  >
                    <button className="text-center mt-8 inline-block rounded border border-gray-300 px-3 py-3 text-sm md:text-base lg:text-2xl transition hover:bg-hoverBtnColor">
                      Contuine to Home Page
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {isPaymentSuccessful === false && (
          <div className="px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:py-32 ">
            <div className="flex items-center justify-center">
              <div className="p-4 rounded outline outline-gray-100 ">
                <div className="flex flex-col items-center space-y-2">
                  {" "}
                  <GiPorcelainVase className="text-vaseColor w-8 h-8 md:w-12 md:h-12" />
                  <h1 className="text-2xl md:font-bold">
                    Transaction Unsuccessful
                  </h1>
                  <p className="lg:text-3xl max-w-[300px] md:max-w-[500px]">
                    We apologize, but the payment transaction could not be
                    completed.
                  </p>
                  <p className="lg:text-3xl max-w-[300px] md:max-w-[500px]">
                    Please verify the information and try again.
                  </p>
                  <Link
                    to="/"
                    className="flex flex-col justify-center items-center my-3"
                  >
                    <button
                      type="button"
                      className="align-middle select-none font-semibold text-center uppercase text-xs py-3 px-6  inline-block w-fit rounded border border-gray-300 transition hover:bg-hoverBtnColor "
                    >
                      Contuine to Home Page
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
