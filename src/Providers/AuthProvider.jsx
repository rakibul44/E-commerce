import  { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  
  sendPasswordResetEmail,
  // confirmPasswordReset,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  EmailAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { authApi } from "../redux/apis/authApi";
import { usersApi } from "../redux/apis/usersApi";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const email = localStorage.getItem('email');
  const { data: userData } = usersApi.useGetUserByEmailQuery(email);
  const loggedInUser = userData?.data;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const [createJwtToken ] = authApi.useCreateJwtTokenMutation();
  const [logoutUser ] = authApi.useLogoutUserMutation();



  // Create user with email and password
  const createUser = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      return userCredential;
    } catch (error) {
      console.log("Error creating user:", error);
      toast.error("Error creating user. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Send password reset email
  const sendResetPasswordEmail = async (email) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      return true
    } catch (error) {
      console.log("Error sending reset email: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (oldPassword, newPassword) => {
    try {
      if (!auth.currentUser) {
        throw new Error("User is not authenticated");
      }

      // Reauthenticate the user with current password
      const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update to the new password
      await updatePassword(auth.currentUser, newPassword);
      toast.success("Password has been changed successfully!");
    } catch (error) {
      console.error("Error changing password: ", error);
      toast.error("Failed to change password. Please check your inputs.");
    }
  };

  // Sign in user
  const signIn = async(email, password) => {
    setLoading(true);
    await createJwtToken({ email, password})
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    try {
      setLoading(true);
      localStorage.removeItem("email")
       await logoutUser(); // Call API to log out
     
      return signOut(auth); // Firebase sign-out
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out.");
    } finally {
      setLoading(false);
    }
  };


  // Update user profile
  const updateUserProfiole = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo ? photo : "",
    });
  };

  // Create user with Google
  const googleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.log("google login error: ", error);
    }
  };

  // Current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // const email = currentUser?.email 
        // // Get token and store on client
        // const handleCreateToken = async () => {
        //    await createJwtToken({ email })
        // };
        // localStorage.setItem("email", currentUser?.email);
        
        // handleCreateToken();

      }
      setLoading(false);
      console.log("current user --> : ", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // auth information
  const authInfo = {
    loggedInUser,
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfiole,
    googleSignIn,
    sendResetPasswordEmail,
    resetPassword,
    
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
