export const handleApiError = (error: any) => {
    if (error.response) {
        console.error("API Error: ", error.response.data);
        throw new Error(error.response.data.message || "Server Error");
    } else if (error.request) {
        throw new Error("No response received from server!");
    } else {
        throw new Error("Error setting up request!");
    }
};