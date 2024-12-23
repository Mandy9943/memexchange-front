import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const page = () => {
  return (
    <Card className='max-w-6xl mx-auto bg-[#1e222d] w-full'>
      <CardHeader>
        <CardTitle className='text-white text-center text-2xl'>
          Launch new coin
        </CardTitle>
      </CardHeader>

      <CardContent className='w-full max-w-xl mx-auto'>
        <div className='flex flex-col gap-6'>
          <p className='text-white text-center text-sm'>
            Create your own meme coin in seconds
          </p>

          <div className='space-y-4'>
            <div>
              <label className='text-white text-sm mb-2 block'>
                Memecoin Name
              </label>
              <input
                type='text'
                placeholder='Enter coin name'
                className='w-full bg-[#2a2f3b] text-white p-3 rounded-md'
              />
            </div>

            <div>
              <label className='text-white text-sm mb-2 block'>
                Memecoin Symbol
              </label>
              <input
                type='text'
                placeholder='Enter coin symbol'
                className='w-full bg-[#2a2f3b] text-white p-3 rounded-md'
              />
            </div>

            <div>
              <label className='text-white text-sm mb-2 block'>
                Description
              </label>

              <textarea
                placeholder='Enter description here...'
                className='w-full bg-[#2a2f3b] text-white p-3 rounded-md min-h-[200px]'
              />
            </div>

            <p className='text-gray-400 text-center text-sm'>
              Cost of launching a memecoin is 0.01 EGLD
            </p>

            <button className='w-full bg-blue-500 text-white p-3 rounded-md'>
              Launch Memecoin
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default page;
