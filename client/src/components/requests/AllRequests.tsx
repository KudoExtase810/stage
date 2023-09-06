import { useState, useEffect, useMemo } from "react";
import axiosIns from "../../common/axios";
import useToken from "../../hooks/useToken";
import DAMCard from "../requests/DAMCard";
import { HiOutlineSearch } from "react-icons/hi";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import NoResults from "../NoResults";
import Loader from "../Loader";

interface props {
    DAMRequests: DAMRequest[];
    setDAMRequests: React.Dispatch<React.SetStateAction<DAMRequest[]>>;
    openDAMModal: () => void;
    setDAMReqDetails: React.Dispatch<React.SetStateAction<DAMRequest | null>>;
}

const AllRequests = ({
    DAMRequests,
    setDAMRequests,
    openDAMModal,
    setDAMReqDetails,
}: props) => {
    const { token } = useToken();
    const [isLoading, setIsLoading] = useState(true);

    // search filter query
    const [query, setQuery] = useState("");

    useEffect(() => {
        const getDAMRequests = async () => {
            const res = await axiosIns.get("/forms/DAM", {
                headers: { authorization: `Bearer ${token}` },
            });
            setDAMRequests(res.data);

            setIsLoading(false);
        };

        getDAMRequests();
    }, []);

    // Filter displayed list based on search method
    const [searchMethod, setSearchMethod] = useState<string>("");
    const filteredItems = useMemo(() => {
        if (!query) return DAMRequests;
        return DAMRequests.filter((item: any) => {
            return item[searchMethod]
                .toLowerCase()
                .includes(query.toLowerCase());
        });
    }, [query, DAMRequests, searchMethod]);

    const filterOptions = [
        { text: "Numéro d'affaire", value: "caseNumber" },
        { text: "Date", value: "date" },
        { text: "Place", value: "place" },
        { text: "Commission", value: "commission" },
        { text: "Service", value: "service" },
        { text: "Description", value: "description" },
    ] as const;
    const currentFilter = filterOptions.find(
        (opt) => opt.value === searchMethod
    );

    useEffect(() => {
        setQuery("");
    }, [searchMethod]);

    const [parent] = useAutoAnimate();
    return (
        <>
            <div className="flex justify-between p-6 gap-10 bg-base-300 mb-4">
                <div className="join">
                    <div className="relative">
                        <input
                            disabled={!currentFilter}
                            className="input input-bordered join-item px-4 w-64"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            type={searchMethod === "date" ? "date" : "text"}
                            placeholder={
                                currentFilter?.text || "Choisissez un filtre"
                            }
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
                        {filterOptions.map((opt, idx) => (
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

            {isLoading ? (
                <Loader />
            ) : (
                <div ref={parent}>
                    {filteredItems.length ? (
                        <ul className="flex flex-wrap gap-7 p-4" ref={parent}>
                            {filteredItems.map((item) => (
                                <DAMCard
                                    key={item._id}
                                    request={item}
                                    openDAMModal={openDAMModal}
                                    setDAMReqDetails={setDAMReqDetails}
                                />
                            ))}
                        </ul>
                    ) : (
                        <NoResults />
                    )}
                </div>
            )}
        </>
    );
};

export default AllRequests;
