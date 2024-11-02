import { CSSProperties } from "react";

const Spinner = ({
    size,
    borderColor,
    borderTopColor,
    borderWidth,
}: {
    size: string;
    borderColor: string;
    borderTopColor: string;
    borderWidth: string;
}) => {
    const style: CSSProperties = {
        height: size,
        width: size,
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderTopColor: borderTopColor,
    };
    return (
        <div style={style} className="animate-spin rounded-full" />
    );
};

export default Spinner;
