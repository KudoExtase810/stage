const Footer = () => {
    return (
        <footer className="footer footer-center p-4 bg-base-300 text-base-content gap-4">
            <div className="flex justify-center items-center gap-4">
                <h2 className="text-sm font-bold">
                    Notez votre expérience avec notre application
                </h2>
                <div className="rating rating-md">
                    <input
                        type="radio"
                        name="rating-8"
                        className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                        type="radio"
                        name="rating-8"
                        className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                        type="radio"
                        name="rating-8"
                        className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                        type="radio"
                        name="rating-8"
                        className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                        type="radio"
                        name="rating-8"
                        className="mask mask-star-2 bg-orange-400"
                        checked
                    />
                </div>
            </div>
            <p>Copyright © 2023</p>
        </footer>
    );
};

export default Footer;
