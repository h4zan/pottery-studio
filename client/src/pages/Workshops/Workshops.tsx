import { useEffect, useState } from "react";
import wrkshpImg from "../../assets/img/anete-lusina.jpg";
import { IWorkshop, initialWorkshop } from "../../models/IWorkshop";
import { getWorkshops } from "../../services/strapiService";
import { WorkshopCalendar } from "../../components/WorkshopCalendar/WorkshopCalendar";
import { GiSandsOfTime } from "react-icons/gi";
import { TfiMoney } from "react-icons/tfi";
import { CiLocationOn } from "react-icons/ci";
import { HiLanguage } from "react-icons/hi2";
import { PiUsersLight } from "react-icons/pi";
import wrkshpBckg from "../../assets/img/pexels-cup-of-couple.jpg";

export const Workshops = () => {
  const [workshop, setWorkshop] = useState<IWorkshop>(initialWorkshop);
  const [toggleCalendar, setToggleCalendar] = useState(false);

  const handleToggleCalendar = () => {
    setToggleCalendar(!toggleCalendar);
  };

  useEffect(() => {
    const fetchWorkshopDetails = async () => {
      try {
        const fetchedWorkshops = await getWorkshops();
        if (fetchedWorkshops && fetchedWorkshops.length > 0) {
          setWorkshop(fetchedWorkshops[0]);
        }
      } catch (error) {
        console.error("Error fetching workshop details:", error);
      }
    };

    fetchWorkshopDetails();
  }, []);

  return (
    <>
      <div className="workshop relative">
        <div className="flex flex-col ">
          <section className="relative w-full mx-auto bg-nordic-gray-light flex items-center overflow-hidden md:h-[550px]">
            <img
              src={wrkshpImg}
              alt="Dirty throwing wheels in workshop.Photo by Anete Lusina from Pexels"
              className="w-full h-auto object-cover"
            />
          </section>
        </div>
        <article className="flex flex-col relative ">
          <section className="grid gap-1 grid-cols-2 lg:gap-8 p-2 place-content-center lg:place-content-end  lg:text-lg xl:text-xl ">
            <aside className="h-12 rounded-lg flex flex-row items-center md:pl-16 md:justify-start gap-0.5	">
              <GiSandsOfTime /> <span>{workshop.attributes.duration}</span>
            </aside>
            <aside className="h-12 rounded-lg flex flex-row items-center md:pl-16 md:justify-start  gap-0.5	">
              <HiLanguage />
              <span>{workshop.attributes.language}</span>
            </aside>
            <aside className="h-12 rounded-lg flex flex-row items-center md:pl-16 md:justify-start  gap-0.5	">
              <PiUsersLight />
              <p>{workshop.attributes.maxParticipants} pers.</p>
            </aside>
            <aside className="h-12 rounded-lg flex flex-row items-center md:pl-16 md:justify-start  gap-0.5">
              <TfiMoney />
              <span>{workshop.attributes.price}</span>
            </aside>
            <aside className="h-12 rounded-lg inline-flex flex-row items-center md:pl-16 md:justify-start  gap-0.5">
              <CiLocationOn />
              <span>{workshop.attributes.location}</span>
            </aside>
          </section>
          <span className="flex items-center mt-8 md:mt-16 ">
            <span className="h-px flex-1 bg-black"></span>
            <span className="shrink-0 px-6 font-semibold lg:text-2xl">
              {workshop.attributes.title}
            </span>
            <span className="h-px flex-1 bg-black"></span>
          </span>
          <aside className="flex flex-col items-start mx-auto px-3 py-8 max-w-[600px] lg:max-w-[900px]">
            <p className="overflow-hidden overflow-ellipsis break-words lg:text-lg xl:text-xl">
              {workshop.attributes.description}
            </p>
            <p className="overflow-hidden overflow-ellipsis break-words lg:text-lg xl:text-xl mt-1">
              Join us in this inspiring workshop that transcends skill levels,
              making it an ideal journey for novices and seasoned art lovers
              alike.
            </p>

            <p className="lg:text-lg xl:text-xl mt-4">
              <span className="font-bold"> Instructor: </span>
              {workshop.attributes.instructor}
            </p>

            <div className="h-[250px] md:h-[200px] lg:h-[300px] mt-5 relative md:mb-3">
              <img
                src={wrkshpBckg}
                alt="Tools for pottery on a plate with a bowl:carving tools. Photo by Cup of Couple from Pexels"
                className="inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-textBckgColor transition-opacity opacity-100">
                <button
                  onClick={handleToggleCalendar}
                  className="font-bold underline uppercase bg-hoverBtnColor p-3"
                >
                  Join workshop{" "}
                </button>
              </div>
            </div>

            {toggleCalendar && (
              <section>
                <WorkshopCalendar />
              </section>
            )}
          </aside>
        </article>
      </div>
    </>
  );
};
