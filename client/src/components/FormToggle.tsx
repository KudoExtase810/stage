import { useFormType } from "../context/FormContext";

const FormToggle = () => {
    const { formType, setFormType } = useFormType();
    return (
        <select
            className="select select-accent w-2/5"
            onChange={(e) => setFormType(e.target.value as typeof formType)}
            defaultValue=""
        >
            <option disabled value="">
                Changer de formulaire
            </option>
            <option value="SJ" hidden={formType === "SJ"}>
                Service Juridique
            </option>
            <option value="SJBill" hidden={formType === "SJBill"}>
                SJ (Facture)
            </option>
            <option value="SJPV" hidden={formType === "SJPV"}>
                SJ (Procès-verbal)
            </option>
            <option value="DAM" hidden={formType === "DAM"}>
                DAM
            </option>
        </select>
    );
};

export default FormToggle;
