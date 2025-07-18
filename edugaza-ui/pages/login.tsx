import { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { sendOTP, verifyOTP } from '../lib/api';
import { setAuthToken } from '../lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await sendOTP(email);
      if (response.success) {
        setStep('otp');
      } else {
        setError(response.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await verifyOTP(email, otp);
      if (response.success && response.data) {
        setAuthToken(response.data.token, response.data.user);
        router.push('/home');
      } else {
        setError(response.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep('email');
    setOtp('');
    setError('');
  };

  return (
    <Layout title="Login - Next.js PWA App">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 animate-slide-up">
        <h1 className="text-2xl font-bold text-center mb-6">
          {step === 'email' ? 'Welcome Back' : 'Verify OTP'}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {step === 'email' ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <Input
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              Send OTP
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="text-center text-gray-600 mb-4">
              We've sent a verification code to<br />
              <strong>{email}</strong>
            </div>
            <Input
              type="text"
              label="Verification Code"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
            />
            <Button
              type="submit"
              loading={loading}
              className="w-full"
            >
              Verify & Login
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleBack}
              className="w-full"
            >
              Back
            </Button>
          </form>
        )}

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Use OTP: <code className="bg-gray-100 px-2 py-1 rounded">123456</code> for demo
          </p>
        </div>
      </div>
    </Layout>
  );
}