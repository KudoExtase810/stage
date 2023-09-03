import { useState, useEffect, useMemo } from "react";
import axiosIns from "../../common/axios";
import useToken from "../../hooks/useToken";
import { useUserData } from "../../context/UserContext";
import CaseCard from "./CaseCard";
import DAMCard from "./DAMCard";
import { HiOutlineSearch } from "react-icons/hi";

interface props {
    openDAMModal: () => void;
    openFullCaseModal: () => void;
    setFullCaseDetails: React.Dispatch<React.SetStateAction<FullCase | null>>;
    setDAMReqDetails: any;
}

const CasesList = ({
    openDAMModal,
    openFullCaseModal,
    setDAMReqDetails,
    setFullCaseDetails,
}: props) => {
    const { token } = useToken();
    const { data } = useUserData();

    // search filter query
    const [query, setQuery] = useState("");

    // only the dam request that was first created, which causes a new case to be created in the db
    const [DAMRequests, setDAMRequests] = useState<DAMRequest[]>([]);
    // full case containing the dam request, sj request, pv, facture (bill)
    const [fullCases, setFullCases] = useState<FullCase[]>([]);

    // Which items to show in the list
    const [listType, setListType] = useState<"DAM" | "SJ">("DAM");

    // Set list type according to user role
    useEffect(() => {
        if (!data) return;

        if (data.role === "Admin")
            throw new Error("You don't have access to this page!");

        setListType(data.role);
    }, [data]);

    // Fetch relevant data
    // Users with role of "DAM" will only be able to see the DAM requests
    // Users with role of "SJ" will be able to view the whole case including their DAM request
    useEffect(() => {
        const getDAMRequests = async () => {
            const res = await axiosIns.get("/forms/DAM", {
                headers: { authorization: `Bearer ${token}` },
            });
            setDAMRequests(res.data);
        };

        const getFullCases = async () => {
            const res = await axiosIns.get("/cases", {
                headers: { authorization: `Bearer ${token}` },
            });
            setFullCases(res.data);
        };

        if (!data) return;

        if (data?.role === "DAM") {
            getDAMRequests();
        } else if (data?.role === "SJ") {
            getFullCases();
        } else {
            throw new Error("You don't have access to this page!");
        }
    }, [data]);

    const listItems = listType === "DAM" ? DAMRequests : fullCases;

    // Filter options based on listType
    const filterOptions = {
        DAM: [
            { text: "Numéro d'affaire", value: "caseNumber" },
            { text: "Date", value: "date" },
            { text: "Place", value: "place" },
            { text: "Commission", value: "commission" },
            { text: "Service", value: "service" },
            { text: "Description", value: "description" },
        ],
        SJ: [
            { text: "Demandée par", value: "requestedBy" },
            { text: "Traitée par", value: "handledBy" },
            { text: "Créée le", value: "createdAt" },
            { text: "Complétée le", value: "completedAt" },
        ],
    };

    // Filter displayed list based on search method
    const [searchMethod, setSearchMethod] = useState<string>("");
    const filteredItems = useMemo(() => {
        if (!query) return listItems;
        return [...listItems].filter((item: any) => {
            return item[searchMethod]
                .toLowerCase()
                .includes(query.toLowerCase());
        });
    }, [query, listItems, searchMethod]);

    return (
        <>
            <div className="flex justify-between p-6 gap-10 bg-base-300 mb-4">
                <div className="join">
                    <div className="relative">
                        <input
                            className="input input-bordered join-item pr-6"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            type="text"
                            placeholder={`${
                                filterOptions[listType].find(
                                    (opt) => opt.value === searchMethod
                                )?.text || "Choisissez un filtre"
                            }..`}
                        />
                    </div>
                    <select
                        className="select select-bordered join-item"
                        value={searchMethod}
                        onChange={(e) => setSearchMethod(e.target.value)}
                    >
                        <option value="" disabled>
                            Filtrer par
                        </option>
                        {filterOptions[listType].map((opt, idx) => (
                            <option value={opt.value} key={idx}>
                                {opt.text}
                            </option>
                        ))}
                    </select>

                    <button className="btn btn-primary join-item">
                        <HiOutlineSearch size={22} />
                    </button>
                </div>
                <button
                    className="btn btn-primary btn-md px-5"
                    onClick={openDAMModal}
                >
                    <span>Nouvelle demande</span>
                </button>
            </div>
            <div>
                <ul className="flex flex-wrap gap-7 justify-center">
                    {listType === "DAM"
                        ? (filteredItems as DAMRequest[]).map((item) => (
                              <DAMCard
                                  key={item._id}
                                  request={item}
                                  openDAMModal={openDAMModal}
                                  setDAMReqDetails={setDAMReqDetails}
                              />
                          ))
                        : (filteredItems as FullCase[]).map((item) => (
                              <CaseCard
                                  key={item._id}
                                  fullCase={item}
                                  openFullCaseModal={openFullCaseModal}
                                  setFullCaseDetails={setFullCaseDetails}
                              />
                          ))}
                </ul>
            </div>
        </>
    );
};

export default CasesList;
