const Footer = () => {
    return (
        <footer className="footer footer-center p-4 bg-base-300 text-base-content gap-4">
            <div className="flex justify-center items-center gap-4">
                <p className="text-sm font-bold">
                    Notez votre expérience avec notre application
                </p>
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
            <span>Copyright © 2023</span>
        </footer>
    );
};

export default Footer;
