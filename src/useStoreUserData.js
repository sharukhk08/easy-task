import { getAdditionalUserInfo } from "firebase/auth";
import React, { useState, useEffect } from "react";

export function useStoreUserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       const user = await getAdditionalUserInfo();
  //       setUser(user);
  //       setLoading(false);
  //     };
  //     fetchUser();
  //   }, []);

  return { user, loading };
}
