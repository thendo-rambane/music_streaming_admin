import axios from "axios";

export function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    console.error("Axios Error: ", error);
    throw error;
  } else {
    console.error("Uknown error: ", error);
    throw error;
  }
}
