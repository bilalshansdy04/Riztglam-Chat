import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Welcome to Ritzglam Chat</h1>
      <Link to="/dashboard" className="underline" >Klik Untuk Masuk ke Dashboard</Link>
    </div>
  );
}

export default Login;
