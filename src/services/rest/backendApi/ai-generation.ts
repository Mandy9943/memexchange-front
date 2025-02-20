import axiosInstance, { fetchAxios } from '.';

export const aiGenerationService = {
  getRemainingGenerations: (authToken: string) => {
    return fetchAxios<number>(`/ai-generation/remaining-generations`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
  },
  generateCoin: async (
    authToken: string,
    prompt: string
  ): Promise<{
    image: string;
    name: string;
    symbol: string;
    description: string;
  }> => {
    console.log(authToken);

    const response = await axiosInstance.post<{
      image: string;
      name: string;
      symbol: string;
      description: string;
    }>(
      `/ai-generation/generate-coin`,
      {
        prompt
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );
    return response.data;
  },
  getUserPlan: (authToken: string) => {
    return fetchAxios<number>(`/ai-generation/user-plan`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }
};
