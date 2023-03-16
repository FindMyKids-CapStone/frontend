export const yupTextValidate = {
  required: 'Vui lòng điền đầy đủ thông tin',
  invalid: 'không hợp lệ',
  notNull: 'không được bỏ trống',
}

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}

export const validatePhone = (email: string) => {
  return String(email).match(/^[0-9]{10}$/)
}
