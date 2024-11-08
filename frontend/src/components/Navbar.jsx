import React from 'react'

const Navbar = () => {
  return (
    <div className="text-center bg-slate-400 p-5">
      <ul className="flex justify-around">
        <h1>LOGO</h1>
        <a href="/">Home</a>
        <a href="/AddPost">Add post</a>
        <li>display</li>
      </ul>
    </div>
  );
}

export default Navbar
