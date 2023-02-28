export interface ISendMail {
    name: string,
    email: string,
    origin: string,
    verificationToken: string | null,
    text: string
}

