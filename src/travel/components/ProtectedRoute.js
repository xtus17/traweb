import { useAutenticado } from "../context/authContext";
import { Navigate } from "react-router-dom";
import { Spinner, Box } from "@chakra-ui/react";

export function ProtectedRoute({ children }) {
  const { user, loading } = useAutenticado();

  if (loading)
    return (
      <Box
        justify="center"
        textAlign="center"
        flex={1}
        alignItems="center"
        justifyContent={"center"}
      >
        <Spinner size="xl" />
      </Box>
    );

  if (!user) return <Navigate to="/travel" />;

  return <>{children}</>;
}
