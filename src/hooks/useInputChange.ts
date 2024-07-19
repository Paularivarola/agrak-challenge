import { ChangeEvent, Dispatch, SetStateAction } from "react";

type InputChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

const useInputChange = <T extends Record<string, any>>() => {
  const handleInputChange = (
    e: InputChangeEvent | T,
    state: T,
    setState: Dispatch<SetStateAction<T>>
  ) => {
    let newState: T;

    if ("target" in e) {
      const { name, value, type, checked, files } = e.target;

      newState = {
        ...state,
        [name]:
          type === "checkbox"
            ? checked
            : type === "file"
            ? URL.createObjectURL(files[0])
            : value,
      };
    } else {
      newState = e;
    }

    setState(newState);
  };

  return { handleInputChange };
};

export default useInputChange;
