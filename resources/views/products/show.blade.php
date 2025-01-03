<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- Styles / Scripts -->
    @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    @endif
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
                          <!-- COMIENZO DE NAVBAR-->
        <nav class='navbar'>
        <div class='left-menu'></div>
        <div class='logo'></div>
        <ul class='right-menu'>
            <div class="flex space-x-8">
                <a href="#" class="text-black-600 hover:text-black-900">
                    <i class="fas fa-search"></i> <!-- Icono Buscar -->
                </a>
            <a href="#" class="text-black-600 hover:text-black-900">
                <i class="fas fa-heart"></i> <!-- Icono Favoritos -->
            </a>
            <a href="#" class="text-black-600 hover:text-black-900">
                <i class="fas fa-user"></i> <!-- Icono Mi cuenta -->
            </a>
            <a href="#" class="text-black-600 hover:text-black-900">
                <i class="fas fa-shopping-cart pr-4"></i> <!-- Icono Mi cesta -->
            </a>
        </ul>
        </nav>    
                          <!-- FIN DE NAVBAR-->
    
                          <!-- COMIENZO DE LA COLUMNA-->
    <div class="flex h-full h-[calc(100vh-81px)]">
        <div class="left-side bg-slate-100">D</div>
        <div class="right-side overflow-y-auto px-4">
            <h1 class="text-xl">
                {{$product->name}}
            </h1>
            <div class="object-right">
                <a href="#" class="text-black-600 hover:text-black-900 pr-20">
                    <i class="fas fa-heart"></i> 
                </a>
            </div>
            <p class="text-xs">
                {{$product->description}}</p>
            <p class="text-xs" style="margin-top: 50px;">Otros colores:</p>
            <div class="mt-4 text-left" style="font-size: 12px;">
                <label for="size" class="block text-sm font-medium mb-2" style="font-size: 12px;">Selecciona su talla</label>
                <select id="size" name="size" 
                    class="block w-medium p-2 border border-gray-300 rounded-lg" 
                    style= "font-size: 12px padding-right: 20px;">
                    <option value=>Seleccione una opción</option>
                    <option value="s">S - Pequeña</option>
                    <option value="m">M - Mediana</option>
                    <option value="l">L - Grande</option>
                    <option value="xl">XL - Extra Grande</option>
                </select>
            </div>
            
        </div> 
    </div>
    
                        <!-- FIN DE LA COLUMNA-->

</body>
</html>