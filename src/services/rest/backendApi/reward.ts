import axiosInstance, { fetchAxios } from '.';

export interface Task {
  id: number;
  title: string;
  description: string;
  prizePoints: number;
  doneStatus: string;
  undoneStatus: string;
  createdAt: string;
  updatedAt: string;
  doneBy: { address: string }[];
  type: string;
  linkUrl?: string;
}

export interface LeaderboardEntry {
  id: number;
  address: string;
  points: number;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  prizePoints: number;
  doneStatus: string;
  undoneStatus: string;
  type: string;
  linkUrl?: string;
}

export interface CompleteTaskDto {
  taskId: number;
  userAddress: string;
}

export const rewardService = {
  // Get leaderboard
  getLeaderboard: () => {
    return fetchAxios<LeaderboardEntry[]>('/rewards/leaderboard');
  },

  // Get all tasks
  getAllTasks: () => {
    return fetchAxios<Task[]>('/rewards/tasks');
  },

  // Create a new task
  createTask: (data: CreateTaskDto, authToken: string) => {
    return axiosInstance.post<Task>('/rewards/tasks', data, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
  },

  // Complete a task
  completeTask: (data: CompleteTaskDto, authToken: string) => {
    return axiosInstance.post<{ success: boolean; pointsEarned: number }>(
      '/rewards/tasks/complete',
      data,
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );
  },

  isDoneConnectWallet: (authToken: string) => {
    return fetchAxios<{ isDone: boolean }>(
      '/rewards/tasks/isDoneConnectWallet',
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );
  },

  completeConnectWallet: (authToken: string) => {
    return axiosInstance.post<{ success: boolean; pointsEarned: number }>(
      '/rewards/tasks/completeConnectWallet',
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );
  },

  getUserTasks: (authToken: string) => {
    return fetchAxios<Task[]>('/rewards/tasks/user', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }
};
