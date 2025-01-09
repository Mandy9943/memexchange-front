import { fetchAxios } from '.';

interface UserResponse {
  id: number;
  address: string;
  rewardPoints: number;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
}

export const userService = {
  getUserByAddress: (authToken: string) => {
    return fetchAxios<UserResponse>(`/users/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }
};
