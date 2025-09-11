import { Request, Response } from 'express';
import UpdareUserAvatarService from '../../../services/UpdateUserAvatarService';

export default class UpdateAvatarControllers {
    async update(request: Request, response: Response): Promise<Response> {

        const updateUserAvatar = new UpdareUserAvatarService();

        const user = await updateUserAvatar.execute({
            userId: request.user.id,
            avatarFileName: request.file?.filename as string
        });

        return response.json(user);
    }
}