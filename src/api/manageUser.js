import HttpUtility from './HttpUtility'

const baseApi = process.env.REACT_APP_BASE_API

export const getUser = ({ param }) => {
  return HttpUtility.get(`${baseApi}/admin/get-users${param}`)
}

export const getDetailUser = ({ id }) => {
  return HttpUtility.get(`${baseApi}/admin/${id}/detail`)
}

export const updateUser = ({ data }) => {
  return HttpUtility.post(`${baseApi}/admin/update-profile`, data)
}
