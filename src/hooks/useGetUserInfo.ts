import { userService } from '@/services/rest/backendApi/users';
import Cookies from 'js-cookie';
import useSWR from 'swr';

const useGetUserInfo = () => {
  const dataResponse = useSWR('/api/user/me', () =>
    userService.getUserByAddress(Cookies.get('auth-token')!)
  );

  return {
    ...dataResponse
  };
};

export default useGetUserInfo;
