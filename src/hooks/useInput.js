import { useState } from "react";

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleReset = (event) => {
        setValue("");
    }
    return {
        value,
        onChange: handleChange
    };
};

export default useInput;