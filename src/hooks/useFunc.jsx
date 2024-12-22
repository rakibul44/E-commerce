import { useContext } from "react";
import { FuncContext } from "../Providers/FuncProvider";

const useFunc = () => {
    const func = useContext(FuncContext);
    return func;
};

export default useFunc;