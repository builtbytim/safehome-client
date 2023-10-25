import { useState } from "react";
import { GoalOverview } from "./goalsPopups";
import ExtendGoal from "./goalsPopups/ExtendGoal";
import AddFunds from "./goalsPopups/AddFunds";
import GoalSettings from "./goalsPopups/GoalSettings";

function GoalOverviewManager({ token, selectedGoal, setSelectedGoal }) {
  const [showOverview, setShowOverview] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showExtendGoal, setShowExtendGoal] = useState(false);

  function closeAll() {
    setSelectedGoal(null);
  }

  function toggleShowSettings() {
    setShowSettings((showSettings) => !showSettings);
  }

  function toggleShowAddFunds() {
    setShowAddFunds((showAddFunds) => !showAddFunds);
  }

  function toggleShowExtendGoal() {
    setShowExtendGoal((showExtendGoal) => !showExtendGoal);
  }

  return (
    <>
      {showOverview && (
        <GoalOverview
          show={showOverview}
          closeSelf={closeAll}
          token={token}
          selectedGoal={selectedGoal}
          toggleShowSettings={toggleShowSettings}
          toggleShowAddFunds={toggleShowAddFunds}
          toggleShowExtendGoal={toggleShowExtendGoal}
        />
      )}

      {showSettings && (
        <GoalSettings
          show={showSettings}
          closeSelf={toggleShowSettings}
          token={token}
          selectedGoal={selectedGoal}
        />
      )}

      {showAddFunds && (
        <AddFunds
          show={showAddFunds}
          closeSelf={toggleShowAddFunds}
          closeAll={() => {
            toggleShowAddFunds();
            toggleShowSettings();
            closeAll();
          }}
          token={token}
          selectedGoal={selectedGoal}
        />
      )}

      {showExtendGoal && (
        <ExtendGoal
          show={showExtendGoal}
          closeSelf={toggleShowExtendGoal}
          token={token}
          selectedGoal={selectedGoal}
        />
      )}
    </>
  );
}

export default GoalOverviewManager;
