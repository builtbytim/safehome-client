import { useState } from "react";
import config from "../../utils/config";
import { createFetcher } from "../../utils/fetchUtils";
import { useMutation, useQueryClient } from "react-query";
import queryKeys from "../../utils/queryKeys";
import { useNotifyStore } from "../../utils/store";
import { CreateSafelock, CreateSafelockStage2 } from "./lockedPopups";
import LockableAssetsOverview from "./lockedPopups/LockableAssetsOverview";
import { useRouter } from "next/navigation";

function CreateLockManager({ showForm1, toggleForm1, token }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setNotify = useNotifyStore((state) => state.setNotify);

  const [showForm2, setShowForm2] = useState(false);
  const [showLockableAssetsOverview, setShowLockableAssetsOverview] =
    useState(false);

  function toggleForm2() {
    setShowForm2(!showForm2);
  }

  function toggleLockableAssetsOverview() {
    setShowLockableAssetsOverview(!showLockableAssetsOverview);
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
            title: "Unable to create lock",
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
        <CreateSafelock
          token={token}
          handleSubmit={handleSubmitForm1}
          toggleShow={toggleForm1}
          formData={formData}
          show={showForm1}
        />
      )}

      {showForm2 && (
        <CreateSafelockStage2
          handleSubmit={handleSubmitForm2}
          toggleShow={toggleForm2}
          openAssetsOverview={() => {
            setShowLockableAssetsOverview(true);
          }}
          formData={formData}
          goBack={() => {
            toggleForm1();
            toggleForm2();
          }}
          isLoading={isLoading}
          show={showForm2}
        />
      )}

      {showLockableAssetsOverview && (
        <LockableAssetsOverview
          formData={formData}
          handleSubmit={(asset) => {
            setFormData({ ...formData, investibleAsset: asset });
            setShowLockableAssetsOverview(false);

            setShowForm2(true);
          }}
          token={token}
          goBack={() => {
            setShowLockableAssetsOverview(false);
            setShowForm2(true);
          }}
          show={showLockableAssetsOverview}
        />
      )}
    </>
  );
}

export default CreateLockManager;
