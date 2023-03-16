import axios from 'axios'
import userStore from 'stores/user'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'

const RequestMethod = {
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
  Delete: 'DELETE',
  Options: 'OPTIONS',
  Head: 'HEAD',
  Patch: 'PATCH',
}

let refreshTokenRequest = null
export default class HttpUtility {
  static async get(endpoint, params, requestConfig) {
    const paramsConfig = params ? { params } : undefined

    return HttpUtility.request(
      {
        url: endpoint,
        method: RequestMethod.Get,
      },
      {
        ...paramsConfig,
        ...requestConfig,
      },
    )
  }

  static async post(endpoint, data, headers) {
    const config = data ? { data, headers } : undefined

    return HttpUtility.request(
      {
        url: endpoint,
        method: RequestMethod.Post,
      },
      config,
    )
  }

  static async put(endpoint, data, headers) {
    const config = data ? { data, headers } : undefined

    return HttpUtility.request(
      {
        url: endpoint,
        method: RequestMethod.Put,
      },
      config,
    )
  }

  static async delete(endpoint, data, headers) {
    const config = data ? { data, headers } : undefined

    return HttpUtility.request(
      {
        url: endpoint,
        method: RequestMethod.Delete,
      },
      config,
    )
  }

  static async request(restRequest, config) {
    try {
      if (userStore.getState().accessToken) {
        const user = jwt_decode(userStore.getState().accessToken)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
        if (isExpired) {
          // eslint-disable-next-line no-unneeded-ternary
          refreshTokenRequest = refreshTokenRequest ? refreshTokenRequest : userStore.getState().refreshToken()
          await refreshTokenRequest
          refreshTokenRequest = null
        }
      }

      const axiosRequestConfig = {
        ...config,
        method: restRequest.method,
        url: restRequest.url,
        headers: {
          'Content-Type': config?.headers?.['Content-Type'] ? config.headers['Content-Type'] : 'application/json',
          Authorization: userStore.getState().accessToken ? `firebase ${userStore.getState().accessToken}` : '',
          ...config?.headers,
        },
      }

      const [axiosResponse] = await Promise.all([axios(axiosRequestConfig)])

      const { status, data, request } = axiosResponse

      return {
        status,
        data,
        request,
      }
    } catch (error) {
      if (error.response) {
        return error.response
      }
      return error.request
    }
  }
}
