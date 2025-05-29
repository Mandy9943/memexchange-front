'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SmartContractInteraction } from '@/services/sc/call';
import { zodResolver } from '@hookform/resolvers/zod';
import { BytesValue } from '@multiversx/sdk-core/out';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { dnsScAddressForHerotag } from '../../utils/functions';
import { useGetHeroTagAvailability } from '../../utils/hook';

const formSchema = z.object({
  herotag: z
    .string()
    .nonempty('Herotag is required')
    .regex(
      /^[a-z0-9]+$/i,
      'Herotag should contain alphanumeric characters (a-z and 0-9 only)'
    )
});

type FormValues = z.infer<typeof formSchema>;

export default function HeroTagForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      herotag: ''
    }
  });

  const herotagValue = watch('herotag');

  const { isLoading, herotagInfo } = useGetHeroTagAvailability(herotagValue);

  const onSubmit = async (values: FormValues) => {
    console.log('submitting');
    const herotag = values.herotag.toLowerCase() + '.elrond';

    try {
      const interaction = new SmartContractInteraction(
        dnsScAddressForHerotag(herotag)
      );
      interaction.scCall({
        functionName: 'register',
        gasL: 600_000_000,
        arg: [BytesValue.fromUTF8(herotag)]
      });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Card className='w-[350px] text-left'>
      <CardHeader>
        <CardTitle> Herotag generator </CardTitle>
        <CardDescription>
          Your herotag should contain alphanumeric characters (a-z and 0-9
          only).
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='herotag'>Herotag</Label>
              <Input
                id='herotag'
                placeholder='Herotag of your wallet'
                {...register('herotag')}
              />
              {(errors.herotag || herotagInfo) && (
                <p className='text-red-500 text-xs'>
                  {errors.herotag?.message || 'This herotag is already taken'}
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button
            type='submit'
            disabled={!!errors.herotag || !!herotagInfo || isLoading}
          >
            {isLoading ? 'Loading...' : 'Generate'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
