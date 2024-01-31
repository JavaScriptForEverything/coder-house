#### Authentication
- accessToken, refreshToken
- save both token into cookie httpOnly
- don't save token in client-side, browser will do that
- auto re-fresh accessToken by refreshToken if accessToken expires by axios.interceptors

- on page-refresh load data from backend instead of store into local storage with accessToken off course