import { isAxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import FormToggle from "../FormToggle";
type FormValues = {
    caseNumber: string;
    date: string;
    place: string;
    commission: string;
    service: string;
    description: string;
};

const DAMForm = () => {
    const { register, handleSubmit, formState } = useForm<FormValues>();

    const createPost = async (data: FormValues) => {
        try {
            toast.success(data.date);
        } catch (error) {
            isAxiosError(error) && toast.error(error.response?.data?.message);
        }
    };

    return (
        <form
            className="card flex-shrink-0 bg-base-100"
            onSubmit={handleSubmit(createPost)}
            noValidate
        >
            <div className="card-body">
                <div className="flex gap-3">
                    <div className="form-control w-full">
                        <label className="label" htmlFor="cn">
                            <span className="label-text">Case Number</span>
                        </label>
                        <input
                            id="cn"
                            {...register("caseNumber", {
                                required: "Ce champ est obligatoire.",
                            })}
                            type="text"
                            placeholder="Case Number"
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
                    <div className="form-control w-3/5">
                        <label className="label" htmlFor="desc">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
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
                            "Submit"
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default DAMForm;
