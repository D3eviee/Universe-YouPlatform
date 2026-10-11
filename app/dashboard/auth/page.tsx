'use client';
import { loginAction } from '@/app/actions/auth';
import Image from 'next/image';
import { useActionState } from 'react';
import logo from "@/public/icon.png" 

export default function AuthPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#111] absolute top-0 w-full">
      <div className="w-120 p-10 rounded-3xl shadow-2xl bg-[#FFF]">
        <Image 
          src={logo} 
          width={70} 
          height={70} 
          alt="icon" 
          className='mx-auto mb-10'
          sizes="(max-width: 1024px) 100vw, 50vw"  
        />

        <div className="flex flex-col gap-1.5 mb-6">
          <h1 className="text-xl font-bold text-primary leading-none">Log in</h1>
          <p className="text-sm font-base text-secondary-dark leading-none">Continue to dashobard</p>
        </div>
        
        <form action={formAction} className="flex flex-col gap-3 mb-5">
          <div>
            <label htmlFor="email" className="text-sm font-light text-secondary-dark mb-2 ml-2">E-mail</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full px-2 py-2 border border-gray-400 rounded-xl focus:ring-1 focus:ring-secondary-dark outline-none transition-all text-sm" 
              placeholder="admin@domain.com"
              autoComplete="email"
              disabled={isPending}
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-lgiht text-secondary-dark mb-2 ml-2">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              required
              className="w-full px-2 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-secondary-dark outline-none transition-all text-sm"
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={isPending}
            />
          </div>

          {/* ERROR */}
          {state && !state.success && (
            <div className="w-full text-xs text-red-400 font-light disabled:cursor-not-allowed">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full text-xs text-white bg-secondary-dark py-4 rounded-2xl font-medium disabled:cursor-not-allowed mt-4 hover:cursor-pointer hover:bg-primary"
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            ) : (
              "Log in"
            )}
          </button>
        </form>
        
      </div>
    </main>
  );
}