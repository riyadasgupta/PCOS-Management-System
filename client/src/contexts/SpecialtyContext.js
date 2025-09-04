import React, { createContext, useContext, useState } from 'react';

const SpecialtyContext = createContext();

export const useSpecialty = () => useContext(SpecialtyContext);

export function SpecialtyProvider({ children }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  const clearSpecialty = () => setSelectedSpecialty(null);

  return (
    <SpecialtyContext.Provider value={{ selectedSpecialty, setSelectedSpecialty, clearSpecialty }}>
      {children}
    </SpecialtyContext.Provider>
  );
}
