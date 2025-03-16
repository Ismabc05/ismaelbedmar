import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { LuArrowLeft } from "react-icons/lu";
import { Link } from '@inertiajs/react';

const ChangeName = ({ user, success, errors }) => {
  const [newName, setNewName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Inertia.post('/users/name/update', { new_name: newName });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-center items-center h-20 border-b border-gray-300 shadow-md bg-white">
        <img src="/images/logo-1 (1).png" alt="Logo" className="h-16" />
      </nav>

      <div className="relative">
        {/* Back arrow */}
        <Link
          href="/products"
          className="absolute top-5 left-5 text-gray-500 hover:text-black transition-colors"
        >
          <LuArrowLeft size={24} />
        </Link>

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4 text-center">Cambiar Nombre</h1>
            {success && <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">{success}</div>}
            <p className="mb-6 text-center">Bienvenid@, {user.name}</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="new_name" className="block text-gray-700 mb-2">
                  Nuevo Nombre
                </label>
                <input
                  type="text"
                  name="new_name"
                  id="new_name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                {errors.new_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.new_name}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition-colors"
              >
                Actualizar Nombre
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className="bg-white pt-8 border-t border-gray-300">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-around">
          <div className="mb-4 md:mb-0">
            <h4 className="font-bold text-gray-700 mb-2">Sobre Nosotros</h4>
            <p className="text-gray-600 mb-2">
              Ofrecemos productos y servicios de alta calidad a nuestros clientes de todo el mundo.
            </p>
          </div>
          <div className="mb-4 md:mb-0">
            <h4 className="font-bold text-gray-700 mb-2">Contactos</h4>
            <p className="text-gray-600 mb-1">Email: ismaelbedmarcejas@gmail.com</p>
            <p className="text-gray-600">Email: cristiancosanocejas@gmail.com</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-700 mb-2">Seguirnos</h4>
            <div>
              <a
                href="https://www.facebook.com/profile.php?id=100018710419037"
                className="text-blue-500 hover:underline mx-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              |
              <a
                href="https://x.com/BedmarCeja30211"
                className="text-blue-500 hover:underline mx-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
              |
              <a
                href="https://www.instagram.com/ismael_bedmar/"
                className="text-blue-500 hover:underline mx-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-4 pb-4">
          &copy; 2025 IsmaelBedmar. All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default ChangeName;
