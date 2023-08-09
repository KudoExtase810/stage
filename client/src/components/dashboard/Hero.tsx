import goku from "../../assets/goku.webp";
interface props {
    openModal: () => void;
}
const Hero = ({ openModal }: props) => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={goku}
                    className="max-w-sm rounded-lg shadow-2xl"
                    alt="goku"
                />
                <div>
                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary" onClick={openModal}>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;