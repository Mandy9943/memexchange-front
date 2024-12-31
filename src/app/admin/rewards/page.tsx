'use client';

import { rewardService } from '@/services/rest/backendApi/reward';
import Cookies from 'js-cookie';
import { useState } from 'react';
import toast from 'react-hot-toast';
export default function AdminRewardsPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    points: 0,
    doneStatus: '',
    undoneStatus: '',
    type: 'link',
    linkUrl: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const submitData = {
        title: formData.title,
        description: formData.description,
        prizePoints: formData.points,
        doneStatus: formData.doneStatus,
        undoneStatus: formData.undoneStatus,
        type: formData.type,
        ...(formData.type === 'link' && { linkUrl: formData.linkUrl })
      };

      await rewardService.createTask(
        submitData,
        Cookies.get('auth-token') || ''
      );

      toast.success('Reward created successfully!');
      setFormData({
        title: '',
        description: '',
        points: 0,
        doneStatus: '',
        undoneStatus: '',
        type: 'link',
        linkUrl: ''
      });
    } catch (error) {
      toast.error('Failed to create reward');
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>Manage Rewards</h1>

      <div className='max-w-2xl bg-neutral-800 p-6 rounded-lg'>
        <h2 className='text-xl font-semibold mb-6'>Create New Reward</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='title' className='block text-sm font-medium mb-2'>
              Title
            </label>
            <input
              type='text'
              id='title'
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className='w-full px-3 py-2 bg-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label htmlFor='points' className='block text-sm font-medium mb-2'>
              Points
            </label>
            <input
              type='number'
              id='points'
              value={formData.points}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  points: parseInt(e.target.value) || 0
                })
              }
              className='w-full px-3 py-2 bg-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
              min='0'
            />
          </div>

          <div>
            <label
              htmlFor='doneStatus'
              className='block text-sm font-medium mb-2'
            >
              Done Status Message
            </label>
            <input
              type='text'
              id='doneStatus'
              value={formData.doneStatus}
              onChange={(e) =>
                setFormData({ ...formData, doneStatus: e.target.value })
              }
              className='w-full px-3 py-2 bg-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label
              htmlFor='undoneStatus'
              className='block text-sm font-medium mb-2'
            >
              Undone Status Message
            </label>
            <input
              type='text'
              id='undoneStatus'
              value={formData.undoneStatus}
              onChange={(e) =>
                setFormData({ ...formData, undoneStatus: e.target.value })
              }
              className='w-full px-3 py-2 bg-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label htmlFor='type' className='block text-sm font-medium mb-2'>
              Type
            </label>
            <select
              id='type'
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className='w-full px-3 py-2 bg-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            >
              <option value='link'>Link</option>
              <option value='action'>Action</option>
            </select>
          </div>

          {formData.type === 'link' && (
            <div>
              <label
                htmlFor='linkUrl'
                className='block text-sm font-medium mb-2'
              >
                URL
              </label>
              <input
                type='url'
                id='linkUrl'
                value={formData.linkUrl}
                onChange={(e) =>
                  setFormData({ ...formData, linkUrl: e.target.value })
                }
                className='w-full px-3 py-2 bg-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
            </div>
          )}

          <div>
            <label
              htmlFor='description'
              className='block text-sm font-medium mb-2'
            >
              Description
            </label>
            <textarea
              id='description'
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className='w-full px-3 py-2 bg-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors'
          >
            Create Reward
          </button>
        </form>
      </div>
    </div>
  );
}
