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
    lieu: string;
    commission: string;
    service: string;
    subject: string;
    huissier: string;
    from: string;
};

interface props {
    fullCaseId: string;
    formId: string | undefined;
    nextPage: () => void;
    fullCases: FullCase[];
}
const SJPVForm = ({ fullCaseId, formId, nextPage, fullCases }: props) => {
    const { register, handleSubmit, formState, setValue, reset } =
        useForm<FormValues>();

    const { token } = useToken();

    const isArchived = fullCases.find((c) => c._id === fullCaseId)?.isArchived;

    // create PV
    const createPost = async (data: FormValues) => {
        try {
            const url = "/forms/SJ/pv";
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
            updatedCase.PV = res.data.updatedFullCase.PV;

            nextPage();
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
            const url = `/forms/SJ/pv/${formId}`;
            await axiosIns.put(url, data, {
                headers: { authorization: `Bearer ${token}` },
            });
            toast.success("Le formulaire a été modifié avec succès.");
            nextPage();
        } catch (error) {
            isAxiosError(error) && toast.error(error.response?.data?.message);
        }
    };

    // get data if a card is opened and has the form data stored in db
    // otherwise reset the form values
    useEffect(() => {
        const getData = async () => {
            const res = await axiosIns.get(`/forms/SJ/pv/${formId}`, {
                headers: { authorization: `Bearer ${token}` },
            });

            setValue("caseNumber", res.data.caseNumber);
            setValue("date", res.data.date);
            setValue("lieu", res.data.lieu);
            setValue("commission", res.data.commission);
            setValue("service", res.data.service);
            setValue("subject", res.data.subject);
            setValue("huissier", res.data.huissier);
            setValue("from", res.data.from);
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
                        <label className="label" htmlFor="lieu">
                            <span className="label-text">Lieu</span>
                        </label>
                        <input
                            id="lieu"
                            {...register("lieu", {
                                required: "Ce champ est obligatoire.",
                            })}
                            type="text"
                            placeholder="Lieu"
                            className="input input-bordered hover:border-primary"
                        />
                        <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                            {formState.errors.lieu?.message}
                        </span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="form-control w-full">
                        <label className="label" htmlFor="commission">
                            <span className="label-text">Commission</span>
                        </label>
                        <input
                            id="commission"
                            {...register("commission", {
                                required: "Ce champ est obligatoire.",
                            })}
                            type="text"
                            placeholder="Commission"
                            className="input input-bordered hover:border-primary"
                        />
                        <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                            {formState.errors.commission?.message}
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
                        <label className="label" htmlFor="subject">
                            <span className="label-text">Sujet</span>
                        </label>
                        <input
                            id="subject"
                            {...register("subject", {
                                required: "Ce champ est obligatoire.",
                            })}
                            type="text"
                            placeholder="Sujet"
                            className="input input-bordered hover:border-primary"
                        />
                        <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                            {formState.errors.subject?.message}
                        </span>
                    </div>
                    <div className="form-control w-full">
                        <label className="label" htmlFor="huissier">
                            <span className="label-text">Huissier</span>
                        </label>
                        <input
                            id="huissier"
                            {...register("huissier", {
                                required: "Ce champ est obligatoire.",
                            })}
                            type="text"
                            placeholder="Huissier"
                            className="input input-bordered hover:border-primary"
                        />
                        <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                            {formState.errors.huissier?.message}
                        </span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="form-control w-full">
                        <label className="label" htmlFor="from">
                            <span className="label-text">Par</span>
                        </label>
                        <input
                            id="from"
                            {...register("from", {
                                required: "Ce champ est obligatoire.",
                            })}
                            type="text"
                            placeholder="Par"
                            className="input input-bordered hover:border-primary"
                        />
                        <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                            {formState.errors.from?.message}
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

export default SJPVForm;
