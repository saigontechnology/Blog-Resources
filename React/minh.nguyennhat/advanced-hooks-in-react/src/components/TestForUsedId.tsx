import { useId } from "react";

export const FormNormal = () => {
  return (
    <form>
      <label htmlFor="firstName">First Name:</label>
      <input id="firstName" type="text" />
      <hr />
      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" type="text" />
    </form>
  );
};

export const FormWithUseId = () => {
  const id = useId();

  return (
    <form>
      <label htmlFor={id + "-firstName"}>First Name:</label>
      <input id={id + "-firstName"} type="text" />
      <hr />
      <label htmlFor={id + "-lastName"}>Last Name:</label>
      <input id={id + "-lastName"} type="text" />
    </form>
  );
};

const TestUsedId = () => {
  return (
    <>
      <h2>The first form</h2>
      <FormWithUseId />
      <h2>The second form</h2>
      <FormWithUseId />
    </>
  );
};

export default TestUsedId;
