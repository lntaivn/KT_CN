
import { Link, useNavigate, useParams } from "react-router-dom"; // Import useHistory from react-router-dom
import { onAuthStateChanged } from "firebase/auth";

import { auth, signInWithGoogle, signOut} from "../../../../service/firebase";
import { postToken} from "../../../../service/LoginService";
import { User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, ScrollShadow, Button } from "@nextui-org/react";

import { useEffect, useState } from "react";


const Login = (props) => {
    const navigate = useNavigate();

    const {setUser} = props;

    const handleLoginWithGoogle = async (onClose) => {
        try {
            const user = await signInWithGoogle();
            // setUser(user);
            const response = await postToken(user.email, user.uid, user.photoURL, user.displayName);
            if (response.data) {
                navigate("/admin/");
            } 

        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 500) {
                alert("Login failed");
                navigate("/login");
            }
        }
    }
    return (
        <div>
            <Button color="primary" className="w-full" onClick={() => { handleLoginWithGoogle() }} >
                đăng nhập nè
            </Button>
        </div>
    )
}
export default Login