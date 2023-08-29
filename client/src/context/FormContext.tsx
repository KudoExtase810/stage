import { useState, useContext, createContext } from "react";
import { useUserData } from "./UserContext";

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
    // initalize the form type as the one the user should have access to
    const { data } = useUserData();
    const [formType, setFormType] = useState<Form>(
        data?.role === "DAM" ? "DAM" : "SJ"
    );

    return (
        <FormContext.Provider value={{ formType, setFormType }}>
            {children}
        </FormContext.Provider>
    );
};
export default FormContextProvider;
