import React from 'react';
import MazerAuthForm from '@/components/auth/MazerAuthForm.tsx';

const Signup = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black items-center justify-center">
      <div className="w-full max-w-md">
        <MazerAuthForm type="signup" />
      </div>
    </div>
  );
};

export default Signup;
