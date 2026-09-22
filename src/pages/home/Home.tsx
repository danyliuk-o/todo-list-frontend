import { type FC } from "react";
import Header from "../../components/Header/Header.js";
import Todo from "../../components/Todo/Todo.js";

type Props = {};

const HomePage: FC<Props> = () => {
  return (
    <>
      <Header />
      <section>
        <Todo />
      </section>
    </>
  );
};

export default HomePage;
