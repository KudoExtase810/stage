import { useState, useContext, createContext } from "react";

type CtxProps = {
    children: React.ReactNode;
};

type Form = "SJ" | "SJBill" | "SJPV" | "DAM";

type FormContext = {
    formType: Form;
    setFormType: React.Dispatch<React.SetStateAction<Form>>;
};

const FormContext = createContext({} as FormContext);

export const useFormType = () => useContext(FormContext);

const FormContextProvider = ({ children }: CtxProps) => {
    const [formType, setFormType] = useState<Form>("DAM");

    return (
        <FormContext.Provider value={{ formType, setFormType }}>
            {children}
        </FormContext.Provider>
    );
};
export default FormContextProvider;
