import { useEffect, useState } from 'react';
import axios from 'axios';
import { IFaq } from '../../models/IFaq';

export const Faq = () => {
  const [toggledQuestions, setToggledQuestions] = useState<boolean[]>([]);
  const [questions, setQuestions] = useState<IFaq[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_APP_API_URL + '/faqs?populate=*';

        const axiosInstance = axios.create({
          baseURL: apiUrl,
          headers: {
            Authorization: 'Bearer ' + import.meta.env.VITE_APP_API_TOKEN,
            Accept: 'application/json',
          },
        });

        const response = await axiosInstance.get(apiUrl);

        setToggledQuestions(new Array(response.data.data.length).fill(false));
        setQuestions(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (index: number) => {
    setToggledQuestions((prevToggledQuestions) => {
      const newToggledQuestions = [...prevToggledQuestions];
      newToggledQuestions[index] = !newToggledQuestions[index];
      return newToggledQuestions;
    });
  };

  return (
    <>
      <article className="container mx-auto p-4">
        <h3 className="font-bold flex justify-center px-4">FAQ</h3>
        {questions.map((faq, index) => (
          <div key={index} className="item px-4 py-6">
            <section
              className="flex items-center justify-between font-medium"
              onClick={() => handleClick(index)}
            >
              <h4>{faq.attributes.question}</h4>
              <svg
                className={`w-5 h-5 text-gray-500 ${
                  toggledQuestions[index] ? 'transform rotate-180' : ''
                }`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </section>
            {toggledQuestions[index] && (
              <section className="mt-3 text-gray-600">
                <p>{faq.attributes.answer}</p>
              </section>
            )}
          </div>
        ))}
      </article>
    </>
  );
};
