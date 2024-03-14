import logo from '../../assets/img/logoImg.png';

export const Logo = () => {
  return (
    <>
      <div className="logo">
        <a href="/" className="relative ">
          <img
            src={logo}
            className="h-28 w-28 md:h-32 md:w-32 "
            alt="Grés Pottery Studio"
          />
        </a>
      </div>
    </>
  );
};
