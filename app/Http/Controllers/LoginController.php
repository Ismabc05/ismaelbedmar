<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

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

    public function editPassword(Request $request) {
        $user = Auth::user();
        return Inertia::render('User/ChangePassword', [
            'user' => $user
        ]);
    }

    public function updatePassword(Request $request) {
        $request->validate([
            'new_password'     => 'required|string|min:8|confirmed',
        ], [
            'new_password.min'       => 'La contraseña debe tener al menos 8 caracteres.',
            'new_password.confirmed' => 'La confirmación de la contraseña no coincide.',
        ]);

        $user = Auth::user();

        $user->password = bcrypt($request->new_password);
        $user->save();

        // Cerrar la sesión para forzar a que el usuario inicie de nuevo
        Auth::logout();
        return redirect('/login')->with('success', 'Contraseña actualizada correctamente. Por favor inicia sesión con la nueva contraseña.');
    }

    public function editEmail(Request $request)
    {
        return Inertia::render('User/ChangeEmail', [
            'user' => $request->user(),
            // Optionally pass flash messages or errors
        ]);
    }

    public function updateEmail(Request $request)
    {
        $user = $request->user();

        // Validate input with confirmation rule ("new_email" must match "new_email_confirmation")
        $request->validate([
            'current_email'            => 'required|email',
            'new_email'                => 'required|email|confirmed',
        ], [
            'current_email.required'   => 'El correo actual es obligatorio.',
            'current_email.email'      => 'El correo actual debe ser válido.',
            'new_email.required'       => 'El nuevo correo es obligatorio.',
            'new_email.email'          => 'El nuevo correo debe ser válido.',
            'new_email.confirmed'      => 'La confirmación del nuevo correo no coincide.',
        ]);

        // Check if the provided current email matches the logged-in user's email
        if ($user->email !== $request->current_email) {
            return back()->withErrors(['current_email' => 'El correo actual no coincide con el registrado.']);
        }

        // Ensure the new email is different from current email
        if ($user->email === $request->new_email) {
            return back()->withErrors(['new_email' => 'El nuevo correo debe ser diferente al correo actual.']);
        }

        // Update email
        $user->email = $request->new_email;
        $user->save();

        // Change redirection to go to "/products" after update
        return redirect('/products')->with('success', 'Correo cambiado con exito.');
    }

    public function editName(Request $request)
    {
        return Inertia::render('User/ChangeName', [
            'user' => $request->user(),
            // Optionally include any flash messages or errors
        ]);
    }

    public function updateName(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'new_name' => 'required|string|max:255',
        ], [
            'new_name.required' => 'El nuevo nombre es obligatorio.',
            'new_name.string'   => 'El nuevo nombre debe ser una cadena de texto.',
            'new_name.max'      => 'El nuevo nombre no debe exceder 255 caracteres.',
        ]);

        // Ensure the new name is different from the current name
        if ($user->name === $request->new_name) {
            return back()->withErrors(['new_name' => 'El nuevo nombre debe ser diferente al actual.']);
        }

        $user->name = $request->new_name;
        $user->save();

        return redirect('/products')->with('success', 'Nombre cambiado con éxito.');
    }
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->flush(); // Vacía toda la sesión
        $request->session()->regenerateToken();
        $response = redirect('/users');
        foreach ($request->cookies->keys() as $cookie) {
            $response->withCookie(cookie()->forget($cookie));
        }
        return $response;
    }
}

