import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import "../style/FAQ.css";

const faqData = [
  {
    question: "How can I place an order?",
    answer:
      "Browse our products, choose the item you want, select the required quantity and add it to your cart. From there, continue to checkout and complete your order.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes. Once your order has been processed, you can view your order details and track the current status from the Orders section of your account.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We support secure online payments during checkout. The payment options available to you will be displayed when you proceed with your order.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "If your order has not been processed yet, cancellation may be available. Open your order details to check whether the cancellation option is available.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team through the Contact page. Share your order details and issue with us and our team will assist you.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <section className="faq-section">
      <div className="faq-container">

        {/* ================= LEFT CONTENT ================= */}

        <div className="faq-intro">

          <div className="faq-eyebrow">
            <span className="faq-eyebrow-line"></span>
            HELP CENTER
          </div>

          <h2 className="faq-title">
            Frequently
            <br />
            Asked
            <br />
            <span>Questions.</span>
          </h2>

          <p className="faq-description">
            Everything you need to know about shopping,
            orders, payments and your account.
          </p>

          <div className="faq-meta">
            <span>05</span>
            <span className="faq-meta-line"></span>
            <span>QUESTIONS</span>
          </div>

        </div>


        {/* ================= RIGHT FAQ ================= */}

        <div className="faq-list">

          {faqData.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                className={`faq-item ${
                  isOpen ? "faq-item-active" : ""
                }`}
                key={index}
              >

                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >

                  <div className="faq-question-content">

                    <span className="faq-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="faq-question-text">
                      {faq.question}
                    </span>

                  </div>


                  <span className="faq-toggle">
                    <FiPlus />
                  </span>

                </button>


                <div
                  className={`faq-answer-wrapper ${
                    isOpen ? "faq-answer-open" : ""
                  }`}
                >
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default FAQ;