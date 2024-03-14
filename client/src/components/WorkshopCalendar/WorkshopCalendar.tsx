import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getWorkshops } from '../../services/strapiService';
import { GiColumnVase } from 'react-icons/gi';
import { IWorkshop, initialWorkshop } from '../../models/IWorkshop';
import { addWorkshop } from '../../redux/workshopSlice';
import { useAppDispatch } from '../../redux/hooks';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { TfiMoney } from 'react-icons/tfi';
import { BsCalendar2Date } from 'react-icons/bs';

export const WorkshopCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [workshopDates, setWorkshopDates] = useState<Date[]>([]);
  const [maxWorkshopDate, setMaxWorkshopDate] = useState<Date | null>(null);
  const [showWorkshopInfo, setShowWorkshopInfo] = useState(false);
  const [workshop, setWorkshop] = useState<IWorkshop>(initialWorkshop);
  const workshopDispatch = useAppDispatch();

  const minDate = new Date(2024, 0, 1);
  const maxDate = new Date(2024, 11, 31);

  useEffect(() => {
    const fetchWorkshopData = async () => {
      try {
        const workshops = await getWorkshops();

        const wednesdayWorkshop = workshops.find(
          (workshop) => workshop.attributes.plannedDay === 'Wednesday'
        );

        if (wednesdayWorkshop) {
          const date = new Date(wednesdayWorkshop.attributes.date);

          setMaxWorkshopDate(date);
          setWorkshopDates([date]);
          setWorkshop(wednesdayWorkshop);
        } else {
          setMaxWorkshopDate(null);
          setWorkshopDates([]);
          setWorkshop(initialWorkshop);
        }
      } catch (error) {
        console.error('Error fetching workshops:', error);
      }
    };

    fetchWorkshopData();
  }, []);

  const handleDateChange = (date: Date | Date[] | null) => {
    setSelectedDate(date === null ? selectedDate : (date as Date));
    setShowWorkshopInfo(date !== null && (date as Date).getDay() === 3);
  };

  const handleAddToCart = () => {
    const selectedDateString = selectedDate.toDateString();

    workshopDispatch(
      addWorkshop({
        ...workshop,
        attributes: {
          ...workshop.attributes,
          selectedDate: [selectedDateString],
        },
      })
    );
  };

  return (
    <>
      <div className="mt-3 transition">
        <Calendar
          value={selectedDate}
          onClickDay={handleDateChange}
          tileContent={({ date, view }) => {
            if (view === 'month') {
              const isWednesday = date.getDay() === 3;
              const isAfterClass = maxWorkshopDate
                ? date > maxWorkshopDate
                : false;

              if (
                isWednesday &&
                (isAfterClass || workshopDates.includes(date))
              ) {
                return (
                  <span className="absolute text-gray-900 font-bold">
                    <GiColumnVase />
                  </span>
                );
              }
            }

            return null;
          }}
          tileClassName={({ date }) => {
            const isWednesday = date.getDay() === 3;
            const isAfterClass = maxWorkshopDate
              ? date > maxWorkshopDate
              : false;

            if (isWednesday && (isAfterClass || workshopDates.includes(date))) {
              return 'wednesday';
            }

            return null;
          }}
          minDate={minDate}
          maxDate={maxDate}
          locale="en-GB"
          className="react-calendar w-fit md:w-80 lg:w-96"
        />
        {showWorkshopInfo && (
          <div className="h-fit rounded border border-stone-400	 px-5 py-3 transition mt-5 bg-linen flex flex-row justify-between shadow-md">
            <div className="py-3 px-2 gap-3 flex flex-col items-start">
              <div className="flex flex-row text-center items-center gap-1 text-sm md:text-base">
                <span>
                  <BsCalendar2Date />{' '}
                </span>

                <p>{selectedDate.toDateString()}</p>
              </div>

              <div className="flex flex-row text-center items-center gap-1 text-sm md:text-base mb-1">
                <span>
                  {' '}
                  <HiOutlineUserGroup />
                </span>{' '}
                {workshop && (
                  <p>
                    {workshop.attributes.availableSpots > 0
                      ? `${workshop.attributes.availableSpots} of 6 spots left`
                      : 'No available spots'}
                  </p>
                )}
              </div>
              <div className="flex flex-row text-center items-center gap-1 text-sm md:text-base">
                <span>
                  {' '}
                  <TfiMoney />
                </span>
                <p>{workshop.attributes.price + '/per person'}</p>
              </div>
            </div>

            <div className="flex items-end">
              <button
                className="align-middle select-none font-bold text-center uppercase text-xs inline-block w-fit rounded border p-2 border-gray-400 transition hover:bg-hoverBtnColor"
                type="button"
                onClick={handleAddToCart}
                data-testid="workshop-booking-btn"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
