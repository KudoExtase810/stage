interface props {
    modal?: boolean;
}

const Loader = ({ modal }: props) => {
    if (modal)
        return (
            <div className="flex items-center justify-center fixed inset-0 h-full w-full bg">
                <div className="loading loading-spinner w-20 text-primary"></div>
            </div>
        );

    return (
        <div className="flex items-center justify-center inset-0 fixed h-screen w-screen">
            <div className="loading loading-spinner w-28 text-primary"></div>
        </div>
    );
};

export default Loader;
