import { useEffect, useState } from "react";
import { Meta, Header } from "../../components";
import {
  randomElement,
  randomArrayShuffle,
  getRandomItems,
} from "../../utils/utils";
import { createQueryParams } from "../../utils/utils";
import { Modal, DescCard, AnswerButtons } from "../../components/common";
import { useFetch } from "../../hooks";
import styled from "styled-components";

const Title = styled.h5``;
const Quiz = styled.div`
  align-self: start;
`;

const Idioms = () => {
  const [fetchRandomIdiom, doFetchRandomIdioms] = useFetch([]);
  const [idiom, setIdiom] = useState({});
  const [definitions, setDefinitions] = useState([]);
  const [sentenses, setSentenses] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [clickedAnswers, setClickedAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getRandomIdioms();
  }, []);

  const nextQuiz = () => {
    setClickedAnswers([]);
    setShowModal(false);
    getRandomIdioms();
  };

  useEffect(() => {
    if (fetchRandomIdiom.data.length !== 0) {
      setQuiz();
    }
  }, [fetchRandomIdiom.data]);

  const getRandomIdioms = async () => {
    const params = createQueryParams({ random_count: 3 });
    doFetchRandomIdioms(`idioms/?${params}`);
  };

  const setQuiz = () => {
    const randomIdiom = randomElement(fetchRandomIdiom.data);
    const { expression, definitions, sentences } = randomIdiom;
    const idiomExpressions = fetchRandomIdiom.data.map(
      (idiom) => idiom.expression
    );
    const randomIdioms = getRandomItems({
      src: idiomExpressions,
      remove: expression,
      itemCount: 2,
    });
    const shffledIdioms = randomArrayShuffle(
      Array.from(randomIdioms.add(expression))
    );
    setIdiom(expression);
    setDefinitions(definitions);
    setSentenses(sentences);
    setAnswers([...shffledIdioms]);
  };

  const checkAnswer = (clickedAnswer) => {
    if (clickedAnswer === idiom) {
      setShowModal(true);
    } else {
      setClickedAnswers([...clickedAnswers, clickedAnswer]);
    }
  };

  return (
    <>
      <Meta title="Idioms quiz" />
      <Header title="Idioms quiz" />
      <Quiz>
        <Title>Pick an idiom meaning:</Title>
        <DescCard data={definitions} title={"Definition"} />
      </Quiz>
      <AnswerButtons
        answers={answers}
        clickedAnswers={clickedAnswers}
        onClick={checkAnswer}
      />
      {showModal && (
        <Modal
          header={idiom}
          main={sentenses.map((sentense) => (
            <p key={sentense}>{sentense}</p>
          ))}
          buttons={[{ onClick: nextQuiz, text: "Next" }]}
          setShow={setShowModal}
        />
      )}
    </>
  );
};

export default Idioms;
