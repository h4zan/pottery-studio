import { Faq } from '../../components/Faq/Faq';

export const Contact = () => {
  return (
    <>
      <div className="contact flex flex-col container mx-auto p-4 lg:mt-8">
        <article className="mb-3  p-4">
          <section className="mb-4">
            <h4 className="text-lg font-bold">Contacts Us</h4>
            <p>We're excited to hear from you!</p>
            <p>
              Please use the form below or contact us. All questions will be
              answered within three business days.
            </p>

            <p>
              Enquiries regarding the products & shop please contact via:
              <span className="ml-1 font-semibold">gres@studio.com</span>
            </p>
          </section>

          <section>
            <h4 className="text-lg font-bold">We're Available</h4>
            <p>
              Weekdays: 10 — 16
              <br />
              Saturday: 12 — 16
              <br />
              Sunday: 12 — 15
              <br />
            </p>
          </section>
        </article>
      </div>
      <Faq></Faq>
    </>
  );
};
