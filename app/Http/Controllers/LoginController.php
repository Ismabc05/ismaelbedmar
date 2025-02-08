<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;



class LoginController extends Controller {

    public function loginForm() {
        $users = User::all();
        return Inertia::render('User/Login', [
            'users' => $users
        ]);
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ], [
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección válida.',
            'password.required' => 'La contraseña es obligatoria.'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            throw new HttpException(404, 'El correo electrónico no está registrado.');
        }

        if (!Hash::check($request->password, $user->password)) {
            throw new HttpException(401, 'La contraseña ingresada es incorrecta.');
        }

        Auth::login($user);
        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'user' => $user
        ]);
    }



    public function create() {
        $user = User::all();
        return Inertia::render('User/Create', [
            'user' => $user
        ]);
    }


    /**
     * Store a newly created user in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        return to_route('users.login')->with('success', 'User created successfully.');
    }
}

