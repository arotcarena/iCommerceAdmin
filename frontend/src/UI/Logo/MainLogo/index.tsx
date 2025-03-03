import { LogoDark } from "../LogoDark";
import { LogoLight } from "../LogoLight";
import { Link } from "react-router-dom";

export const MainLogo = () => {
    
    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', cursor: 'pointer'}}>
                <div className="mt-3 position-relative" >
                    <Link to="/">
                        <LogoDark />
                        <LogoLight />
                    </Link>
                </div>
            </div>
        </>
    )
}