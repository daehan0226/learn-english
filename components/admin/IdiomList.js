import styled from "styled-components";
import { IdiomDictionaries } from ".";
import { AdminContentListContainer as Container } from "./common";

const Button = styled.button`
  margin: 5px;
  border: solid 1px black;
  padding: 5px;
`;

const IdiomList = ({ selectedIdiom, setSelectdIdiom, data }) => {
  return (
    <>
      <Container>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <Button key={item._id} onClick={() => setSelectdIdiom(item)}>{item.expression}</Button>
          ))}
      </Container>
      {selectedIdiom && <IdiomDictionaries data={selectedIdiom.dictionaries} />}
    </>
  );
};

export default IdiomList;
