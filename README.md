# [redux-form](https://redux-form.com/8.3.0/docs/gettingstarted.md/)

## :page_facing_up: 목차

- [Overview](#overview)
- [Data flow](#data-flow)
- [Usage](#usage)
- [Validate](#validate)


## Overview
To connect your React form components to your Redux store you'll need the following pieces from the redux-form package:
* Redux Reducer: formReducer,
* React HOC reduxForm() and <Field/> component.

|             	| type      	| responsibility                                                                                                                                                     	|
|-------------	|-----------	|--------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `formReducer` 	| reducer   	| function that tells how to update the Redux store based on changes coming from the application; those changes are described by Redux actions                       	|
| `reduxForm()` 	| HOC       	| function that takes configuration object and returns a new function; use it to wrap your <br>form component and bind user interaction to dispatch of Redux actions 	|
| `<Field/>`    	| component 	| component that lives inside your wrapped <br>form component; use it to connect the input components to the <br>redux-form logic                                    	|

## Data flow

<img src="https://github.com/redux-form/redux-form/raw/master/docs/reduxFormDiagram.png" width="600px" height="500px"></img><br/>

1. User clicks on the input,
2. "Focus action" is dispatched,
3. formReducer updates the corresponding state slice,
4. The state is then passed back to the input.

## Usage

**formReducer**

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { Provider } from "react-redux";

const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
});

const store = createStore(rootReducer);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  rootElement
);
```

**Form Component**
```jsx
import React from "react";
import { Field, reduxForm } from "redux-form";

let ContactForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

ContactForm = reduxForm({
  // a unique name for the form
  form: "contact"
})(ContactForm);

export default ContactForm;
```
**Submit**
```jsx
import React from "react";
import "./styles.css";
import ContactForm from "./ContactForm";

export default class App extends React.Component {
  submit = values => {
    // print the form values to the console
    console.log(values);
  };
  render() {
    return (
      <div className="App">
        <h1>Redux Form</h1>
        <ContactForm onSubmit={this.submit} />
      </div>
    );
  }
}
```

[https://codesandbox.io/s/redux-form-71zk4](https://codesandbox.io/s/redux-form-71zk4)

## Validate

**validator**
```jsx
export const required = value => {
  if (!value) {
    return "This field is required!";
  }
};

export const email = value =>
  value && /(.+)@(.+){2,}\.(.+){2,}/i.test(value)
    ? undefined
    : "Invalid email!";
```

**formComponent**
```jsx
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
```

[https://codesandbox.io/s/redux-form-y6r5y](https://codesandbox.io/s/redux-form-y6r5y)

:memo: **참고자료**   
[https://codeburst.io/forms-with-redux-form-v7-part-1-of-2-e636d760e9b4](https://codeburst.io/forms-with-redux-form-v7-part-1-of-2-e636d760e9b4)   
[https://github.com/redux-form/redux-form](https://github.com/redux-form/redux-form)   
[https://alligator.io/redux/redux-form/](https://alligator.io/redux/redux-form/)   
[https://www.digitalocean.com/community/tutorials/managing-form-state-in-react-with-redux-form](https://www.digitalocean.com/community/tutorials/managing-form-state-in-react-with-redux-form)   
[https://medium.com/dailyjs/why-build-your-forms-with-redux-form-bcacbedc9e8](https://medium.com/dailyjs/why-build-your-forms-with-redux-form-bcacbedc9e8) :heavy_check_mark:   
[https://blog.bitsrc.io/build-awesome-forms-in-react-using-redux-form-d1e4c96f5850](https://blog.bitsrc.io/build-awesome-forms-in-react-using-redux-form-d1e4c96f5850) :heavy_check_mark:   
