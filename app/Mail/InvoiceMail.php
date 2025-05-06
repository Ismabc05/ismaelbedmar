<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public $invoiceData;

    /**
     * Create a new message instance.
     *
     * @param array $invoiceData
     */
    public function __construct($invoiceData)
    {
        $this->invoiceData = $invoiceData;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Tu Factura de Compra')
                    ->view('emails.invoice') // o ->markdown('emails.invoice')
                    ->with(['invoiceData' => $this->invoiceData]); // Asegúrate de pasar la variable
    }
}
