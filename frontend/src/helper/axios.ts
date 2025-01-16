import axios from "axios";

const baseUrl = 'http://localhost:3000/'

export const axiosClient = axios.create({
    baseURL: baseUrl,
    headers: {'Content-Type': 'application/json'}
})

axiosClient.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
})

axiosClient.interceptors.response.use(
    function (response){ return response },
    async function (error) {
        const request = error.config
        if(error.response.status === 401){
            request._retry = true
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post(baseUrl + 'auth/refreshtoken', {
                    refreshToken,
                });
                const { accessToken, refreshToken: newRefreshToken } = response.data.payload;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                axiosClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                return axiosClient(request);
              } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
              }
        }
        return Promise.reject(error)
    }
)