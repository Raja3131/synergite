export const setAuthDataInLocalStorage = (
  accessToken: string,
  refreshToken: string
) => {
  const date = new Date()
  date.setMinutes(date.getMinutes() + 1)

  localStorage.setItem('expire_at', date.toString())
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('refresh_token', refreshToken)
}
