import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://momentum.redberryinternship.ge/api",
    headers: {
        'Authorization': `Bearer ${"9fa265d7-2d69-4cee-a744-0ab8797cd970"}`
    }
})