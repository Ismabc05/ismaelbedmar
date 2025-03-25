import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { LuArrowLeft } from "react-icons/lu";
import { Link } from '@inertiajs/react';

const ChangePassword = ({ user, success, errors }) => {
  const [formData, setFormData] = useState({
    new_password: '',
    new_password_confirmation: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [displayErrors, setDisplayErrors] = useState({});

  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      setDisplayErrors(errors);
      const timer = setTimeout(() => {
        setDisplayErrors({});
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      Inertia.visit('/users'); // redirect if no user
      return;
    }
    setIsLoading(true);
    Inertia.post('/users/password/update', formData, { // updated URL to match the route
      onSuccess: () => Inertia.visit('/users'), // redirect after successful update to '/users'
      onFinish: () => setIsLoading(false)
    });
  };

  return (
    <>
      {/* Updated Navbar */}
      <nav className="flex justify-center items-center h-20 border-b border-gray-300 shadow-md bg-white">
        <img src="/images/logo-1 (1).png" alt="Logo" className="h-16" />
      </nav>

      <div className="relative">
        {/* Arrow Link */}
        <Link
          href="/products"
          className="absolute top-5 left-5 text-gray-500 hover:text-black transition-colors"
        >
          <LuArrowLeft size={24} />
        </Link>

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4 text-center">Cambiar Contraseña</h1>
            {success && <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">{success}</div>}
            <p className="mb-6 text-center">Bienvenid@, {user?.name}</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="new_password" className="block text-gray-700 mb-2">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  name="new_password"
                  id="new_password"
                  value={formData.new_password}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                {displayErrors.new_password && (
                  <p className="text-red-500 text-sm mt-1">{displayErrors.new_password}</p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="new_password_confirmation" className="block text-gray-700 mb-2">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  name="new_password_confirmation"
                  id="new_password_confirmation"
                  value={formData.new_password_confirmation}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
                {displayErrors.new_password_confirmation && (
                  <p className="text-red-500 text-sm mt-1">{displayErrors.new_password_confirmation}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition-colors"
              >
                {isLoading ? "Actualizando..." : "Actualizar Contraseña"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Redesigned Footer */}
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

export default ChangePassword;
