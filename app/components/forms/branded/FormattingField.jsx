import { useState } from "react";
import cn from "classnames";
import { Field } from "formik";
import { NumericFormat } from "react-number-format";

export default function FormattingField({
  placeholder,
  name,
  type,
  icon: Icon,
  rightIcon: RightIcon,
  addOn: AddOn,
  readOnly = false,
  disabled = false,
  required = false,
  customOnChange = null,
  extraClasses = "",
  inputMode = "text",
}) {
  const [focused, setFocused] = useState(false);

  function onFocus() {
    setFocused(true);
  }

  function onBlur(e) {
    setFocused(false);
  }

  return (
    <div className="space-y-2 w-full   ">
      <div className=" relative group  ">
        {Icon && (
          <div className="absolute top-[50%] left-[2%]  translate-y-[-50%]  ">
            <Icon
              className={
                " text-xl   " +
                cn({
                  " text-[---color-brand] ": focused,
                  " text-placeholder ": !focused,
                })
              }
            />
          </div>
        )}

        {RightIcon && (
          <div className="absolute top-[50%] right-[2%]  translate-y-[-50%]   ">
            <RightIcon
              className={
                " text-xl   " +
                cn({
                  " text-textColor ": focused,
                  " text-placeholder ": !focused,
                })
              }
            />
          </div>
        )}

        <Field id={name} onFocus={onFocus} name={name} onBlur={onBlur}>
          {({ field, form }) => {
            return (
              <NumericFormat
                allowNegative={false}
                displayType="input"
                thousandSeparator=","
                readOnly={readOnly}
                disabled={disabled}
                inputMode={inputMode}
                autoFocus={false}
                className={
                  extraClasses +
                  " account-form-input " +
                  cn({
                    " pl-4 ": !Icon,
                    " pl-12 ": Icon,
                  })
                }
                type={type}
                placeholder={placeholder}
                name={name}
                value={field.value}
                onValueChange={(values) => {
                  // console.log(field);
                  form.setFieldValue(name, values.value);
                  if ("function" === typeof customOnChange) {
                    customOnChange({
                      target: {
                        value: values.value,
                      },
                    });
                  }
                }}
                onBlur={field.onBlur}
              />
            );
          }}
        </Field>
      </div>
    </div>
  );
}
