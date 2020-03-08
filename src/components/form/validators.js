export const required = value => {
  if (!value) {
    return "This field is required!";
  }
};

export const email = value =>
  value && /(.+)@(.+){2,}\.(.+){2,}/i.test(value)
    ? undefined
    : "Invalid email!";
