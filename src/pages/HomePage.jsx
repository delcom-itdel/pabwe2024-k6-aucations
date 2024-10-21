import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAucations } from "../states/aucations/action";
import AucationItem from "../components/AucationItem";
import Typed from "typed.js";

function HomePage() {
  const dispatch = useDispatch();
  const { authLogin = null, aucations = [] } = useSelector((states) => states);

  const typedElement = useRef(null); // Reference to the element where typing effect will be applied

  useEffect(() => {
    dispatch(asyncGetAucations());
  }, [dispatch]);

  useEffect(() => {
    const typedOptions = {
      strings: [`Hello, ${authLogin?.name || "Guest"}`],
      typeSpeed: 100,  // Memperlambat kecepatan mengetik
      backSpeed: 70,   // Memperlambat kecepatan menghapus (jika ada)
      loop: false,
    };

    // Initialize Typed.js
    const typed = new Typed(typedElement.current, typedOptions);

    // Cleanup on component unmount
    return () => {
      typed.destroy();
    };
  }, [authLogin]);

  return (
    <section
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        paddingTop: "30px",
      }}
    >
      <div className="container">
        {/* Hero section with a decorative card */}
        <div
          className="hero-card mb-4 p-4 shadow-sm"
          style={{
            backgroundColor: "#72BF78",
            borderRadius: "12px",
            color: "#fff",
          }}
        >
          <div className="row align-items-center">
            <div className="col-md-8">
              <h3 className="fw-bold mb-2" style={{ fontSize: "2rem" }}>
                <span ref={typedElement}></span> {/* Element with typing effect */}
              </h3>
              <p className="lead" style={{ fontSize: "1.2rem" }}>
                Welcome back! Explore our latest aucations below and start
                bidding!
              </p>
            </div>
          </div>
        </div>

        {/* Grid for auction items */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {aucations.map((aucation) => (
            <div key={aucation.id} className="col">
              <AucationItem aucation={aucation} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
