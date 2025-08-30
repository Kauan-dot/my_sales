import AppError from "@shared/errors/AppError";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import { userTokensRepositories } from "../database/repositories/UserTokensRepositories";
import { sendEmail } from "config/email";

interface IForgotPassword {
    email: string;
}

export default class SendForgotPasswordEmailService {
    async execute({email}: IForgotPassword): Promise<void> {
        const user = await usersRepositories.findByEmail(email);

        if (!user) {
            throw new AppError("User not found.", 409);
        }

        const token = await userTokensRepositories.generate(user.id);
        sendEmail({
            to: user.email,
            subject: 'My Sales Recovery Password',
            body: `
                <p>Click the link below to reset your password:</p>
                <a href="${process.env.APP_WEB_URL}/reset_password?token=${token?.token}">Reset Password</a>
            `
        })
    }
}

