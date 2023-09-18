import { toast } from 'react-toastify';

export const successToast = (message) => {
  return toast.success(message);
};

export const errorToast = (message) => {
  return toast.error(message);
};
export const successToastKurulum = (message, still) => {
  return toast.success(message, still);
};
