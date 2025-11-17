import React from "react";


const topics = [
  "Online Account Opening",
  "Offline Account Opening",
  "Company, Partnership and HUF Account",
  "Opening",
  "NRI Account Opening",
  "Charges at Zerodha",
  "Zerodha IDFC FIRST Bank 3-in-1 Account",
  "Getting Started",
];

const sections = Array(6).fill({
  title: "Account Opening",
  icon: "fa-plus-circle",
  links: topics,
});

function CreateTicket() {
  return (
    <section className="create-ticket container">
      <div className="row py-5 mt-5 mb-5">
        <h1 className="fs-2 mb-4 text-center">
          To create a ticket, select a relevant topic
        </h1>

        {sections.map((section, index) => (
          <div className="col-md-4 p-4" key={index}>
            <h4>
              <i className={`fa ${section.icon} me-2`} aria-hidden="true"></i>
              {section.title}
            </h4>
            <ul className="ticket-links">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="ticket-link">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CreateTicket;