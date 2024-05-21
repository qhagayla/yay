import { register, login } from "@/services/api/authentication";

// Register user

const registerService = async (userData) => {
    const response = await register(userData); // uses

    console.log(response.status);

    return response.data;
};

// Login user

const loginService = async (userData) => {
    const response = await login(userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
};

// Logout

const logout = () => {
    return localStorage.removeItem("user");
};

// Reset Password

const resetPassword = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    const response = await axios.post(RESET_PASSWORD_URL, userData, config);

    return response.data;
};

// Reset Password

const resetPasswordConfirm = async (userData) => {
    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    const response = await axios.post(
        RESET_PASSWORD_CONFIRM_URL,
        userData,
        config
    );

    return response.data;
};

// Get User Info

const getUserInfo = async (accessToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };

    const response = await axios.get(GET_USER_INFO, config);

    return response.data;
};

const changePassword = async (passwordData) => {
    const config = {
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).access
            }`, // Include JWT token for authentication
        },
    };

    const response = await axios.post(
        CHANGE_PASSWORD_URL,
        passwordData,
        config
    );
    return response.data;
};

const authService = {
    registerService,
    loginService,
    logout,
    resetPassword,
    resetPasswordConfirm,
    getUserInfo,
    changePassword,
};

export default authService;
