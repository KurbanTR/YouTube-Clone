import { createContext, useContext } from "react";

interface GenresContextType {
  genre: string;
  setGenre: (newGenre: string) => void;
}

export const GenresContext = createContext<GenresContextType | undefined>(undefined);

export const useGenres = () => {
    const context = useContext(GenresContext);
    if (!context) {
      throw new Error("useGenres должен использоваться внутри GenresContext.Provider");
    }
    return context;
};