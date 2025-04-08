export interface ISendMessageDto {
    receiverUsername: string;
    text: string;
}

export interface IMessageDto extends ISendMessageDto {
    id: number;
    senderUsername: string;
    createdAt: string;
}