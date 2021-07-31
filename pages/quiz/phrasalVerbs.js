import { useCallback, useEffect, useState } from "react";
import Meta from "../../components/Meta";
import {
  randomProperty,
  replaceText,
  randomElement,
  randomArrayShuffle,
} from "../../utils/utils";
import Modal from "../../components/common/Modal";

import styles from "../../styles/pages/Game.module.css";

import { server } from "../../config";
import { createQueryParams } from "../../utils/utils";

import * as Data from "../../data";

const particleResources = Data.particles;

const PhrasalVerbs = () => {
  const [verbData, setVerbData] = useState({});
  const [particle, setParticle] = useState("");
  const [definitions, setDefinitions] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [sentenses, setSentenses] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [clickedAnswers, setClickedAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const nextQuiz = () => {
    setClickedAnswers([]);
    setShowModal(false);
    setShowHint(false);
    getRandomVerb();
  };

  useEffect(() => {
    getRandomVerb();
  }, []);

  const getRandomVerb = async () => {
    const params = createQueryParams({ random_verb_count: 1 });
    const res = await fetch(`${server}/api/phrasal-verbs/?${params}`);
    const data = await res.json();
    setVerbData({ ...data.result[0] });
  };

  useEffect(() => {
    console.log(verbData, particle)
    if (Object.keys(verbData).length !== 0) {
      const randomParticle = randomProperty(verbData.particles);
      const { definitions, sentences } = verbData.particles[randomParticle];
      const randomParticles = getRandomItems({
        src: particleResources,
        remove: randomParticle,
        itemCount: 3,
      });

      const shffledParticles = randomArrayShuffle(
        Array.from(randomParticles.add(randomParticle))
      );

      setParticle(randomParticle);
      setDefinitions(definitions);
      setSentenses(sentences);
      setAnswers([...shffledParticles]);
    }
  }, [verbData]);

  const getRandomItems = ({ src, remove, itemCount }) => {
    const result = new Set();
    const removeIndex = src.indexOf(remove);
    if (removeIndex > -1) {
      src.splice(removeIndex, 1);
    }

    while (result.size < itemCount) {
      result.add(randomElement(src));
    }
    return result;
  };

  const checkAnswer = (clickedAnswer) => {
    if (clickedAnswer === particle) {
      setShowModal(true);
      setShowHint(true);
    } else {
      setClickedAnswers([...clickedAnswers, clickedAnswer]);
    }
  };

  return (
    <div>
      <Meta title="Phrasal Verb quiz" />
      <h5>Phrasal Verb quiz</h5>
      <div className={styles.header}>
        <h6></h6>
        <div className={styles.tagBox}>
          <button className={styles.tag} onClick={() => setShowHint(true)}>
            Hint
          </button>
          {showHint &&
            definitions.map((definition) => (
              <p key={definition}>{definition}</p>
            ))}
        </div>
      </div>
      <div>
        {sentenses.map((sentense) => (
          <p key={sentense}>
            {replaceText(sentense, particle, "___")}
          </p>
        ))}
      </div>
      <div className={styles.btnContainer}>
          {answers.map((answer) => (
            <button
              className={styles.btn}
              disabled={clickedAnswers.includes(answer)}
              key={answer}
              onClick={(e) => checkAnswer(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
      {showModal && <Modal 
        header={`${verbData.verb}-${particle}`}
        main={sentenses.map((sentense) => (
          <p key={sentense}>
            {sentense}
          </p>
        ))}
        buttons={[
          {onClick:nextQuiz, text:"Next"}
        ]}
        />}
        
    </div>
  );
};

export default PhrasalVerbs;