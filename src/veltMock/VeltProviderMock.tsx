import React, { createContext, useContext } from 'react';

/**
 * VeltProviderMock
 * - This is a drop-in mock provider that exposes the minimal API your app needs.
 * - Replace this file with the real '@veltdev/react' provider when you integrate.
 */

type VeltContext = {
  apiKey?: string | undefined;
  identify?: (payload: any)=>void;
};

const Ctx = createContext<VeltContext | null>(null);

export const VeltProviderMock: React.FC<{children:React.ReactNode, apiKey?:string}> = ({children, apiKey})=>{
  const identify = (payload:any) => {
    console.info('[VeltMock] identify called', payload);
  };

  return <Ctx.Provider value={{apiKey, identify}}>{children}</Ctx.Provider>;
};

export const useVeltClientMock = ()=> {
  const ctx = useContext(Ctx);
  if(!ctx) throw new Error('useVeltClientMock must be used inside VeltProviderMock');
  return {
    client: {
      identify: ctx.identify
    }
  };
};
