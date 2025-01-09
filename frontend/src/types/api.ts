interface ApiResponse<T> {
    status: boolean;
    message: string;
    data: T;
}

export default ApiResponse;