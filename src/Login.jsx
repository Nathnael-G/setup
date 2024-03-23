import { Button } from "./components/ui/button";
import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import axios from "./api/Axios";

const LOGIN_URL = "/auth";
const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="#">Go to Home</a>
          </p>
        </section>
      ) : (
        <div>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-primary py-6 sm:py-12">
            <div className="relative bg-transparent px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 Login border-white border-4">
              <div className="mx-auto max-w-md">
                <h1 className="text-3xl font-semibold leading-9 text-white font-poppins xs:text-[48px] text-[40px] xs:leading-[76.8px] w-full text-center">
                  Login
                </h1>

                <div className="divide-y divide-gray-300/50">
                  <form
                    className="flex-1 items-center justify-center py-8 text-base leading-7 text-gray-600"
                    onSubmit={handleSubmit}
                  >
                    <label for="Username" className="text-secondary">
                      Username
                    </label>
                    <input
                      type="text"
                      ref={userRef}
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      required
                      placeholder="Tom"
                      className="mb-6 h-10 w-full rounded bg-transparent border-b-2 border-white p-4 outline-none text-sky-500 filled-input"
                    />
                    <br />
                    <label for="password" className="text-secondary">
                      Password
                    </label>
                    <input
                      type="password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      required
                      placeholder="Password123"
                      className="mb-6 h-10 w-full rounded bg-transparent border-b-2 border-white p-4 outline-none text-sky-500 filled-input"
                    />
                    <br />
                    <div class="mb-6 flex justify-between">
                      <div>
                        <input
                          type="checkbox"
                          name="Remember me"
                          id=" rememberme"
                        />
                        <label for="rememberme" className="text-secondary">
                          {" "}
                          Remember me
                        </label>
                      </div>
                      <a href="#" className="text-sky-500">
                        Forgot Password?
                      </a>
                    </div>

                    <Button className="bg-sky-500  hover:bg-sky-600 transition-colors w-full text-center font-semibold font-poppins">
                      Login
                    </Button>
                  </form>
                  <div className="pt-8 text-base font-semibold leading-7">
                    <p className="text-secondary">Don't have an account?</p>
                    <p>
                      <a href="#" className="text-sky-500 hover:text-sky-600">
                        <img src="./assets/back.png" alt="" /> Signup
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
