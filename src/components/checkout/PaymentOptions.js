export default function PaymentOptions() {
  return (
    <div className="payment-options">
      <h3>Opciones de Pago</h3>
      <div className="payment-methods">
        <label>
          <input type="radio" name="payment" value="credit-card" />
          💳 Tarjeta de Crédito
        </label>
        <label>
          <input type="radio" name="payment" value="paypal" />
          🏦 PayPal
        </label>
        <label>
          <input type="radio" name="payment" value="bank-transfer" />
          🏛️ Transferencia Bancaria
        </label>
      </div>
      <button className="finalize-purchase">
        Finalizar Compra
      </button>
    </div>
  );
}