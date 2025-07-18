import { useState } from 'react';
import { useAuth } from '../components/Auth/AuthProvider';
import LoginForm from '../components/Auth/LoginForm';
import OTPForm from '../components/Auth/OTPForm';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const { login, verifyOtp } = useAuth();
  const router = useRouter();

  const handleEmailSubmit = async (email: string) => {
    await login(email);
    setEmail(email);
    setStep('otp');
  };

  const handleVerify = async (otp: string) => {
    const success = await verifyOtp(otp);
    if (success) {
      router.push('/home');
    }
  };

  const handleResend = async () => {
    await login(email);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 'email' ? (
            <LoginForm onEmailSubmit={handleEmailSubmit} />
          ) : (
            <OTPForm 
              email={email} 
              onVerify={handleVerify} 
              onResend={handleResend} 
            />
          )}
        </div>
      </div>
    </div>
  );
}