import { createFetcher } from "../../utils/fetchUtils";
import queryKeys from "../../utils/queryKeys";
import { useQueryClient, useMutation } from "react-query";
import { useNotifyStore } from "../../utils/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import config from "../../utils/config";
import Spinner from "../Spinner";

const AddCard = ({ closeFunc, token }) => {
  const queryClient = useQueryClient();
  const setNotify = useNotifyStore((state) => state.setNotify);

  const { mutate, isLoading: addCardLoading } = useMutation({
    mutationKey: [queryKeys.addDebitCard, token],
    mutationFn: createFetcher({
      url: config.apiPaths.addDebitCard,
      method: "POST",
      auth: token,
    }),

    onError(err) {
      setNotify({
        show: true,
        content: err.message,
        allowClose: true,
      });
    },

    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getDebitCards, token],
      });

      closeFunc();

      setNotify({
        show: true,
        content: "Debit Card added successfully",
        allowClose: true,
      });
    },
  });

  function handleSubmit(values) {
    if (!addCardLoading) {
      mutate({
        cardNumber: values.cardNumber,
        expiryYear: values.expiryDate.split("/")[1],
        expiryMonth: values.expiryDate.split("/")[0],
        cvv: values.CVV,
        cardType: "VISA",
      });
    }
  }
  return (
    <div className="px-8 pb-5 space-y-5 text-[--primary]">
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          cardNumber: "",
          expiryDate: "",
          CVV: "",
        }}
        validationSchema={Yup.object().shape({
          cardNumber: Yup.string()
            .required("Card Number is required")
            .matches(/^[0-9]{16}$/, "Card Number must be 16 digits"),
          expiryDate: Yup.string()
            .required("Expiry Date is required")
            .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid Expiry Date"),
          CVV: Yup.string()
            .required("CVV is required")
            .matches(/^[0-9]{3}$/, "CVV must be 3 digits"),
        })}
      >
        {({ isValid }) => {
          return (
            <Form className="space-y-6">
              <div className="relative">
                <label className="form-text">Card Number</label>
                <Field
                  type="text"
                  placeholder="Card Number"
                  inputMode="numeric"
                  name="cardNumber"
                  className="field-1"
                />

                <ErrorMessage
                  name="cardNumber"
                  component="div"
                  className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="relative">
                  <label className="form-text">Expiry Date</label>
                  <Field
                    name="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    className="field-1"
                  />

                  <ErrorMessage
                    name="expiryDate"
                    component="div"
                    className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                  />
                </div>
                <div className="relative">
                  <label className="form-text">CVV</label>
                  <Field
                    name="CVV"
                    inputMode="numeric"
                    type="text"
                    placeholder="011"
                    className="field-1"
                  />
                  <ErrorMessage
                    name="CVV"
                    component="div"
                    className="absolute -bottom-[30%] left-0 text-[--text-danger] text-xs text-left"
                  />
                </div>
              </div>
              <div className="space-y-4 w-full pt-8 pb-3">
                <button
                  type="submit"
                  disabled={!isValid || addCardLoading}
                  className="btn-1 block w-full py-3 px-5 rounded text-white bg-[--color-brand] border border-[--color-brand]"
                >
                  {addCardLoading ? <Spinner /> : "Add Card"}
                </button>
                <button
                  className="btn-2 block w-full py-3 px-5 rounded text-[--color-brand] border border-[--color-brand]"
                  onClick={() => closeFunc()}
                >
                  Close
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddCard;
