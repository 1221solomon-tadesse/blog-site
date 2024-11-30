import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {  
  return (
    <main>
      <footer className="bg-blue-500 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between ">
            <div className="mb-4 md:mb-0">
              <h5 className="text-lg font-bold">XTRIMUM SOLUTI0N</h5>
              <p className="text-sm">Development company</p>
            </div>
            <div className="mb-4 md:">
              <h6 className="text-sm font-semibold">Links</h6>
              <ul>
                <li>
                  <Link href="#" className="hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="text-sm font-semibold p-6">Follow Us</h6>
              <ul className="flex space-x-4 gap-6 ">
                <li>
                  <Link href="#" className="hover:underline ">
                    <FaFacebook />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    <BsTwitterX />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    <FaLinkedinIn />
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    <FaInstagram />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center text-sm">
            &copy; 2024 Xtrimum solution. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Footer
