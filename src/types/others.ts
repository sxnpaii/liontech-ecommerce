import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

export interface LoginReq extends User {
  email: string;
  password: string;
}

export interface ProcessesContextTypes {
  modal: {
    modalState: boolean;
    mutateModal: Dispatch<SetStateAction<boolean>>;
  };
  loading: {
    loadingState: boolean;
    mutateLoading: Dispatch<SetStateAction<boolean>>;
  };
}
