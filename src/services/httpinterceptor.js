import React, { useEffect } from "react";

const ApiEndpoint = process.env.REACT_APP_BASE_URL;

const withValidUserCheck = () => {
    const ValidUserChecker= () => {
        const dispatch = useAppDispatch();

        useEffect(() => {
            const checkUserValidity = async () => {
                const token = localStorage.getItem("bearerToken");
                const userId = localStorage.getItem("userId");

                if (token && userId) {
                    const apiUrl = `${ApiEndpoint}/getClient/${userId}`;
                    try {
                        const response = await fetch(apiUrl, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        if (response.ok) {
                            const data = await response.json();
                            // Perform any additional checks if needed
                        } else {
                            const errorData = await response.json();
                            toast.error(errorData.message || "An error occurred");
                            dispatch(logout());
                        }
                    } catch (error) {
                        console.error(
                            "Error occurred while checking user validity:",
                            error
                        );
                        toast.error("An error occurred while checking user validity");
                        dispatch(logout());
                    }
                } else {
                    dispatch(logout());
                }
            };

            checkUserValidity();
            const interval = setInterval(checkUserValidity, 300000); // Check user validity every 5 minutes

            return () => clearInterval(interval);
        }, [dispatch]);
        return (
            <div>
                <WrappedComponent />
                <ToastContainer />
            </div>
        );
    };

    return ValidUserChecker;
};

export default withValidUserCheck;
