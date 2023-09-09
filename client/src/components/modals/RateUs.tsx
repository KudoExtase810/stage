import { MdClose } from "react-icons/md";
import Overlay from "../Overlay";
import { useEffect, useState } from "react";
import axiosIns from "../../common/axios";
import { useAuth } from "../../context/UserContext";
import useToken from "../../hooks/useToken";
import { isAxiosError } from "axios";
import { toast } from "react-hot-toast";

interface props {
    isOpen: boolean;
    close: () => void;
}
const RateUs = ({ isOpen, close }: props) => {
    const { token } = useToken();
    const { userData, setUserData } = useAuth();
    // 0 Means not rated yet
    const [selectedRating, setSelectedRating] = useState<User["rating"]>(0);

    useEffect(() => {
        userData && setSelectedRating(userData.rating);
    }, [userData]);

    const handleRating = async (rating: User["rating"]) => {
        setSelectedRating(rating);
        try {
            await axiosIns.patch(
                `/users/rating/${userData?._id}`,
                { rating },
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            );
            toast.success("Votre évaluation a été soumise.");
            setUserData({ ...userData!, rating });
        } catch (error) {
            isAxiosError(error) && toast.error(error.response?.data.message);
        }
    };

    return (
        <dialog className="modal" open={isOpen}>
            <Overlay />
            <div className="modal-box max-w-2xl">
                <button
                    onClick={close}
                    className="absolute right-6 top-6 hover:text-primary z-10"
                >
                    <MdClose size={32} />
                </button>
                <div className="flex flex-col justify-center items-center gap-4 py-2">
                    <p className="text-md font-bold">
                        Notez votre expérience avec notre application
                    </p>
                    <div className="rating rating-lg">
            {/* loop around the ratings and change it by using the function handle rating loop using map */}
                        {[1, 2, 3, 4, 5].map((star) => (
                            <input
                                onChange={() =>
                                    handleRating(star as User["rating"])
                                }
                                key={star}
                                type="radio"
                                name="rating-8"
                                className={`mask mask-star-2 bg-orange-400 hover:bg-orange-500`}
                                checked={star === selectedRating}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </dialog>
    );
};

export default RateUs;
