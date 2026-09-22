import { type FC } from "react";
import Header from "../../components/Header/Header.js";

type AboutProps = {};

const About: FC<AboutProps> = () => {
  return (
    <>
      <Header />
      <section>
        <h1>About Us</h1>
        <p>Welcome to our about page!</p>
      </section>
    </>
  );
};

export default About;
