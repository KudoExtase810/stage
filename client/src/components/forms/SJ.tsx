import { isAxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axiosIns from "../../common/axios";
import useToken from "../../hooks/useToken";
type FormValues = {
    caseNumber: string;
    date: string;
    place: string;
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
const SJForm = ({ fullCaseId, formId, nextPage, fullCases }: props) => {
    const { register, handleSubmit, formState, setValue, reset } =
        useForm<FormValues>();

    const { token } = useToken();

    // create SJ request
    const createPost = async (data: FormValues) => {
        try {
            const url = "/forms/SJ/request";
            const res = await axiosIns.post(
                url,
                {
                    ...data,
                    assignTo: fullCaseId,
                },
                { headers: { authorization: `Bearer ${token}` } }
            );
            toast.success("All good bro");
            const updatedCase = fullCases.find((c) => c._id === fullCaseId)!;
            updatedCase.progress = res.data.updatedFullCase.progress;
            updatedCase.SJRequest = res.data.updatedFullCase.SJRequest;

            nextPage();
        } catch (error) {
            isAxiosError(error) && toast.error(error.response?.data?.message);
        }
    };

    const editPost = async (data: FormValues) => {
        try {
            const url = `/forms/SJ/request/${formId}`;
            const res = await axiosIns.put(url, data, {
                headers: { authorization: `Bearer ${token}` },
            });
            toast.success("All good bro");
            nextPage();
        } catch (error) {
            isAxiosError(error) && toast.error(error.response?.data?.message);
        }
    };

    // get data if a card is opened and has the form data stored in db
    // otherwise reset the form values
    useEffect(() => {
        const getData = async () => {
            const res = await axiosIns.get(`/forms/SJ/request/${formId}`, {
                headers: { authorization: `Bearer ${token}` },
            });

            setValue("caseNumber", res.data.caseNumber);
            setValue("date", res.data.date);
            setValue("place", res.data.place);
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
                </div>
            </div>
        </form>
    );
};

export default SJForm;
