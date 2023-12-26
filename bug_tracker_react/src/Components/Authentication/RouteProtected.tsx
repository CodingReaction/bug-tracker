import { Redirect, useLocation, useRouter } from "wouter";
import { useProfileStore } from "../../Stores/Global/ProfileStore";
import useLoginEffect from "../../Hooks/useLoginEffect";

const RouteProtected = ({ component }: { component: any }) => {
    const id = useProfileStore((state) => state.id);
    const [location, _] = useLocation();
    const router = useRouter();

    const {isLoading} = useLoginEffect();

    if (isLoading){
        return <div>Looking for user data</div>
    }

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
