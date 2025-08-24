import AppError from "@shared/errors/AppError";
import { User } from "../database/entities/User";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import path from "path";
import uploadConfig from "config/upload";
import fs from "fs";

interface IUpdareUserAvatar {
    userId: string;
    avatarFileName: string;
}

export default class UpdareUserAvatarService {
    async execute( {userId, avatarFileName}: IUpdareUserAvatar): Promise<User> {
        const user = await usersRepositories.findById(Number(userId));

        if(!user) {
            throw new AppError("Only authenticated users can change avatar.", 401);
        }

        console.log(user);

        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            console.log(userAvatarFileExists);
            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        await usersRepositories.save(user);
        return user;
    }
}

