import { GoalCreation, GoalCreation2 } from "./goalsPopups";
import { useState } from "react";
import config from "../../utils/config";
import { createFetcher } from "../../utils/fetchUtils";
import { useMutation, useQueryClient } from "react-query";
import queryKeys from "../../utils/queryKeys";
import { useNotifyStore } from "../../utils/store";
import { useRouter } from "next/navigation";

function CreateGoalManager({ showForm1, toggleForm1, token }) {
  const router = useRouter();

  const [showForm2, setShowForm2] = useState(false);

  const queryClient = useQueryClient();
  const setNotify = useNotifyStore((state) => state.setNotify);

  function toggleForm2() {
    setShowForm2(!showForm2);
  }

  const { mutate, isLoading } = useMutation({
    mutationKey: [queryKeys.createGoalSavings, token],

    mutationFn: createFetcher({
      url: config.apiPaths.createGoalSavings,
      method: "POST",
      auth: token,
    }),

    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKeys.getMyGoalSavings);

      toggleForm2();

      setNotify({
        content: "Savings Goal created successfully",
        type: "success",
        show: true,
      });
    },

    onError: (err) => {
      const action = err.action;

      switch (action) {
        case "VERIFY_KYC":
          setNotify({
            show: true,
            title: "KYC is required",
            content: err?.message,
            allowClose: true,
            onAcceptText: "Verify Now",
            onAccept: () => {
              router.push(`/kyc`);
            },
          });

          break;

        default:
          setNotify({
            show: true,
            title: "Unable to create goal",
            content: err?.message,
            allowClose: true,
          });

          break;
      }
    },
  });

  const [formData, setFormData] = useState({});

  function handleSubmitForm1(values) {
    setFormData({ ...formData, ...values });
    toggleForm1();
    toggleForm2();
  }

  function handleSubmitForm2(values) {
    const data = { ...formData, ...values };

    mutate({
      goalName: data.goalTitle,
      goalAmount: data.goalAmount,
      goalImageUrl: data.goalImageUrl,
      goalDescription: data.goalPurpose,
      fundSource: data.savingsPreference,
      interval: data.preferredInterval,
      paymentMode: data.paymentMode,
      startDate: new Date(data.startDate).getTime() / 1000,
      endDate: new Date(data.withdrawalDate).getTime() / 1000,
      amountToSaveAtInterval: data.amountToSaveOnIntervalBasis,
    });
  }

  return (
    <>
      {showForm1 && (
        <GoalCreation
          token={token}
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
          isLoading={isLoading}
          show={showForm2}
        />
      )}
    </>
  );
}

export default CreateGoalManager;
