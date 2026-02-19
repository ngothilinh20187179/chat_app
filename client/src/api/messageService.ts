import axiosClient from './axiosClient';

const messageService = {
    /**
     * @param recipientId
     * @param token
     */
    getChatHistory: (recipientId: string, token: string) => {
        const url = `/messages/chat/${recipientId}`;
        
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
};

export default messageService;