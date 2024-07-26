import { ReactNode, createContext, useState } from "react";
import { ProcessesContextTypes } from "../types/others";

export const ProcessesContext = createContext<ProcessesContextTypes>({
  modal: {
    modalState: false,
    mutateModal: () => {},
  },
  loading: {
    loadingState: false,
    mutateLoading: () => {},
  },
});

const ProcessesContextProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const value: ProcessesContextTypes = {
    modal: {
      modalState: modal,
      mutateModal: setModal,
    },
    loading: {
      loadingState: isLoading,
      mutateLoading: setIsLoading,
    },
  };

  return (
    <ProcessesContext.Provider value={value}>
      {children}
    </ProcessesContext.Provider>
  );
};

export default ProcessesContextProvider;
