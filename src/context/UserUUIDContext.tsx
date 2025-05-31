'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface UserUUIDContextProps {
  userUUID: string | null;
}

const UserUUIDContext = createContext<UserUUIDContextProps>({
  userUUID: null,
});

export const UserUUIDProvider = ({ children }: { children: React.ReactNode }) => {
  const [userUUID, setUserUUID] = useState<string | null>(null);

  useEffect(() => {
    const existingUUID = localStorage.getItem('user_uuid');
    if (existingUUID) {
      setUserUUID(existingUUID);
    } else {
      const newUUID = uuidv4();
      localStorage.setItem('user_uuid', newUUID);
      setUserUUID(newUUID);
    }
  }, []);

  return (
    <UserUUIDContext.Provider value={{ userUUID }}>
      {children}
    </UserUUIDContext.Provider>
  );
};

export const useUserUUID = () => useContext(UserUUIDContext);
