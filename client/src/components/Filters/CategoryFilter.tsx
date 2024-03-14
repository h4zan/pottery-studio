import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { ICategory } from '../../models/IProduct';
import { ProductDispatchContext } from '../../contexts/ProductContext/ProductDispatchContext';
import { IActionType } from '../../reducer/ProductReducer';

interface CategoryFilterProps {
  categories: ICategory[];
}

export const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const dispatch = useContext(ProductDispatchContext);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const categoryName = e.target.value;

    setSelectedCategories((prev) => {
      const categoryId = categories.find(
        (category) => category.attributes.title === categoryName
      )?.id;

      return prev.includes(categoryId!)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId!];
    });
  };

  const handleReset = () => {
    setSelectedCategories([]);
    dispatch({
      type: IActionType.SORTEDBYCATEGORY,
      payload: '-1',
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch({
      type: IActionType.SORTEDBYCATEGORY,
      payload:
        selectedCategories.length > 0 ? selectedCategories.join(',') : '-1',
    });
  }, [dispatch, selectedCategories]);

  return (
    <section className="w-max space-y-2 relative">
      <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 transition">
          <span className="text-sm font-medium"> Category </span>
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
        <form onSubmit={handleSubmit} className="absolute top-full left-0 z-10">
          <div className="border-t border-gray-200 bg-white">
            <header className="flex items-center justify-between p-4 border-b border-gray-200">
              <button
                type="button"
                className="text-sm underline underline-offset-4"
                onClick={handleReset}
              >
                Reset
              </button>
            </header>

            <ul className="space-y-1 p-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <label
                    htmlFor={`Filter${category.attributes.title}`}
                    className="inline-flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      id={`Filter${category.attributes.title}`}
                      value={category.attributes.title}
                      onChange={handleCheckboxChange}
                      checked={selectedCategories.includes(category.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {category.attributes.title.charAt(0).toUpperCase() +
                        category.attributes.title.slice(1)}{' '}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </form>
      </details>
    </section>
  );
};
