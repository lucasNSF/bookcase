import { User } from 'src/app/models/interfaces/User';

export const changeProfilePhoto = (
  userInstance: Partial<User> | null,
  isDarkTheme: boolean
): string => {
  if (!userInstance || !userInstance.profilePhoto) {
    return isDarkTheme
      ? 'assets/images/profile-dark.png'
      : 'assets/images/profile.png';
  }
  return userInstance.profilePhoto;
};
