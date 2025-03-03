import { PropsWithChildren } from "react";
import { Progress } from "reactstrap";

type Props = PropsWithChildren<{
    progress: number,
    total: number,
    title: string,
}>;

export const ProgressShow = ({
    progress,
    total,
    title,
    children,
}: Props) => {
    const progressPercent = Math.round((progress - 1) * 100 / total);
    return (
        <div className="my-4 pt-2 fs-15 mx-4 mx-sm-5 text-center">
            <h4>{title}</h4>
            <p className="text-muted m-4">
                {children}
            </p>
            <Progress className="progress-xl my-4" striped color="primary" value={progressPercent}>
                {progressPercent} %
            </Progress>
        </div>
    )
}
