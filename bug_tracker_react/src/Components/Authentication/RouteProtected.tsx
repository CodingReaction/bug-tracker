import { Redirect, useLocation, useRouter } from "wouter";
import { useProfileStore } from "../../Stores/Global/ProfileStore";


const RouteProtected = ({ component }: { component: any }) => {
    const id = useProfileStore((state) => state.id);
    const [location, _] = useLocation();
    const router = useRouter();
    return (
        <>
            {id !== null ? (
                component
            ) : (
                <Redirect to={`~/auth/login?next=${router.base + location}`} />
            )}
        </>
    );
};

export default RouteProtected;
