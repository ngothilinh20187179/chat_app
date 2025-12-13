interface IBaseResponse {
    success: boolean;
    status: number;
    message?: string;
    timestamp: string;
}

export interface IErrorResponse extends IBaseResponse {
    success: false;
    error: string;
    details?: any;
    stack?: string | null;
}

export interface ISuccessResponse extends IBaseResponse {
    success: true;
    data?: any;
}

export type IStandardResponse = IErrorResponse | ISuccessResponse;