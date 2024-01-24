import { previousGamesEl } from "../lib/store"
import { ServerURl } from "$lib/backendUrl"
const URl = ServerURl()

export const useCrashverification = () => {
    let error;
    let isLoading;
    const verifyCrash = async (data) => {
      isLoading = true
      error = null
      const response = await fetch(
        `${URl}/crash-history`,{
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        isLoading = false;
        error = json.error
        console.log(error)
      }
      if (response.ok) {
        // Save user to localStorage
        previousGamesEl.set(json)
        isLoading = false
      }
    };
    return { verifyCrash, isLoading, error };
 };