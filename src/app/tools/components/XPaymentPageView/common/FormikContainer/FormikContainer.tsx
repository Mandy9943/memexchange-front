import { zodResolver } from '@hookform/resolvers/zod';
import { subDays } from 'date-fns';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import XPaymentContainer from '../XPaymentContainer/XPaymentContainer';

const FiltersFormSchema = z.object({
  from: z.date(),
  to: z.date(),
  sender: z.string(),
  receiver: z.string(),
  type: z.enum(['egld', 'esdt', 'all'])
});

export type IFormValues = z.infer<typeof FiltersFormSchema>;

const FormContainer = () => {
  const initialData: IFormValues = {
    from: subDays(new Date(), 30),
    to: new Date(),
    sender: '',
    receiver: '',
    type: 'egld'
  };

  const methods = useForm<IFormValues>({
    defaultValues: initialData,
    resolver: zodResolver(FiltersFormSchema)
  });

  const onSubmit = (values: IFormValues) => {
    console.log(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <XPaymentContainer />
      </form>
    </FormProvider>
  );
};

export default FormContainer;
