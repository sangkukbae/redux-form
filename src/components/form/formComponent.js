import React from "react";
import { Field } from "redux-form";
import Text from "../text";
import Select from "../select";
import Radio from "../radio";
import Checkbox from "../checkbox";
import Datepicker from "../datepicker";
import { required, email } from "./validators";

export const FormComponent = ({
  handleSubmit,
  onSubmit,
  formValues,
  change
}) => {
  return (
    <div className="flex flex-column justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-80">
        <Field
          name="firstName"
          label="First Name"
          component={Text}
          validate={required}
        />
        <Field
          name="lastName"
          label="Last Name"
          component={Text}
          validate={required}
        />
        <Field name="email" label="Email" component={Text} validate={email} />
        <Field
          name="meatChoice"
          label="Meat Choice"
          component={Select}
          options={{
            pork: "Pork",
            beef: "Beef",
            chicken: "Chicken"
          }}
        />
        <Field
          name="spiceLevel"
          label="Spice Level"
          component={Radio}
          options={{
            mild: "Mild",
            medium: "Medium",
            hot: "hot"
          }}
        />
        {formValues && formValues.spiceLevel === "hot" ? (
          <Field
            name="wantsFries"
            label="Would you like fries with that?"
            component={Checkbox}
          />
        ) : (
          ""
        )}
        <Field
          name="orderDate"
          label="Order Date"
          component={Datepicker}
          change={change}
        />
        <button
          type="submit"
          className="link br2 bg-blue white dim pa3 f6 sans-serif b--blue ba"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
