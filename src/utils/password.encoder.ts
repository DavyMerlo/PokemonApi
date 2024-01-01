import bcrypt from 'bcryptjs';

const salt = 10;

export const encodePassword = async (
    plainTextPassword: string
    ): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing the password');
  }
};

export const comparePasswords = async (
  currentPassword: string,
  passwordFromDB: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(currentPassword, passwordFromDB);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing the passwords');
  }
};