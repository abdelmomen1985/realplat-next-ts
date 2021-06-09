import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { AppContext } from "../../Context/AppContextProvider";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../../query/user";
export default function Login(props: any) {
  const { setUser } = useContext(AppContext);
  const [errorMessage, setErrorMessage] =
    useState<string | undefined>(undefined);

  const { register, handleSubmit, errors } = useForm();
  const [fetchUserData, { data: userData }] = useLazyQuery(GET_USER_BY_ID, {
    onCompleted() {
      console.log(userData.users_by_pk);
      setUser({ ...userData.users_by_pk });
      props.setLoginModal(false);
      return;
    },
    onError(error) {
      console.log(error);
    },
  });
  const onLogin = async (data: any) => {
    const email = data.email;
    const password = data.password;

    await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        if (response.ok) {
          const userResp = await fetch("/api/getUserSession", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          if (userResp.status === 200) {
            let currentUser = await userResp.json();
            let currentUserId = currentUser.id;
            fetchUserData({
              variables: {
                id: currentUserId,
              },
            });
          }
        } else {
          const errorResp = await response.json();
          const errorText = errorResp.message;
          setErrorMessage(errorText);
        }
      })
      .catch((err) => {
        console.log(err.json());
      });
  };
  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <style jsx>{``}</style>
      <div className="form-group">
        <label className="block my-2" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          ref={register({
            required: "Email is Required",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Please Enter A valid Email Address",
            },
          })}
        />
        {errors.email && (
          <p className="text-sm text-bold text-red-400 px-1 py-2">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="form-group">
        <label className="block my-2" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={register({
            required: "Password is Required",
            minLength: {
              value: 8,
              message: "password can't be shorter than 8 Characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-sm text-bold text-red-400 px-1 py-2">
            {errors.password.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="my-5 mx-auto block bg-primary text-white text-center py-3 px-8 w-full rounded-md"
      >
        Sign In
      </button>
      {errorMessage && (
        <p className="d-block text-center mx-auto py-2 w-full text-red-800 font-medium">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
