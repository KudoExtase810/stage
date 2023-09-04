import toast from "react-hot-toast";
import axiosIns from "../../common/axios";
import { isAxiosError } from "axios";
import useToken from "../../hooks/useToken";

interface props {
    fullCases: FullCase[];
    setFullCases: React.Dispatch<React.SetStateAction<FullCase[]>>;
    fullCase: FullCase | null;
    isOpen: boolean;
    close: () => void;
}

const ArchiveCase = ({
    fullCases,
    setFullCases,
    fullCase,
    isOpen,
    close,
}: props) => {
    const { token } = useToken();

    const archiveCase = async () => {
        console.log(fullCase);
        if (fullCase!.isArchived)
            return toast.error("Cette affaire est deja archivée.");

        try {
            await axiosIns.patch(
                `/cases/${fullCase!._id}/archive`,
                {},
                { headers: { authorozation: `Bearer ${token}` } }
            );
            toast.success("L'affaire a été archivée avec succès.");

            fullCase!.isArchived = true;
            setFullCases([...fullCases]);

            close();
        } catch (error) {
            isAxiosError(error) && toast.error(error.response?.data.message);
        }
    };

    return (
        <dialog className="modal" open={isOpen}>
            <div className="modal-box w-full max-w-2xl">
                <h3 className="font-bold text-lg">
                    Archiver l'affaire établie par{" "}
                    {fullCase?.requestedBy?.username}?
                </h3>
                <p className="py-4">
                    L'archivage de cette affaire est{" "}
                    <span className="text-red-500">irréversible</span>. Une fois
                    archivée, une affaire{" "}
                    <span className="text-red-500">
                        ne peut plus être modifiée
                    </span>
                    . Souhaitez-vous continuer ?
                </p>
                <div className="modal-action">
                    <button className="btn btn-outline" onClick={close}>
                        Annuler
                    </button>
                    <button
                        className="btn btn-error bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
                        onClick={archiveCase}
                    >
                        Oui, archiver
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ArchiveCase;
