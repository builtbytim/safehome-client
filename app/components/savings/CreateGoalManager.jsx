import { GoalCreation, GoalCreation2 } from "./goalsPopups";
import { useState } from "react";

function CreateGoalManager({ showForm1, showForm2, toggleForm1, toggleForm2 }) {
  const [formData, setFormData] = useState({});

  function handleSubmitForm1(values) {
    setFormData(values);
    toggleForm1();
    toggleForm2();
  }

  function handleSubmitForm2(values) {
    setFormData({ ...formData, ...values });
  }

  return (
    <>
      {showForm1 && (
        <GoalCreation
          handleSubmit={handleSubmitForm1}
          toggleShow={toggleForm1}
          formData={formData}
          show={showForm1}
        />
      )}

      {showForm2 && (
        <GoalCreation2
          handleSubmit={handleSubmitForm2}
          toggleShow={toggleForm2}
          formData={formData}
          goBack={() => {
            toggleForm1();
            toggleForm2();
          }}
          show={showForm2}
        />
      )}
    </>
  );
}

export default CreateGoalManager;
