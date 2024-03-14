import X from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

export const Footer = () => {
  return (
    <>
      <footer className="bg-linen w-full px-6 py-6 flex flex-col md:justify-between md:items-start lg:flex-col border-gray-200 z-10">
        <div className="relative flex flex-wrap w-full  md:justify-between ">
          <section className="w-full md:w-1/2 mb-2 md:mb-0">
            <h4 className="text-lg font-semibold">Contact</h4>
            <ul>
              <li className="mb-2">Phone: 020 7636 1178</li>
              <li className="mb-2">Email: gres@studio.com</li>
              <li className="mb-2">
                Address: Torrgatan 5 <br /> 100 123 Stockholm
              </li>
            </ul>
          </section>
          <section className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold">Follow us</h4>
            <ul className="flex">
              <li className="mb-2">
                <a
                  href="https://www.instagram.com/"
                  className=" hover:bg-orange-50 mb-2 md:mb-0 md:mr-2"
                  target="_blank"
                >
                  <InstagramIcon fontSize="large" />
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.twitter.com/"
                  className=" hover:bg-orange-50 mb-2 md:mb-0 md:mr-2"
                  target="_blank"
                >
                  <X fontSize="large" />
                </a>
              </li>

              <li className="mb-2">
                <a
                  href="https://www.facebook.com/"
                  className=" hover:bg-orange-50"
                  target="_blank"
                >
                  <FacebookIcon fontSize="large" />
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="block text-sm sm:text-center md:w-full">
          <hr className=" border-gray-200 mx-auto dark:border-gray-700 my-4" />©
          2024
          <a href="/" className="hover:underline ml-2">
            GRÉS Studio
          </a>
          . All Rights Reserved.
        </div>
      </footer>
    </>
  );
};
