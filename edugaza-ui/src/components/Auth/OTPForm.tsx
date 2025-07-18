import { useState } from 'react';

export default function OTPForm({ 
  email, 
  onVerify, 
  onResend 
}: { 
  email: string; 
  onVerify: (otp: string) => Promise<void>; 
  onResend: () => Promise<void>;
}) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onVerify(otp);
    setLoading(false);
  };

  const handleResend = async () => {
    setResending(true);
    await onResend();
    setResending(false);
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        We've sent a 6-digit code to <span className="font-medium">{email}</span>
      </p>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
            Verification Code
          </label>
          <input
            id="otp"
            name="otp"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-center text-lg"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </div>
      </form>

      <div className="text-center">
        <button
          onClick={handleResend}
          disabled={resending}
          className="text-sm font-medium text-primary hover:text-primary-dark disabled:opacity-50"
        >
          {resending ? 'Sending...' : 'Resend Code'}
        </button>
      </div>
    </div>
  );
}