import CartSummary from "./components/CartSummary";
import PaymentOptions from "./components/PaymentOptions";

export default function CheckoutPage() {
  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout - Finalizar Compra</h1>
        <div className="checkout-layout">
          <section className="checkout-cart">
            <CartSummary />
          </section>
          <section className="checkout-payment">
            <PaymentOptions />
          </section>
        </div>
      </div>
    </main>
  );
}