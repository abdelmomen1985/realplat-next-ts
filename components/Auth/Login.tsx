import React from 'react';
import { useForm } from 'react-hook-form';

export default function Login(props: any) {
  const { register, handleSubmit, watch, errors } = useForm();
  const onLogin = (data: any) => {
    console.log(data);
    props.setLoginModal(false);
    props.setAuthenticated(true);
    console.log(props.setAuthenticated(true));
  };
  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <style jsx>
        {`
          .form-group label {
            font-size: 14px;
            padding: 5px;
          }
          .form-group input {
            border-radius: 5px;
            padding: 5px;
            width: 100%;
          }
        `}
      </style>
      <div className="form-group">
        <label className="block my-2" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          ref={register({
            required: 'Email is Required',
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Please Enter A valid Email Address',
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
          ref={register({ required: 'Password is Required' })}
        />
        {errors.password && (
          <p className="text-sm text-bold text-red-400 px-1 py-2">
            {errors.password.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="my-5 mx-auto block bg-blue-900 text-white text-center py-3 px-8 w-full rounded-md"
      >
        Sign In
      </button>
    </form>
  );
}
