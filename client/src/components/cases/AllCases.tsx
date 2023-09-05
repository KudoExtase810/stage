import { useState, useEffect, useMemo } from "react";
import axiosIns from "../../common/axios";
import useToken from "../../hooks/useToken";
import CaseCard from "./CaseCard";
import { HiOutlineSearch } from "react-icons/hi";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { sort } from "fast-sort";

interface props {
    fullCases: FullCase[];
    setFullCases: React.Dispatch<React.SetStateAction<FullCase[]>>;
    openFullCaseModal: () => void;
    openArchiveCaseModal: () => void;
    setFullCaseDetails: React.Dispatch<React.SetStateAction<FullCase | null>>;
    openDAMModal: () => void;
}

const AllCases = ({
    fullCases,
    setFullCases,
    openFullCaseModal,
    openArchiveCaseModal,
    setFullCaseDetails,
    openDAMModal,
}: props) => {
    const { token } = useToken();

    useEffect(() => {
        const getFullCases = async () => {
            const res = await axiosIns.get("/cases", {
                headers: { authorization: `Bearer ${token}` },
            });
            setFullCases(res.data);
        };

        getFullCases();
    }, []);

    const [sortMethod, setSortMethod] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        let sorted = [];
        switch (sortMethod) {
            case "requestedBy":
                sorted = sort(fullCases)[sortOrder](
                    (c) => c.requestedBy.username
                );
                break;
            case "handledBy":
                sorted = sort(fullCases)[sortOrder](
                    (c) => c.handledBy?.username
                );
                break;
            case "progress":
                sorted = sort(fullCases)[sortOrder]((c) => c.progress);
                break;
            case "createdAt":
                sorted = sort(fullCases)[sortOrder]((c) => c.createdAt);
                break;
            case "completedAt":
                sorted = sort(fullCases)[sortOrder]((c) => c.completedAt);
                break;

            default:
                sorted = fullCases;
                break;
        }
        setFullCases(sorted);
    }, [sortMethod, sortOrder]);

    // Filter options based on listType
    const sortOptions = [
        { text: "Établie par", value: "requestedBy" },
        { text: "Traitée par", value: "handledBy" },
        { text: "Progrès", value: "progress" },
        { text: "Créée le", value: "createdAt" },
        { text: "Complétée le", value: "completedAt" },
    ] as const;

    const [parent] = useAutoAnimate();

    return (
        <>
            <div className="flex justify-between p-6 gap-10 bg-base-300 mb-4">
                <div className="join">
                    <select
                        className="select select-bordered join-item"
                        value={sortMethod}
                        onChange={(e) => setSortMethod(e.target.value)}
                    >
                        <option value="">Trier par</option>
                        {sortOptions.map((opt, idx) => (
                            <option value={opt.value} key={idx}>
                                {opt.text}
                            </option>
                        ))}
                    </select>
                    <select
                        className="select select-bordered join-item"
                        value={sortOrder}
                        onChange={(e) =>
                            setSortOrder(e.target.value as "asc" | "desc")
                        }
                    >
                        <option value="asc">Ordre croissant ⬆⬆</option>
                        <option value="desc">Ordre décroissant ⬇⬇</option>
                    </select>

                    <button className="btn btn-primary join-item">
                        <HiOutlineSearch size={22} />
                    </button>
                </div>
                <button className="btn btn-primary btn-md px-5">
                    <span>IDK WHAT TO PUT HERE</span>
                </button>
            </div>
            <div>
                <ul className="flex flex-wrap gap-7 p-4" ref={parent}>
                    {fullCases.map((item) => (
                        <CaseCard
                            key={item._id}
                            fullCase={item}
                            openFullCaseModal={openFullCaseModal}
                            openArchiveCaseModal={openArchiveCaseModal}
                            setFullCaseDetails={setFullCaseDetails}
                            openDAMModal={openDAMModal}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
};

export default AllCases;
