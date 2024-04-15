import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const nameContent = useRef();
  const emailContent = useRef();
  const passwordContent = useRef();

  const navigate = useNavigate();

  const handleCreateBtn = async (e) => {
    e.preventDefault();
    const name = nameContent.current.value;
    const email = emailContent.current.value;
    const password = passwordContent.current.value;
    try {
      const res = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      console.log(res);

      if (!res.ok) {
        throw new Error(
          `Failed to create user: ${res.status} ${res.statusText}`
        );
      }

      console.log("User created successfully");
    } catch (error) {
      console.error("Failed to create user", error);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 h-screen dark:bg-black">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-black dark:border-gray-400">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => handleCreateBtn(e)}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    ref={nameContent}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    ref={emailContent}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    ref={passwordContent}
                    placeholder=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white border border-gray-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:border-gray-300 "
                >
                  Create an account
                </button>
              </form>
              <div>
                <p className="text-white text-sm font-medium uppercase text-center">
                  (OR)
                </p>
              </div>

              <div className="flex justify-center items-center">
                {/* <GoogleLogin
                  clientId="107954496633-879mkm2p1cacotlhocqb52nqqff4djng.apps.googleusercontent.com"
                  onSuccess={(credentialResponse) => {
                    var credentialResponseDecoded = jwtDecode(
                      credentialResponse.credential
                    );
                    console.log(credentialResponseDecoded);
                    document.cookie = `Credential=${credentialResponseDecoded.email}; path=/; secure; sameSite=strict;`;
                    navigate("/");
                  }}
                  onFailure={() => {
                    console.log("Login Failed");
                  }}
                  cookiePolicy={"single_host_origin"}
                /> */}

                <GoogleLogin
                  clientId="107954496633-879mkm2p1cacotlhocqb52nqqff4djng.apps.googleusercontent.com"
                  onSuccess={async (credentialResponse) => {
                    try {
                      const credentialResponseDecoded = jwtDecode(
                        credentialResponse.credential
                      );
                      const res = await fetch(
                        "http://localhost:3001/user/google-signin",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            idToken: credentialResponse.credential,
                            name: credentialResponseDecoded.name,
                            email: credentialResponseDecoded.email,
                            password: "", // You can set a default value for password or handle it differently
                          }),
                        }
                      );

                      if (!res.ok) {
                        throw new Error(
                          `Failed to sign in with Google: ${res.status} ${res.statusText}`
                        );
                      }

                      const data = await res.json();
                      console.log(data);

                      if (data) {
                        document.cookie = `uid=${data.sessionId}; path=/; secure; sameSite=strict;`;
                        console.log("cookie setted");
                      }

                      // Handle successful sign-in with Google
                      console.log("Sign in with Google successful");
                      navigate("/"); // Redirect to home page or any other route
                    } catch (error) {
                      console.error("Failed to sign in with Google", error);
                    }
                  }}
                  onFailure={() => {
                    console.log("Login Failed");
                  }}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
              <div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
