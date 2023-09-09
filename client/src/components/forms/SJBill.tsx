import { isAxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useToken from "../../hooks/useToken";
import axiosIns from "../../common/axios";
import { BiSolidLock } from "react-icons/bi";

type FormValues = {
    caseNumber: string;
    date: string;
    place: string;
    payment: string;
    service: string;
    huissier: string;
};

interface props {
    fullCaseId: string;
    formId: string | undefined;
    close: () => void;
    fullCases: FullCase[];
}
const SJBillForm = ({ fullCaseId, formId, close, fullCases }: props) => {
    const { register, handleSubmit, formState, setValue, reset } =
        useForm<FormValues>();

    const { token } = useToken();

    const isArchived = fullCases.find((c) => c._id === fullCaseId)?.isArchived;

    // create PV
    const createPost = async (data: FormValues) => {
        try {
            const url = "/forms/SJ/bill";
            const res = await axiosIns.post(
                url,
                {
                    ...data,
                    assignTo: fullCaseId,
                },
                { headers: { authorization: `Bearer ${token}` } }
            );
            toast.success("Le formulaire a été soumis avec succès.");
            const updatedCase = fullCases.find((c) => c._id === fullCaseId)!;
            updatedCase.progress = res.data.updatedFullCase.progress;
            updatedCase.bill = res.data.updatedFullCase.bill;

            close();
        } catch (error) {
            isAxiosError(error) && toast.error(error.response?.data?.message);
        }
    };

    const editPost = async (data: FormValues) => {
        if (isArchived)
            return toast.error(
                "Cette affaire est archivée et ne peut plus être modifiée"
            );

        try {
            const url = `/forms/SJ/bill/${formId}`;
            await axiosIns.put(url, data, {
                headers: { authorization: `Bearer ${token}` },
            });
            toast.success("Le formulaire a été modifié avec succès.");
            close();
        } catch (error) {
            console.log(error);
            isAxiosError(error) && toast.error(error.response?.data?.message);
        }
    };

    // get data if a card is opened and has the form data stored in db
    // otherwise reset the form values
    useEffect(() => {
        const getData = async () => {
            const res = await axiosIns.get(`/forms/SJ/bill/${formId}`, {
                headers: { authorization: `Bearer ${token}` },
            });

            setValue("caseNumber", res.data.caseNumber);
            setValue("date", res.data.date);
            setValue("place", res.data.place);
            setValue("payment", res.data.payment);
            setValue("service", res.data.service);
            setValue("huissier", res.data.huissier);
        };
        formId ? getData() : reset();
    }, [fullCaseId]);

    return (
        <form
            className="card flex-shrink-0 bg-base-100"
            onSubmit={handleSubmit(formId ? editPost : createPost)}
            noValidate
        >
            <div className="card-body">
                <div className="flex gap-3">
                    <div className="form-control w-full">
                        <label className="label" htmlFor="cn">
                            <span className="label-text">Numéro d'affaire</span>
                        </label>
                        <input
                            id="cn"
                            {...register("caseNumber", {
                                required: "Ce champ est obligatoire.",
                            })}
                            type="text"
                            placeholder="Numéro d'affaire"
                            className="input input-bordered hover:border-primary"
                        />
                        <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                            {formState.errors.caseNumber?.message}
                        </span>
                    </div>
                    <div className="form-control w-full">
                        <label className="label" htmlFor="place">
                            <span className="label-text">Place</span>
                        </label>
                        <input
                            id="place"
                            {...register("place", {
                                required: "Ce champ est obligatoire.",
                            })}
                            type="text"
                            placeholder="Place"
                            className="input input-bordered hover:border-primary"
                        />
                        <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                            {formState.errors.place?.message}
                        </span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="form-control w-full">
                        <label className="label" htmlFor="payment">
                            <span className="label-text">Paiement</span>
                        </label>
                        <input
                            id="payment"
                            {...register("payment", {
                                required: "Ce champ est obligatoire.",
                            })}
                            type="text"
                            placeholder="Paiement"
                            className="input input-bordered hover:border-primary"
                        />
                        <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                            {formState.errors.payment?.message}
                        </span>
                    </div>
                    <div className="form-control w-full">
                        <label className="label" htmlFor="service">
                            <span className="label-text">Service</span>
                        </label>
                        <input
                            id="service"
                            {...register("service", {
                                required: "Ce champ est obligatoire.",
                            })}
                            type="text"
                            placeholder="Service"
                            className="input input-bordered hover:border-primary"
                        />
                        <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                            {formState.errors.service?.message}
                        </span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="form-control w-full">
                        <label className="label" htmlFor="huissier">
                            <span className="label-text">Huissier</span>
                        </label>
                        <input
                            id="huissier"
                            {...register("huissier", {
                                required: "Ce champ est obligatoire.",
                            })}
                            placeholder="Huissier"
                            className="input input-bordered hover:border-primary"
                        />
                        <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                            {formState.errors.huissier?.message}
                        </span>
                    </div>
                    <div className="form-control w-full">
                        <label className="label" htmlFor="date">
                            <span className="label-text">Date</span>
                        </label>
                        <input
                            id="date"
                            {...register("date", {
                                required: "Ce champ est obligatoire.",
                            })}
                            type="date"
                            placeholder="Service"
                            className="input input-bordered hover:border-primary"
                        />
                        <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                            {formState.errors.date?.message}
                        </span>
                    </div>
                </div>
                <div className="mt-6">
                    {isArchived ? (
                        <button
                            className="btn btn-primary w-full !text-base-content"
                            type="submit"
                            disabled
                        >
                            <BiSolidLock size={22} />
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary w-full"
                            type="submit"
                            disabled={formState.isSubmitting}
                        >
                            {formState.isSubmitting ? (
                                <span className="loading loading-spinner loading-lg text-gray-300"></span>
                            ) : (
                                "Soumettre"
                            )}
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default SJBillForm;
