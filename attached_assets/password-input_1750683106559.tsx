
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  autoComplete?: string;
}

export const PasswordInput = ({
  value,
  onChange,
  placeholder = "Enter password...",
  className,
  required = false,
  autoComplete = "new-password"
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`pr-10 ${className}`}
        required={required}
        autoComplete={autoComplete}
        spellCheck={false}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
        tabIndex={-1}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-slate-400" />
        ) : (
          <Eye className="h-4 w-4 text-slate-400" />
        )}
      </Button>
    </div>
  );
};
