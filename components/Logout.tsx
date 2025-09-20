'use client'
import React from 'react'
import { Button } from './ui/button';

const Logout = () => {
    const handleLogout = async () => {
    try {
      const res = await fetch("/api/authentication/logOut", {
        method: "POST",
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Button onClick={handleLogout}>Logout</Button>
  )
}

export default Logout