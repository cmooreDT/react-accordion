import './App.css';
import { useRef, useState } from "react";
import { gsap } from "gsap";
import data from "./data.json";

function App() {
  const [openAccordion, setOpenAccordion] = useState(null);
  const accordionRefs = useRef([]);
  const handleAccordionClick = (index) => {
    console.log(openAccordion, index);
    if (index === openAccordion) {
      gsap.to(
        accordionRefs.current[index].querySelector(".accordion__details"),
        {
          height: 0,
          duration: 1,
          ease: "power1.inOut",
          onComplete: () => setOpenAccordion(null),
         }
      );
    } else {
      if (openAccordion !== null) {
        gsap.to(
          accordionRefs.current[openAccordion].querySelector(
            ".accordion__details"
          ),
          {
            height: 0,
            duration: 1,
            ease: "power1.inOut",
          }
        );
      }
      setOpenAccordion(index);
      gsap.fromTo(
        accordionRefs.current[index].querySelector(".accordion__details"),
        { height: 0 },
        {
          height: "auto",
          duration: 1,
          ease: "power1.inOut",
        }
      );
    }
  };

  return (
    <div className="App">
      <div className="accordion__container">
        {data.map((item) => (
          <div key={item.id}
            className={`accordion__item ${openAccordion === item.id ? "open" : ""}`}
            ref={(el) => (accordionRefs.current[item.id] = el)}>
            <div className="accordion__header"
              onClick={() => handleAccordionClick(item.id)}>
              <p className="accordion__number">{item.id}</p>
              <p className="accordion__name">{item.header}</p>
            </div>
            <div className="accordion__details">
              <ul>
                <li>{item.details[0]}</li>
                <li>{item.details[1]}</li>
                <li>{item.details[2]}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
