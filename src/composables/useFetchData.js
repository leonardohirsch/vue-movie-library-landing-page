import { ref } from 'vue'

export function useFetchData({ errMsg = 'Sorry, there was a problem. Try again later' }) {
  const errFetchMsg = ref(null)

  const doFetch = async (endPoint, fetchOpts) => {
    try {
      const request = await fetch(endPoint, fetchOpts)

      if (!request.ok) {
        throw new Error()
      }

      if (request.status >= 400) {
        throw new Error()
      }

      const response = await request.json()

      return response
    } catch (err) {
      console.log(err)

      errFetchMsg.value = errMsg

      return false
    }
  }

  return { errFetchMsg, doFetch }
}
