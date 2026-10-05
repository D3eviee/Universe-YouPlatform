'use client';
import { useState, Suspense} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2Icon } from 'lucide-react';
import { checkEmailExists, loginAction, registerAction } from '@/app/actions/auth';
import { useRouter, useSearchParams } from 'next/navigation';

type FormStep = 'EMAIL_INPUT' | 'LOGIN' | 'REGISTER';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const [step, setStep] = useState<FormStep>('EMAIL_INPUT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null); 
  
  const handleFinalSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!password) return;
    
    setIsLoading(true);
    setErrorMsg('');
    
    try {
      let result;

      if (step === 'LOGIN') 
        result = await loginAction(email, password);
      else 
        result = await registerAction(email, password);
      
      if (result?.error) {
        setErrorMsg(result.error);
        setIsLoading(false);
        return;
      }

      const isSafeUrl = callbackUrl && callbackUrl.startsWith('/') && !callbackUrl.startsWith('//');
      router.push(isSafeUrl ? callbackUrl : '/');
    } catch (error) {
      console.error('[ONBOARD ERROR]:', error);
      setErrorMsg('Unexpected error occured. Try again.');
      setIsLoading(false);
    }
  };

  const handleEmailSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);

    try {
      const { exists } = await checkEmailExists(email);
      if(exists) setStep('LOGIN');
      else setStep('REGISTER'); 
    } catch (error) {
      console.error('Error occured:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full flex-1 flex flex-col laptop:w-6xl laptop:flex-row bg-white">
      {/* IMAGE */}
      <div className="hidden laptop:flex relative justify-center flex-1 min-w-3/5 max-w-3/5">
        <Image 
          src="/login-image-art.png" 
          alt="Login form image"
          priority
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="hidden laptop:block object-cover w-full h-full"
        />
      </div>

      {/* FORM */}
       <div className="w-full flex flex-col justify-between px-4 laptop:px-6 flex-1">
        <div className="flex flex-col mt-12 max-w-120 flex-1 mx-auto laptop:max-w-none w-full laptop:mb-22  laptop:justify-end">
          {/* HEADER */}
          <header className='flex flex-col gap-1 mb-16'>
            <h1 className="text-5xl text-dark-black tracking-tight">Hello</h1>
            <h2 className="text-sm text-light-black font-light tracking-wider">Log in or create your account.</h2>
          </header>
          
          {/* STEP 1 -> ASKING FOR EMAIL */}
          {step === 'EMAIL_INPUT' && (
            <form onSubmit={handleEmailSubmit} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="relative mb-8">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder=""
                  required
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  className="font-light peer w-full border-b-[0.5px] border-spanish-gray py-3 text-dark-black placeholder-transparent focus:outline-none focus:border-black transition-colors text-15 bg-transparent"
                  
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 top-2 laptop:left-0 laptop:-top-4 text-spanish-gray text-15 transition-all peer-placeholder-shown:text-15 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black cursor-text"
                >
                  E-mail address
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center bg-dark-black text-white py-3.5 rounded-2xl text-15 font-light tracking-[0.05em] transition-colors cursor-pointer hover:bg-dark-black/90"
              >
                {isLoading ? <Loader2Icon size={20} strokeWidth={1.5} className='animate-spin'/> : 'Continue'}
              </button>
            </form>
          )}
          
          {/* STEP 2 -> ASKING FOR PASSOWRD */}
          {(step === 'LOGIN' || step === 'REGISTER') && (
            <form onSubmit={handleFinalSubmit} className="relative">
              {/* SAVED EMAIL FROM STEP 1 */}
              <div className="bg-light-gray border-[0.5px] border-dark-gray/10 px-2 py-2.5 flex justify-between items-center rounded-2xl mb-12">
                <span className="text-dark-black text-15 font-light">{email}</span>
                <button 
                  type="button" 
                  onClick={() => {
                    setStep('EMAIL_INPUT');
                    setPassword('');
                    setErrorMsg(null)
                  }}
                  className="bg-dark-black text-white px-3.5 py-1.5 rounded-xl text-sm font-light hover:bg-dark-black/90 transition-colors cursor-pointer"
                >
                  Change
                </button>
              </div>

              {/* PASSWORD */}
              <div className="relative mb-8 animate-fade-in-up">
                <input 
                  id="password"
                  name="password" 
                  type="password"
                  autoFocus 
                  required 
                  minLength={8}
                  maxLength={32}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  className="font-light peer w-full border-b-[0.5px] border-spanish-gray py-3 text-dark-black placeholder-transparent focus:outline-none focus:border-black transition-colors text-15 bg-transparent"
                />
                <label 
                  htmlFor="password" 
                  className="absolute left-0 -top-4 text-spanish-gray text-15 transition-all peer-placeholder-shown:text-15 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black cursor-text"
                >
                  Password
                </label>
              </div>

              {errorMsg && <p className="text-light-red  text-xs font-light mb-8">{errorMsg}</p>}
              
              {/* LOGIN/REGISTER SUBMIT */}
              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full flex justify-center items-center bg-dark-black text-white py-3.5 rounded-2xl text-15 font-light tracking-[0.05em] transition-colors cursor-pointer hover:bg-dark-black/90"
              >
                {isLoading ? <Loader2Icon size={20} strokeWidth={1.5} className='animate-spin'/>  : step === 'REGISTER' ? 'Create Account' : 'Log In'}
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-row gap-6 mb-8 text-sm laptop:text-xs ">
          <Link href="/privacy-policy" className="text-primary hover:text-secondary-dark transition-colors">Privacy Policy</Link>
          <span className='text-primary'>&copy; 2026 Novus</span>
        </div> 
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex justify-center items-center border-2">
        <Loader2Icon className="animate-spin text-dark-black" size={32} />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}