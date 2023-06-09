import { useForm, SubmitHandler } from 'react-hook-form';
import { ZodType, z } from 'zod';
import Input from '../components/Input';
import {
  GoogleIcon,
  NameIcon,
  EmailIcon,
  AgeIcon,
  PasswordIcon,
  ConfirmPasswordIcon,
} from '../components/icons';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAuthUser } from '../config/firebase';
import { signupAndCreateUser } from '../utils/signupWithEmail';
import { useState } from 'react';

export interface ISignupForm {
  name: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [emailExistError, setEmailExistError] = useState('');
  const navigate = useNavigate();
  const schema: ZodType<ISignupForm> = z
    .object({
      name: z.string().min(3),
      email: z.string().email(),
      age: z.number().min(18),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Confirm Password dosn't match",
      path: ['confirmPassword'],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<ISignupForm> = async (
    formData: ISignupForm,
  ) => {
    console.log(formData);
    try {
      const userAuth = await createAuthUser(formData).catch((error) => {
        setEmailExistError(error.code);
      });
      console.log('userAuth: ', userAuth);
      await signupAndCreateUser(userAuth, formData);
      navigate('/');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div className='flex flex-col w-full max-w-md px-4 py-8 mx-auto  rounded-lg shadow  sm:px-6 md:px-8 lg:px-10'>
      <div className='self-center mb-6 text-xl font-light sm:text-2xl dark:'>
        Sign Up New Account
      </div>
      <div className=''>
        <button
          type='button'
          className='flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 '>
          {GoogleIcon}
          Google
        </button>
      </div>
      <div className='mt-8'>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Input
            Icon={NameIcon}
            inputProps={register('name')}
            type='text'
            placeholder='Write your Name'
            error={errors.name?.message}
          />
          <Input
            Icon={EmailIcon}
            inputProps={register('email')}
            type='email'
            placeholder='Write your email'
            error={errors.email?.message || emailExistError}
          />
          <Input
            Icon={AgeIcon}
            inputProps={register('age', { valueAsNumber: true })}
            type='number'
            placeholder='Your Age'
            error={errors.age?.message}
          />
          <Input
            Icon={PasswordIcon}
            inputProps={register('password')}
            type='password'
            placeholder='Write strong password'
            error={errors.password?.message}
          />
          <Input
            Icon={ConfirmPasswordIcon}
            inputProps={register('confirmPassword')}
            type='password'
            placeholder='Repeat password'
            error={errors.confirmPassword?.message}
          />

          <div className='flex w-full'>
            <button
              type='submit'
              className='w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 '>
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className='flex items-center justify-center mt-6'>
        <Link
          to='/login'
          className='inline-flex items-center text-xs font-thin text-center '>
          <span className='ml-2'>Already have account?</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
