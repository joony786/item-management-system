import { Button, ButtonProps } from './button';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

const buttonVariants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200',
  secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl transition-all duration-200',
  destructive: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200',
};

const buttonSizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
};

export const PrimaryButton = ({ 
  className, 
  variant = 'primary', 
  size = 'md',
  ...props 
}: PrimaryButtonProps) => {
  return (
    <Button
      className={cn(
        buttonVariants[variant],
        buttonSizes[size],
        className
      )}
      {...props}
    />
  );
};
