import { UseFormRegisterReturn } from 'react-hook-form';

interface IProps {
  Icon: JSX.Element;
  inputProps: UseFormRegisterReturn;
  type: string;
  placeholder: string;
  error?: string;
}

const Input = ({ Icon, inputProps, type, placeholder, error }: IProps) => {
  return (
    <div className='flex flex-col mb-2'>
      {error && (
        <span className='mb-1 text-sm text-red-400 capitalize'>{error}</span>
      )}
      <div className='relative flex '>
        <span
          className={`inline-flex items-center px-3 text-sm ${
            error ? 'text-red-400' : 'text-gray-500'
          } bg-white border-t border-b border-l border-gray-300 shadow-sm rounded-l-md`}>
          {Icon}
        </span>
        <input
          className={`flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-r-lg shadow-sm appearance-none focus:outline-none focus:ring-2 ${
            error ? 'focus:ring-red-400' : 'focus:ring-purple-600'
          } focus:border-transparent`}
          {...inputProps}
          type={type}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default Input;
