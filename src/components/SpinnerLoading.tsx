const SpinnerLoading = ({ bg }: { bg: string }) => {
    return (
        <svg
            className={`animate-spin h-5 w-5 mr-3 bg-[${bg}]`}
            viewBox="0 0 24 24"
        ></svg>
    );
};

export default SpinnerLoading;
