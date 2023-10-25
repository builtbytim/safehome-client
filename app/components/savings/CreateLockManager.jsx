import { useState } from "react";
import config from "../../utils/config";
import { createFetcher } from "../../utils/fetchUtils";
import { useMutation, useQueryClient } from "react-query";
import queryKeys from "../../utils/queryKeys";
import { useNotifyStore } from "../../utils/store";
import {
  CreateSafelock,
  CreateSafelockStage2,
  CreateSafelockPreview,
  SafelockOverview,
  AddFunds,
} from "./lockedPopups";
import LockableAssetsOverview from "./lockedPopups/LockableAssetsOverview";
import { useRouter } from "next/navigation";

function CreateLockManager({
  showForm1,
  toggleForm1,
  token,
  selectedLockedPlan,
  setSelectedLockedPlan,
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setNotify = useNotifyStore((state) => state.setNotify);

  const [showForm2, setShowForm2] = useState(false);
  const [showLockableAssetsOverview, setShowLockableAssetsOverview] =
    useState(false);
  const [showFormOverview, setShowFormOverview] = useState(false);
  const [showAddFund, setShowAddFund] = useState(false);

  function toggleForm2() {
    setShowForm2(!showForm2);
  }

  const { mutate, isLoading } = useMutation({
    mutationKey: [queryKeys.createLockedSavings, token],

    mutationFn: createFetcher({
      url: config.apiPaths.createLockedSavings,
      method: "POST",
      auth: token,
    }),

    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKeys.getMyLockedSavings);

      setShowFormOverview(false);

      setNotify({
        content: "Locked Savings plan created successfully",
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

    setShowLockableAssetsOverview(true);
  }

  function handleSubmit() {
    const data = formData;

    mutate({
      paymentMode: data.paymentMode,
      fundSource: data.savingsPreference,
      interval: data.preferredInterval,
      lockDurationInMonths: data.lockDurationInMonths,
      amountToSaveAtInterval: data.amountToSaveOnIntervalBasis,
      assetUid: data.investibleAsset.uid,
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
          handleSubmit={(values) => {
            setFormData({
              ...formData,
              ...values,
            });

            setShowForm2(false);
            setShowFormOverview(true);
          }}
          toggleShow={toggleForm2}
          openAssetsOverview={() => {
            setShowLockableAssetsOverview(true);
          }}
          formData={formData}
          goBack={() => {
            setShowLockableAssetsOverview(true);
            toggleForm2();
          }}
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

            if (formData.investibleAsset) {
              setShowForm2(true);
            } else {
              toggleForm1();
            }
          }}
          show={showLockableAssetsOverview}
        />
      )}

      {showFormOverview && (
        <CreateSafelockPreview
          isLoading={isLoading}
          formData={formData}
          handleSubmit={handleSubmit}
          closeSelf={() => {
            setShowFormOverview(false);
            setShowForm2(true);
          }}
          show={showFormOverview}
          selectedLockedPlan={selectedLockedPlan}
        />
      )}

      {selectedLockedPlan && (
        <SafelockOverview
          closeSelf={() => {
            if (showAddFund) return;
            setSelectedLockedPlan(null);
          }}
          plan={selectedLockedPlan}
          handleAddFund={() => {
            setShowAddFund(true);
          }}
        />
      )}

      {showAddFund && (
        <AddFunds
          closeSelf={() => {
            setShowAddFund(false);
          }}
          closeAll={() => {
            setShowAddFund(false);
            setSelectedLockedPlan(null);
          }}
          selectedLockedPlan={selectedLockedPlan}
          token={token}
        />
      )}
    </>
  );
}

export default CreateLockManager;
