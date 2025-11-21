import { useContext } from "react";
import { AuthContext } from "../context/userContext";

export default function useAuth() {
    return useContext(AuthContext);
}

