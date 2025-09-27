import { useState } from "react";
// ✅ adjust path if your firebase.js is inside components
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./components/firebase"; // Adjust the path if your firebase.js is elsewhere

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get JWT (ID Token)
      const token = await user.getIdToken();
      console.log("JWT Token:", token);

      // Example: send JWT to backend
      const response = await fetch("http://localhost:5000/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage("Login successful & token sent to backend ✅");
      } else {
        setMessage("Backend request failed ❌");
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage("Login error: " + error.message);
        console.error("Login error:", error.message);
      } else {
        setMessage("Unknown login error");
        console.error("Login error:", error);
      }
    }
  };

  const handleApp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      console.log("User created successfully");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleApp}>
    <div style={{ padding: "20px" }}>
      <h2>Firebase Login</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email} // ✅ controlled input
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password} // ✅ controlled input
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />
      <button onClick={handleLogin}>Login</button>

      {message && <p>{message}</p>}
    </div>
    </form>
  );
}

export default App;

