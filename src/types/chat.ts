export type ChatMessageFormValues = Readonly<{
  name: string;
  email: string;
  message: string;
}>;

export type SendChatMessageResponse = Readonly<{
  success: boolean;
  error?: string;
}>;
