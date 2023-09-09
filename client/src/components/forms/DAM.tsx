import { isAxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axiosIns from "../../common/axios";
import useToken from "../../hooks/useToken";
import { useAuth } from "../../context/UserContext";
import { useEffect } from "react";
type FormValues = {
    caseNumber: string;
    date: string;
    lieu: string;
    commission: string;
    service: string;
    description?: string;
};
interface props {
    DAMRequests: DAMRequest[];
    setDAMRequests: React.Dispatch<React.SetStateAction<DAMRequest[]>>;
    existingData: DAMRequest;
    readOnlyMode?: boolean;
    close: () => void;
}
const DAMForm = ({
    DAMRequests,
    setDAMRequests,
    existingData,
    readOnlyMode,
    close,
}: props) => {
    const { register, handleSubmit, formState, setValue, reset } =
        useForm<FormValues>();

    const { token } = useToken();
    const { userData } = useAuth();

    const createDAMRequest = async (data: FormValues) => {
        try {
            const reqData = { ...data, requestedBy: userData?._id };
            const res = await axiosIns.post("/forms/DAM", reqData, {
                headers: { authorization: `Bearer ${token}` },
            });
            setDAMRequests([...DAMRequests, res.data.newRequest]);

            toast.success("Le demande a été soumise avec succès.");

            close();
        } catch (error) {
            isAxiosError(error) && toast.error(error.response?.data?.message);
        }
    };

    const updateDAMRequest = async (data: FormValues) => {
        try {
            const res = await axiosIns.put(
                `/forms/DAM/${existingData._id}`,
                data,
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            );

            const updatedDAMRequest = DAMRequests.find(
                (req) => req._id === existingData._id
            )!;
            Object.assign(updatedDAMRequest, res.data.updated);

            toast.success("Demande modifiée avec succès!");

            setDAMRequests([...DAMRequests]);
            close();
        } catch (error) {
            isAxiosError(error) && toast.error(error.response?.data?.message);
        }
    };

    // set default field values to existing data if it exists ( if you're not creating )
    useEffect(() => {
        if (existingData) {
            setValue("caseNumber", existingData.caseNumber);
            setValue("date", existingData.date);
            setValue("lieu", existingData.lieu);
            setValue("commission", existingData.commission);
            setValue("service", existingData.service);
            setValue("description", existingData.description);
        } else {
            reset();
        }
    }, [existingData]);

    return (
        <form
            className="card flex-shrink-0 bg-base-100"
            onSubmit={handleSubmit(
                existingData ? updateDAMRequest : createDAMRequest
            )}
            noValidate
        >
            <div className="card-body">
                <div className="flex gap-3">
                    <div className="form-control w-full">
                        <label className="label" htmlFor="cn">
                            <span className="label-text">Numéro d'affaire</span>
                        </label>
                        <input
                            disabled={readOnlyMode}
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
                            disabled={readOnlyMode}
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
                            disabled={readOnlyMode}
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
                            disabled={readOnlyMode}
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
                    <div className="form-control w-3/5">
                        <label className="label" htmlFor="desc">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            disabled={readOnlyMode}
                            id="desc"
                            {...register("description", {
                                required: "Ce champ est obligatoire.",
                            })}
                            placeholder="Description"
                            className="textarea textarea-bordered hover:border-primary"
                        />
                        <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                            {formState.errors.description?.message}
                        </span>
                    </div>
                    <div className="form-control w-2/5">
                        <label className="label" htmlFor="date">
                            <span className="label-text">Date</span>
                        </label>
                        <input
                            disabled={readOnlyMode}
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
                {readOnlyMode || (
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
                )}
            </div>
        </form>
    );
};

export default DAMForm;
