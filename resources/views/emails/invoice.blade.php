<!DOCTYPE html>
<html>
<head>
    <title>Tu Factura</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
        .container { border: 1px solid #eee; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        h1 { color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        h2 { color: #555; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f8f8f8; }
        .total-row td { font-weight: bold; }
        .customer-details p, .cart-details p { margin: 5px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Detalles de la Factura</h1>

        @if(isset($invoiceData['formData']))
            @php $formData = $invoiceData['formData']; @endphp
            <h2>Información del Cliente</h2>
            <div class="customer-details">
                <p><strong>Nombre:</strong> {{ $formData['name'] ?? '' }} {{ $formData['lastName'] ?? '' }}</p>
                <p><strong>Email:</strong> {{ $formData['email'] ?? '' }}</p>
                <p><strong>Teléfono:</strong> {{ $formData['phone'] ?? '' }}</p>
                <p><strong>Dirección:</strong> {{ $formData['address'] ?? '' }}</p>
                <p><strong>Código Postal:</strong> {{ $formData['postalCode'] ?? '' }}</p>
                <p><strong>Provincia:</strong> {{ $formData['province'] ?? '' }}</p>
                {{-- Puedes añadir más campos del formData aquí si es necesario --}}
            </div>
        @endif

        @if(isset($invoiceData['cart']) && count($invoiceData['cart']) > 0)
            @php $cart = $invoiceData['cart']; @endphp
            <h2>Resumen del Pedido</h2>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Descripción</th>
                        <th>Talla</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    @php $granTotal = 0; @endphp
                    @foreach($cart as $item)
                        <tr>
                            <td>{{ $item['name'] ?? 'N/A' }}</td>
                            <td>{{ $item['description'] ?? 'N/A' }}</td>
                            <td>{{ $item['size'] ?? 'N/A' }}</td>
                            <td>{{ $item['quantity'] ?? 0 }}</td>
                            <td>{{ number_format($item['price'] ?? 0, 2, ',', '.') }} €</td>
                            <td>{{ number_format(($item['quantity'] ?? 0) * ($item['price'] ?? 0), 2, ',', '.') }} €</td>
                        </tr>
                        @php $granTotal += ($item['quantity'] ?? 0) * ($item['price'] ?? 0); @endphp
                    @endforeach
                    <tr class="total-row">
                        <td colspan="5" style="text-align: right;"><strong>Total General:</strong></td>
                        <td><strong>{{ number_format($granTotal, 2, ',', '.') }} €</strong></td>
                    </tr>
                </tbody>
            </table>
        @else
            <p>No hay artículos en el pedido.</p>
        @endif

        <p style="margin-top: 30px;">Gracias por tu compra,</p>
        <p>Tu Empresa</p>
    </div>
</body>
</html>
