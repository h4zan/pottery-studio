import { FormEvent, useContext, useEffect, useState } from 'react';
import { ProductDispatchContext } from '../../contexts/ProductContext/ProductDispatchContext';
import { IActionType } from '../../reducer/ProductReducer';

export const PriceFilter = () => {
  const dispatch = useContext(ProductDispatchContext);
  const [ascChecked, setAscChecked] = useState(false);
  const [descChecked, setDescChecked] = useState(false);

  useEffect(() => {
    handleSorting();
  }, [ascChecked, descChecked]);

  const handleSortByPrice = (direction: string, isChecked: boolean) => {
    if (direction === 'asc') {
      setAscChecked(isChecked);
      setDescChecked(false);
    } else if (direction === 'desc') {
      setDescChecked(isChecked);
      setAscChecked(false);
    }
  };

  const handleSorting = () => {
    const resetPayload = 'reset';
    let finalPayload = resetPayload;

    if (ascChecked) {
      finalPayload = 'asc';
    } else if (descChecked) {
      finalPayload = 'desc';
    }

    dispatch({ type: IActionType.SORTEDBYPRICE, payload: finalPayload });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSorting();
  };

  const handleReset = () => {
    setAscChecked(false);
    setDescChecked(false);
    dispatch({ type: IActionType.SORTEDBYPRICE, payload: 'reset' });
  };

  return (
    <section className="w-max space-y-2 relative">
      <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4  transition">
          <span className="text-sm font-medium">Sort by Price </span>
          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>
        <div className="absolute top-full left-0 z-10">
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 bg-white"
          >
            <header className="flex items-center justify-between p-4">
              <button
                type="button"
                className="text-sm underline underline-offset-4"
                onClick={() => {
                  handleReset();
                  handleSorting();
                }}
              >
                Reset
              </button>
            </header>

            <ul className="space-y-1 border-t border-gray-200 p-3">
              <li>
                <label htmlFor="asc" className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="asc"
                    name="asc"
                    onChange={(e) => handleSortByPrice('asc', e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300"
                    checked={ascChecked}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Lowest price
                  </span>
                </label>
              </li>
              <li>
                <label
                  htmlFor="desc"
                  className="inline-flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id="desc"
                    name="desc"
                    onChange={(e) =>
                      handleSortByPrice('desc', e.target.checked)
                    }
                    checked={descChecked}
                    className="h-5 w-5 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Highest price
                  </span>
                </label>
              </li>
            </ul>
          </form>
        </div>
      </details>
    </section>
  );
};
